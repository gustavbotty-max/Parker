#!/usr/bin/env python3
"""Convert a markdown blog draft into the live HTML layout and update blog.html cards."""
from __future__ import annotations

import re
import subprocess
import sys
from datetime import datetime
from html import escape, unescape
from pathlib import Path
from typing import Dict, List, Tuple

ROOT = Path(__file__).resolve().parent.parent
BLOG_INDEX_PATHS = [ROOT / "blog.html", ROOT / "Parker" / "blog.html"]
HOME_INDEX_PATHS = [ROOT / "index.html", ROOT / "Parker" / "index.html"]
BLOG_POSTS_DIRS = [ROOT / "blog-posts", ROOT / "Parker" / "blog-posts"]
CANONICAL_BASE = "https://gustavbotty-max.github.io/Parker"

CATEGORY_MAP = {
    "layoffs": "🛡️ Job Security",
    "job security": "🛡️ Job Security",
    "employment": "💼 Employment & Economy",
    "economy": "💼 Employment & Economy",
    "inflation": "💸 Inflation & Budgeting",
    "budget": "💸 Inflation & Budgeting",
    "budgeting": "💸 Inflation & Budgeting",
    "debt": "💳 Debt & Credit",
    "credit": "💳 Debt & Credit",
    "investing": "📊 Investing & Diversification",
    "diversification": "📊 Investing & Diversification",
    "retirement": "🏖️ Retirement Planning",
    "emergency fund": "🛟 Emergency Fund",
    "insurance": "🛡️ Protection Planning",
    "financial planning": "💡 Financial Planning",
    "market": "📈 Market & Economy",
}

