#!/usr/bin/env python3
from __future__ import annotations

import datetime as dt
import json
import os
import re
import shutil
from pathlib import Path
from zoneinfo import ZoneInfo

WORKSPACE = Path("/home/ubuntu/.openclaw/workspace")
MEMORY_DIR = WORKSPACE / "memory"
PARA_DIR = MEMORY_DIR / "para"
ARCHIVE_DAILY = PARA_DIR / "Archives" / "daily"
STATE_PATH = MEMORY_DIR / "heartbeat-state.json"
MEMORY_MD = WORKSPACE / "MEMORY.md"

TZ = ZoneInfo("America/New_York")

SECTION_MAP = {
    "decisions": "Decisions",
    "insights": "Insights",
    "projects": "Projects",
    "areas": "Areas",
    "resources": "Resources",
}

PARA_FILES = {
    "projects": PARA_DIR / "Projects" / "inbox.md",
    "areas": PARA_DIR / "Areas" / "inbox.md",
    "resources": PARA_DIR / "Resources" / "inbox.md",
}

HEADER_RE = re.compile(r"^##\s+(.*)$")
BULLET_RE = re.compile(r"^[-*]\s+(.*)$")
DATE_RE = re.compile(r"^(\d{4}-\d{2}-\d{2})\.md$")


def load_state() -> dict:
    if STATE_PATH.exists():
        return json.loads(STATE_PATH.read_text())
    return {"lastChecks": {"memoryDaily": None, "dreamCycle": None, "dailySummary": None}}


def save_state(state: dict) -> None:
    STATE_PATH.write_text(json.dumps(state, indent=2) + "\n")


def daily_path(date: dt.date) -> Path:
    return MEMORY_DIR / f"{date.isoformat()}.md"


def parse_sections(text: str) -> dict[str, list[str]]:
    current = None
    data = {k: [] for k in SECTION_MAP.keys()}
    for line in text.splitlines():
        m = HEADER_RE.match(line.strip())
        if m:
            header = m.group(1).strip().lower()
            current = None
            for key, label in SECTION_MAP.items():
                if label.lower() == header:
                    current = key
                    break
            continue
        if current:
            b = BULLET_RE.match(line.strip())
            if b:
                data[current].append(b.group(1).strip())
    return data


def append_lines(path: Path, lines: list[str], title: str | None = None) -> None:
    if not lines:
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists():
        path.write_text("")
    with path.open("a", encoding="utf-8") as f:
        if title:
            f.write(f"\n## {title}\n")
        for line in lines:
            f.write(f"- {line}\n")


def update_memory_md(date_str: str, data: dict[str, list[str]]) -> None:
    sections = []
    for key, label in SECTION_MAP.items():
        if data.get(key):
            sections.append((label, data[key]))
    if not sections:
        return
    header = f"### {date_str} Dream"
    body_lines = [header]
    for label, lines in sections:
        body_lines.append(f"\n#### {label}")
        body_lines.extend([f"- {line}" for line in lines])
    body = "\n".join(body_lines) + "\n"
    if not MEMORY_MD.exists():
        MEMORY_MD.write_text(body)
        return
    with MEMORY_MD.open("a", encoding="utf-8") as f:
        f.write("\n" + body)


def archive_old_daily(today: dt.date, keep_days: int = 14) -> list[str]:
    moved = []
    cutoff = today - dt.timedelta(days=keep_days)
    for item in MEMORY_DIR.iterdir():
        if not item.is_file():
            continue
        m = DATE_RE.match(item.name)
        if not m:
            continue
        file_date = dt.date.fromisoformat(m.group(1))
        if file_date <= cutoff:
            ARCHIVE_DAILY.mkdir(parents=True, exist_ok=True)
            dest = ARCHIVE_DAILY / item.name
            shutil.move(str(item), dest)
            moved.append(item.name)
    return moved


def main() -> None:
    now = dt.datetime.now(TZ)
    today = now.date()
    yesterday = today - dt.timedelta(days=1)
    daily = daily_path(yesterday)
    if not daily.exists():
        print(f"No daily file found for {yesterday.isoformat()}; skipping dream cycle.")
        return

    text = daily.read_text(encoding="utf-8")
    data = parse_sections(text)

    # Update PARA inboxes
    for key, lines in data.items():
        if key in PARA_FILES:
            append_lines(PARA_FILES[key], lines, title=yesterday.isoformat())

    # Update long-term memory
    update_memory_md(yesterday.isoformat(), data)

    # Archive old daily files
    moved = archive_old_daily(today, keep_days=14)

    # Update state
    state = load_state()
    state["lastChecks"]["dreamCycle"] = now.isoformat()
    save_state(state)

    print(f"Dream cycle complete for {yesterday.isoformat()}. Archived: {len(moved)} files.")


if __name__ == "__main__":
    main()
