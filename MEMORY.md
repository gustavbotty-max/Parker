# MEMORY.md - Long-Term Memory

## Jonathan's Background
- **Name**: Jonathan Parker
- **Location**: NC Triangle area (Raleigh-Durham-Chapel Hill)
- **Profession**: Primerica representative, 3+ years experience
- **Mission**: Making financial planning accessible to middle-class families

## Current Projects

### Financial Calculators Hub
**Status**: Active development, migration phase
**Purpose**: Lead generation tool for insurance/financial planning services
**Target Market**: Triangle families, young parents, homeowners

**Calculators Built**:
1. **Life Insurance Calculator** (LIVE) - Primary lead magnet
2. **Retirement Planning Calculator** (Phase 2)
3. **College Savings Calculator** (Phase 2)
4. **Debt Payoff Calculator** (Phase 2)
5. **Emergency Fund Calculator** (Phase 2)

**Marketing Strategy**:
- Meta/Facebook ads targeting local parents ($20/day starting budget)
- Local SEO for Triangle keywords
- Lead magnets: personalized results via email
- Target: 50-100 leads/month, 10-15% conversion to consultations

**Tech Stack**:
- HTML/CSS/JS calculators
- VPS hosting (migrating from cloud AI)
- Ollama for local AI (cost savings: ~$28/month vs old system)
- Email capture & CRM integration

## Business Philosophy
- Financial planning shouldn't be gatekept for the wealthy
- Transparent, honest numbers without sales pressure
- Local focus on Triangle community
- Educational approach to building trust

## Key Metrics & Goals
- 100+ leads/month within 90 days
- 15%+ consultation booking rate
- 5+ new policies/month from calculators
- Cost per lead: <$25
- ROI: 5-10x within 6 months

## Technical Migration
- Previously: Cloud-based AI (~$48/month, reliability issues)
- Now: Self-hosted VPS with Ollama

## Troubleshooting Log

### 2026-02-18: Gateway Token Mismatch & Tailscale Zombie Crisis
**Problem**: Gateway failing with `device token mismatch` error, pipeline architecture broken

**Root Cause**: 
- Tailscale serve failing (`/usr/bin/tailscale serve --bg --yes 18789`)
- Failed serve attempts accumulating zombie processes
- RAM exhaustion → gateway sluggishness (1300ms+ response times)
- Auth handshake failures → token rotation required

**Symptoms**:
- `gateway closed (1008): unauthorized: device token mismatch`
- `[tailscale] serve failed` in logs every startup
- Pipeline agents (Scout, Quill, Echo, Frame) failing to spawn
- Main agent doing all work instead of sub-agents

**Fixes Applied**:
```bash
# Clear zombie Tailscale state
sudo tailscale serve reset
sudo systemctl restart tailscaled

# Restart gateway fresh
systemctl --user restart openclaw-gateway

# Update OpenClaw (2026.2.15 → 2026.2.17)
openclaw update

# Rotate device token (via onboard wizard)
openclaw onboard
```

**Current State**: Gateway stable, Tailscale still enabled (`mode: serve`) but loopback binding working. Monitoring for zombie recurrence.

**Detection Commands**:
```bash
# Check for zombie buildup
ps aux | grep tailscale | wc -l

# Check gateway health
openclaw gateway probe
journalctl --user -u openclaw-gateway -n 20

# Check Tailscale serve status
tailscale serve status
```

- VPS: Ubuntu 22.04, 16-32GB RAM, 4+ cores
- Models: Qwen2.5-72B, Llama3.1-70B, Mixtral-8x7B

## Files & Assets
- Migration package transferred 2026-02-04
- Calculator HTML files (index.html, insurance-calculator.html)
- Marketing docs (lead strategy, Meta ads templates)
- Setup scripts (Ollama installation)

## Contact & Links
- **GitHub Pages**: https://gustavbotty-max.github.io/Parker/index.html
- **GitHub Repository**: https://github.com/gustavbotty-max/Parker

## Technical Access

### GitHub Repository Access
- **SSH Deploy Key**: Configured with write access
- **Key Location**: `/home/gustavjr/.openclaw/workspace/github_deploy_key`
- **Permissions**: Can push to main branch
- **Repository**: gustavbotty-max/Parker (default branch: main)
- **Use Case**: Deploy calculator updates, fix Formspree integrations, modify HTML/CSS/JS files

### Git Configuration
- Remote: `git@github.com:gustavbotty-max/Parker.git`
- Branch: main (GitHub Pages serves from this branch)
- Workspace: `/home/gustavjr/.openclaw/workspace/`

## Credentials & Access

### Google Workspace (gog CLI)
- **Account**: jlparker0106@gmail.com
- **Key Ring**: `ImMrGustavBotty2000#`
- **Services**: Calendar (enabled), Gmail, Drive, Contacts, Sheets, Docs available
- **Usage**: `export GOG_ACCOUNT=jlparker0106@gmail.com` before gog commands

## Parker Content Pipeline

**Location**: `/home/gustavjr/.openclaw/workspace/agents/orchestrator.sh`

**Usage**:
- Say: *"run parker-pipeline on [topic]"* — runs full Scout→Quill→Echo→Frame workflow
- Or CLI: `./agents/orchestrator.sh pipeline "topic"`

**The Agents**:
1. **Scout** — Research (reads `agents/SCOUT.md`)
2. **Quill** — Blog writer (reads `agents/QUILL.md`)  
3. **Echo** — Social content (reads `agents/ECHO.md`)
4. **Frame** — Video scripts (reads `agents/FRAME.md`)

**Outputs**:
- `content/research/YYYY-MM-DD-findings.md`
- `content/blog/YYYY-MM-DD-*.md`
- `content/social/YYYY-MM-DD-*-social.json`
- `content/scripts/YYYY-MM-DD-*-script.json`

**Publishing**:
- Copy blog post to `blog-posts/` folder
- Push to GitHub: `git push origin main`
- Upload to Google Drive for backup

---
*Last updated: 2026-02-19*
