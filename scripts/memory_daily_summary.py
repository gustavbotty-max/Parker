#!/usr/bin/env python3
from __future__ import annotations

import datetime as dt
import json
from pathlib import Path
from zoneinfo import ZoneInfo
import re

WORKSPACE = Path("/home/ubuntu/.openclaw/workspace")
MEMORY_DIR = WORKSPACE / "memory"
STATE_PATH = MEMORY_DIR / "heartbeat-state.json"

TZ = ZoneInfo("America/New_York")

SECTION_ORDER = ["Decisions", "Insights", "Projects", "Areas", "Resources", "Tasks", "Open Questions"]

HEADER_RE = re.compile(r"^##\s+(.*)$")
BULLET_RE = re.compile(r"^[-*]\s+(.*)$")


def daily_path(date: dt.date) -> Path:
    return MEMORY_DIR / f"{date.isoformat()}.md"


def load_state() -> dict:
    if STATE_PATH.exists():
        return json.loads(STATE_PATH.read_text())
    return {"lastChecks": {"memoryDaily": None, "dreamCycle": None, "dailySummary": None}}


def save_state(state: dict) -> None:
    STATE_PATH.write_text(json.dumps(state, indent=2) + "\n")


def parse_sections(text: str) -> dict[str, list[str]]:
    current = None
    data = {k: [] for k in SECTION_ORDER}
    for line in text.splitlines():
        m = HEADER_RE.match(line.strip())
        if m:
            header = m.group(1).strip()
            current = header if header in data else None
            continue
        if current:
            b = BULLET_RE.match(line.strip())
            if b:
                data[current].append(b.group(1).strip())
    return data


def main() -> None:
    now = dt.datetime.now(TZ)
    today = now.date()
    yesterday = today - dt.timedelta(days=1)

    daily = daily_path(yesterday)
    if not daily.exists():
        print(f"No daily file for {yesterday.isoformat()}. Nothing to summarize.")
        return

    data = parse_sections(daily.read_text(encoding="utf-8"))

    lines = [f"Daily summary for {yesterday.isoformat()}:"]
    empty = True
    for section in SECTION_ORDER:
        items = data.get(section, [])
        if items:
            empty = False
            lines.append(f"\n{section}:")
            lines.extend([f"- {item}" for item in items])
    if empty:
        lines.append("\n(No structured items logged.)")

    state = load_state()
    state["lastChecks"]["dailySummary"] = now.isoformat()
    save_state(state)

    print("\n".join(lines))


if __name__ == "__main__":
    main()
