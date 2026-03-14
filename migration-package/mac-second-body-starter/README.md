# Parker Content Pipeline

**Private Repository** - Internal content generation system for Jonathan Parker's financial education business.

## 🎯 Purpose

This repository contains the multi-agent content generation system that powers the public-facing [Parker Financial Calculators](https://github.com/gustavbotty-max/Parker) website.

## 🏗️ Architecture

```
parker-pipeline/          (this repo - PRIVATE)
├── agents/               # Agent personas and runners
│   ├── SCOUT.md         # Research agent
│   ├── QUILL.md         # Blog writer agent
│   ├── ECHO.md          # Social content agent
│   ├── FRAME.md         # Video script agent
│   └── orchestrator.sh  # Command center
├── content/             # Generated content (working drafts)
│   ├── research/        # Scout outputs
│   ├── blog/           # Quill outputs (review before publishing)
│   ├── social/         # Echo outputs
│   └── scripts/        # Frame outputs
├── pipeline/           # State management
│   └── state.json      # Agent statuses
└── dashboard.html      # Visual control panel

Parker/                  (public repo - GitHub Pages)
├── index.html          # Calculator hub
├── insurance-calculator.html
├── blog-posts/         # Published content only
└── ...                 # Static assets
```

## 🎭 The Agents

| Agent | Role | Model | Output |
|-------|------|-------|--------|
| **Scout** | Research | cheap | `content/research/YYYY-MM-DD-findings.md` |
| **Quill** | Blog Writer | default | `content/blog/YYYY-MM-DD-*.md` |
| **Echo** | Social Content | cheap | `content/social/YYYY-MM-DD-*-social.json` |
| **Frame** | Video Scripts | default | `content/scripts/YYYY-MM-DD-*-script.json` |

## 🎮 Usage

### Command Line

```bash
# Full pipeline
./agents/orchestrator.sh pipeline "NC housing market trends"

# Individual agents
./agents/orchestrator.sh run-scout "retirement planning changes 2025"
./agents/orchestrator.sh run-quill    # Uses latest research
./agents/orchestrator.sh run-echo     # Uses latest blog post
./agents/orchestrator.sh run-frame    # Uses latest blog post

# Dashboard & status
./agents/orchestrator.sh dashboard    # Opens visual control panel
./agents/orchestrator.sh status       # Shows current state
./agents/orchestrator.sh reset        # Clears all agent statuses
```

### Dashboard

Open `dashboard.html` in your browser for visual pipeline monitoring:
- Real-time agent status
- Content counts by type
- Manual trigger buttons
- Auto-refreshes every 30 seconds

## 📤 Publishing Workflow

1. **Research** → Scout generates `content/research/YYYY-MM-DD-findings.md`
2. **Write** → Quill creates `content/blog/YYYY-MM-DD-*.md`
3. **Review** → You review/edit the blog post
4. **Publish** → Copy approved post to `Parker/blog-posts/`
5. **Social** → Echo generates social content from published post
6. **Scripts** → Frame creates video scripts for you to record

### Sync to Public Site

After reviewing Quill's output:

```bash
# Copy approved blog post to public repo
cp content/blog/2026-02-17-topic.md ../Parker/blog-posts/
cd ../Parker && git add . && git commit -m "Add new blog post" && git push
```

## 🔐 Security

- **This repo is PRIVATE** - Contains agent configs, working drafts, and operational code
- **No API keys committed** - All tokens stored in local OpenClaw config (not in Git)
- **Published content only** in public repo

## 🛠️ Model Configuration

Each agent's model is defined in `pipeline/state.json`:

```json
{
  "scout": { "model": "cheap" },
  "quill": { "model": "default" },
  "echo": { "model": "cheap" },
  "frame": { "model": "default" }
}
```

Change these to any OpenRouter model alias as needed.

## 📋 Requirements

- OpenClaw installed locally
- OpenRouter API key configured
- GitHub access (for publishing to Parker repo)

## 🤝 Integration with Public Site

The pipeline generates content that feeds into:
- Blog posts on GitHub Pages
- Social media content (manual posting or Buffer scheduling)
- YouTube Shorts/TikTok scripts

---

**Do not make this repository public** - it contains operational details and intermediate content that should remain private.