def load_markdown_module():
    try:
        import markdown  # type: ignore
        return markdown
    except ImportError:
        try:
            subprocess.run([sys.executable, "-m", "pip", "install", "--user", "markdown"], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            import importlib
            markdown = importlib.import_module("markdown")
            return markdown
        except Exception:
            return None


def parse_markdown(md_text: str) -> Tuple[Dict[str, str], str]:
    front_matter: Dict[str, str] = {}
    body = md_text
    if md_text.startswith("---"):
        parts = md_text.split("---", 2)
        if len(parts) >= 3:
            _, fm, body = parts
            for line in fm.strip().splitlines():
                if ":" not in line:
                    continue
                key, value = line.split(":", 1)
                cleaned = value.strip().strip("\"' ")
                front_matter[key.strip()] = cleaned
    return front_matter, body.lstrip("\n")


def md_to_html(body: str) -> str:
    markdown_module = load_markdown_module()
    if markdown_module:
        return markdown_module.markdown(body, extensions=["extra", "smarty"])
    # fallback minimal conversion
    html_lines: List[str] = []
    lines = body.splitlines()
    in_list = False
    for raw in lines:
        line = raw.rstrip()
        stripped = line.strip()
        if not stripped:
            if in_list:
                html_lines.append("</ul>")
                in_list = False
            html_lines.append("")
            continue
        if stripped.startswith("### "):
            if in_list:
                html_lines.append("</ul>")
                in_list = False
            html_lines.append(f"<h3>{escape(stripped[4:].strip())}</h3>")
        elif stripped.startswith("## "):
            if in_list:
                html_lines.append("</ul>")
                in_list = False
            html_lines.append(f"<h2>{escape(stripped[3:].strip())}</h2>")
        elif stripped.startswith("# "):
            if in_list:
                html_lines.append("</ul>")
                in_list = False
            html_lines.append(f"<h1>{escape(stripped[2:].strip())}</h1>")
        elif stripped.startswith(('- ', '* ')):
            if not in_list:
                html_lines.append("<ul>")
                in_list = True
            html_lines.append(f"<li>{escape(stripped[2:].strip())}</li>")
        else:
            if in_list:
                html_lines.append("</ul>")
                in_list = False
            html_lines.append(f"<p>{escape(stripped)}</p>")
    if in_list:
        html_lines.append("</ul>")
    html = "\n".join(line for line in html_lines if line is not None)
    # simple bold/italic replacements
    html = re.sub(r"\*\*(.+?)\*\*", r"<strong>\\1</strong>", html)
    html = re.sub(r"\*(.+?)\*", r"<em>\\1</em>", html)
    return html


def first_paragraph_text(html_body: str) -> str:
    match = re.search(r"<p>(.*?)</p>", html_body, re.DOTALL)
    if match:
        text = re.sub(r"<.*?>", "", match.group(1))
        return text.strip()
    # fallback plain text
    stripped = re.sub(r"<.*?>", "", html_body)
    return stripped.strip().split("\n")[0]


def build_post_html(meta: Dict[str, str], body_html: str, slug: str) -> str:
    title = meta.get("title", "Untitled Post")
    date_raw = meta.get("date", "")
    read_time = meta.get("read_time", "5 min")
    topics = [t.strip() for t in meta.get("topics", "").strip("[]").split(',') if t.strip()] or ["Financial Planning"]
    try:
        date_fmt = datetime.fromisoformat(date_raw).strftime("%B %d, %Y")
    except ValueError:
        date_fmt = date_raw or datetime.now().strftime("%B %d, %Y")
    meta_desc = first_paragraph_text(body_html)
    if len(meta_desc) > 155:
        meta_desc = meta_desc[:152].rsplit(" ", 1)[0] + "..."
    canonical = f"{CANONICAL_BASE}/blog-posts/{slug}.html"
    topic_label = topics[0] if topics else "Financial Planning"

    return f"""<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <title>{escape(title)} — Jonathan Parker</title>
    <meta name=\"description\" content=\"{escape(meta_desc)}\">
    <link rel=\"canonical\" href=\"{canonical}\">
    <meta property=\"og:url\" content=\"{canonical}\">
    <meta property=\"og:title\" content=\"{escape(title)}\">
    <meta property=\"og:description\" content=\"{escape(meta_desc)}\">
    <link rel=\"stylesheet\" href=\"../styles.css\">
    <style>
        .blog-content {{ max-width: 720px; margin: 0 auto; padding: 0 20px 3rem; }}
        .blog-content h1 {{ font-size: 2rem; line-height: 1.25; margin-bottom: 0.5rem; color: var(--primary); }}
        .blog-content .blog-meta {{ color: var(--text-light); font-size: 0.9rem; margin-bottom: 2rem; }}
        .blog-content h2 {{ font-size: 1.35rem; margin-top: 2rem; margin-bottom: 0.75rem; color: var(--text); }}
        .blog-content p {{ line-height: 1.8; margin-bottom: 1.25rem; color: var(--text); font-size: 1.02rem; }}
        .blog-content strong {{ color: var(--primary); }}
        .blog-content ul, .blog-content ol {{ margin-bottom: 1.25rem; padding-left: 1.5rem; }}
        .blog-content li {{ line-height: 1.8; margin-bottom: 0.5rem; font-size: 1.02rem; }}
        .blog-content blockquote {{ border-left: 4px solid var(--accent); padding: 1rem 1.25rem; background: var(--bg); border-radius: 0 var(--radius) var(--radius) 0; margin: 1.5rem 0; font-style: italic; color: var(--text-light); }}
        .blog-content hr {{ border: none; border-top: 1px solid var(--border); margin: 2rem 0; }}
        .blog-content em {{ color: var(--text-light); }}
        @media (max-width: 600px) {{ .blog-content h1 {{ font-size: 1.5rem; }} }}
    </style>
</head>
<body>
    <nav class=\"site-nav\"><div class=\"nav-inner\">
        <a href=\"../index.html\" class=\"nav-brand\"><span class=\"nav-brand-name\">Jonathan Parker</span><span class=\"nav-brand-tag\">Financial Educator · Triangle NC</span></a>
        <input type=\"checkbox\" id=\"nav-toggle\" class=\"nav-toggle\" hidden><label for=\"nav-toggle\" class=\"nav-toggle-label\"><span></span></label>
        <ul class=\"nav-links\">
            <li><a href=\"../index.html\">Home</a></li><li><a href=\"../index.html#calculators\">Calculators</a></li>
            <li><a href=\"../blog.html\" class=\"active\">Blog</a></li><li><a href=\"../index.html#about\">About</a></li>
            <li><a href=\"https://scheduler.zoom.us/jonathan-parker-i9rj3o/pfs-intro\" target=\"_blank\" rel=\"noopener\" class=\"nav-cta\">Book a Call</a></li>
        </ul>
    </div></nav>

    <div class=\"calc-page-hero\">
        <div class=\"container\">
            <h1>📝 Financial Insights</h1>
            <p>Money talk like a friend over coffee</p>
        </div>
    </div>

    <article class=\"blog-content\">
        <h1>{escape(title)}</h1>
        <div class=\"blog-meta\">📅 {escape(date_fmt)} · ⏱️ {escape(read_time)} · 📊 {escape(topic_label)}</div>

        {body_html}

        <div style=\"text-align:center; margin-top:2rem;\">
            <a href=\"https://scheduler.zoom.us/jonathan-parker-i9rj3o/pfs-intro\" target=\"_blank\" rel=\"noopener\" class=\"btn btn-primary\">📅 Let's Talk Strategy</a>
            <a href=\"../blog.html\" class=\"btn btn-secondary\" style=\"margin-left:0.75rem;\">← All Articles</a>
        </div>
    </article>

    <footer class=\"site-footer\"><div class=\"container\"><div class=\"footer-grid\">
        <div class=\"footer-section\"><h4>Calculators</h4><ul>
            <li><a href=\"../insurance-calculator.html\">Life Insurance</a></li><li><a href=\"../retirement-planning-calculator.html\">Retirement Planning</a></li>
            <li><a href=\"../college-savings-calculator.html\">College Savings</a></li><li><a href=\"../debt-payoff-calculator.html\">Debt Payoff</a></li>
            <li><a href=\"../mortgage-calculator.html\">Mortgage Affordability</a></li><li><a href=\"../emergency-fund-calculator.html\">Emergency Fund</a></li>
        </ul></div>
        <div class=\"footer-section\"><h4>Resources</h4><ul>
            <li><a href=\"https://therealhowmoneyworks.com/us/Jonathan_Parker\" target=\"_blank\" rel=\"noopener\">Financial Planning Guide</a></li>
            <li><a href=\"../21-sources-of-cash.html\">21 Sources of Cash Workshop</a></li>
        </ul></div>
        <div class=\"footer-section\"><h4>Contact</h4><ul>
            <li><a href=\"mailto:jlparker0106@gmail.com\">✉️ jlparker0106@gmail.com</a></li>
            <li><a href=\"https://scheduler.zoom.us/jonathan-parker-i9rj3o/pfs-intro\" target=\"_blank\" rel=\"noopener\">📅 Schedule a Consultation</a></li>
            <li class=\"footer-contact-item\">📍 Serving the NC Triangle</li>
        </ul></div>
        <div class=\"footer-section\"><h4>Connect</h4><ul>
            <li><a href=\"https://www.facebook.com/jplarkin/\" target=\"_blank\" rel=\"noopener\">Facebook</a></li>
            <li><a href=\"https://www.linkedin.com/in/jonathan-parker-026b9511a\" target=\"_blank\" rel=\"noopener\">LinkedIn</a></li>
        </ul></div>
    </div><div class=\"footer-bottom\">
        <p>&copy; 2026 Jonathan Parker Financial Services. All rights reserved.</p>
        <p>Licensed in North Carolina · Not affiliated with any government agency</p>
    </div></div></footer>

    <a href=\"https://scheduler.zoom.us/jonathan-parker-i9rj3o/pfs-intro\" target=\"_blank\" rel=\"noopener\" class=\"floating-cta\">
        📅 <span class=\"cta-text-full\">Book a Free Call</span><span class=\"cta-text-short\">Book Call</span>
    </a>
</body>
</html>
"""


def build_card_html(title: str, slug: str, date_label: str, read_time: str, excerpt: str, tags: List[str], category_label: str) -> str:
    tags_html = ''.join(f"<span class=\"blog-tag\">{escape(tag.title())}</span>" for tag in tags[:2])
    return (
        f"\n                <a href=\"blog-posts/{slug}.html\" class=\"blog-card\" style=\"text-decoration:none; color:inherit;\">\n"
        "                    <div class=\"blog-card-header\">\n"
        f"                        <span class=\"blog-category\">{escape(category_label)}</span>\n"
        f"                        <h3 class=\"blog-card-title\">{escape(title)}</h3>\n"
        "                    </div>\n"
        "                    <div class=\"blog-card-body\">\n"
        f"                        <div class=\"blog-meta\"><span>📅 {escape(date_label)}</span><span>⏱️ {escape(read_time)}</span></div>\n"
        f"                        <p class=\"blog-excerpt\">{escape(excerpt, quote=False)}</p>\n"
        f"                        <div class=\"blog-tags\">{tags_html}</div>\n"
        "                        <span class=\"blog-read-more\">Read article</span>\n"
        "                    </div>\n"
        "                </a>\n"
    )


def _update_card_grid(path: Path, card_html: str, slug: str, limit: int | None = None):
    if not path.exists():
        return
    content = path.read_text()
    link_token = f"blog-posts/{slug}.html"
    existing_pattern = re.compile(rf"\n\s*<a href=\"{re.escape(link_token)}\"[\s\S]*?</a>\n", re.MULTILINE)
    content = re.sub(existing_pattern, "\n", content, count=1)
    marker = "<div style=\"display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:1.5rem;\">"
    start_idx = content.find(marker)
    if start_idx == -1:
        raise RuntimeError(f"Blog grid marker not found in {path}")
    grid_start = content.find("\n", start_idx + len(marker)) + 1
    grid_end = content.find("</div>", grid_start)
    grid = content[grid_start:grid_end]
    card_pattern = re.compile(r"\n\s*<a href=\"blog-posts/[^\"]+\.html\" class=\"blog-card\"[\s\S]*?</a>\n", re.MULTILINE)
    cards = card_pattern.findall(grid)
    cards.insert(0, card_html + "\n")
    if limit is not None:
        cards = cards[:limit]
    new_grid = ''.join(cards)
    updated = content[:grid_start] + new_grid + content[grid_end:]
    path.write_text(updated)


def update_blog_indexes(slug: str, title: str, date_label: str, read_time: str, excerpt: str, topics: List[str]):
    category_key = topics[0].lower() if topics else "financial planning"
    category_label = CATEGORY_MAP.get(category_key, "📘 Financial Insights")
    tags = topics if topics else ["Money"]
    card_html = build_card_html(title, slug, date_label, read_time, excerpt, tags, category_label)
    for path in BLOG_INDEX_PATHS:
        _update_card_grid(path, card_html, slug, limit=None)
    for path in HOME_INDEX_PATHS:
        _update_card_grid(path, card_html, slug, limit=4)

def main(md_file: str):
    md_path = Path(md_file)
    if not md_path.exists():
        raise FileNotFoundError(md_file)
    front_matter, body = parse_markdown(md_path.read_text())
    body_html = md_to_html(body)
    slug = md_path.stem
    html = build_post_html(front_matter, body_html, slug)
    out_paths = []
    for blog_posts_dir in BLOG_POSTS_DIRS:
        blog_posts_dir.mkdir(exist_ok=True)
        out_path = blog_posts_dir / f"{slug}.html"
        out_path.write_text(html)
        out_paths.append(out_path)
    date_val = front_matter.get("date", datetime.now().strftime("%Y-%m-%d"))
    try:
        date_label = datetime.fromisoformat(date_val).strftime("%b %e, %Y").replace(" 0", " ")
    except ValueError:
        date_label = date_val
    excerpt = first_paragraph_text(body_html)
    excerpt = unescape(excerpt)
    if len(excerpt) > 180:
        excerpt = excerpt[:177].rsplit(" ", 1)[0] + "…"
    topics_raw = front_matter.get("topics", "")
    if isinstance(topics_raw, str):
        topics = [t.strip().strip("'\"") for t in topics_raw.strip("[]").split(',') if t.strip()]
    else:
        topics = list(topics_raw)
    if not topics:
        topics = ["Financial Planning"]
    update_blog_indexes(slug, front_matter.get("title", slug), date_label, front_matter.get("read_time", "5 min"), excerpt, topics)
    print("Published blog HTML to " + ", ".join(str(p) for p in out_paths) + " and updated homepage/blog indexes")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: publish_blog_post.py /path/to/blog.md")
        sys.exit(1)
    main(sys.argv[1])
