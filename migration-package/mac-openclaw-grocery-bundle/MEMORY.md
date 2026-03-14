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
- **Key Location**: `/home/ubuntu/.openclaw/workspace/github_deploy_key`
- **Permissions**: Can push to main branch
- **Repository**: gustavbotty-max/Parker (default branch: main)
- **Use Case**: Deploy calculator updates, fix Formspree integrations, modify HTML/CSS/JS files

### Git Configuration
- Remote: `git@github.com:gustavbotty-max/Parker.git`
- Branch: main (GitHub Pages serves from this branch)
- Workspace: `/home/ubuntu/.openclaw/workspace/`

## Credentials & Access

### Google Workspace (gog CLI)
- **Account**: gustavbotty@gmail.com
- **Key Ring Password**: `MrGustavBotty2000` (NO # symbol at end)
- **Services**: Drive (working), Calendar, Gmail, Contacts, Sheets, Docs available
- **Usage**: `export GOG_KEYRING_PASSWORD='MrGustavBotty2000' && export GOG_ACCOUNT=gustavbotty@gmail.com && gog drive search...`
- **Status**: Authenticated and functional (verified 2026-03-09 21:39)

## Parker Content Pipeline

**Location**: `/home/ubuntu/.openclaw/workspace/agents/orchestrator.sh`

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

### 2026-03-09 Dream

#### Decisions
- Jonathan plans to optimize his grocery spending by analyzing his shopping trends and identifying potential savings through competitor deals, coupons, and bulk purchases.

#### Insights
- Jonathan shared that the data for the grocery project was saved as 'Walmart_Orders(new).xlsx' in his Google Drive account but faced access issues.
- After Google Drive retrieval issues, he directly uploaded the file. Initial processing found the data extensive, but specific extraction or analysis can be tailored.

#### Projects
- Grocery Savings Plan: Focus on analyzing grocery trends and exploring savings opportunities.

#### Areas
- Finance
- Personal Budgeting

#### Resources
- File uploaded: Walmart_Orders_New---e09460ec-65e2-4919-b69b-3fcee79af866.xlsx

### 2026-03-10 Dream

#### Decisions
- Pivoting from static price comparison to **dynamic multi-store shopping automation system**
- Will consolidate Costco + Target + Walmart data into single master dataset for burn rate analysis
- Chosen approach for receipt parsing: TBD (pdftotext + regex vs. cloud service like Textract)
- **Use accurate pricing data**: WRAL Feb 2026 NC warehouse comparison (not inflated assumptions)

#### Insights
- **Price assumption correction**: Initial Costco estimates were significantly inflated. Real NC prices (from WRAL Feb 2026):
- Eggs: $2.30/dozen (not $5.99)
- Ground beef: $5.79/lb (vs $6.99 Walmart)
- Chicken: $2.99/lb (vs $5-6 Walmart)
- Milk: $2.43/gallon (vs $3.11 Walmart)
- Realistic savings: $80-140/trip (not $100-130+ as previously estimated)
- Reddit + recent news sources (CNBC, WRAL, Supermarket News) are viable for near-real-time pricing
- Honesty > optimism: Corrected banana savings from $40-50 to $8-10/trip
- **Receipt format varies by store**: Costco uses standardized "Orders & Purchases" PDF format; Target likely different

#### Projects
- **Grocery Optimization Hub** (multi-phase):
- Phase 1: Burn rate analysis (per-item weekly consumption)
- Phase 2: Smart order generation (weekly Costco/Aldi/Walmart alternating cron)
- Phase 3: Cart pre-population (login → auto-build cart → review/delete)
- Phase 4: Recipe intelligence (meals → shopping list mapping)

#### Areas
- Finance
- Automation
- Data Integration

#### Resources
- **Costco Receipts**: 15 PDFs in Google Drive folder `1W655wSMEBKfENeydY0oexa7Jfn7xFv80`
- **Target Receipts**: 16 PDFs in Google Drive folder `1-Z0NCUOBrdA8LiY572k9cfs503rFRVED`
- **Walmart data**: 14-month CSV (2,527 line items, Jan 2 – Mar 9, 2026)
- **WRAL warehouse pricing**: https://www.wral.com/consumer/5onyourside/wholesale-club-comparisons-costco-sams-bjs-consumer-february-2026/
- **Costco meat guide**: https://www.eatlikenoone.com/price-guide-to-buying-beef-at-costco.htm (Jan 2026 prices)

### 2026-03-11: Archived agent session

- **Archive path**: /home/ubuntu/.openclaw/agents/archives/sessions-archive-20260311T185844.tar.gz
- **Archived files**: all files from /home/ubuntu/.openclaw/agents/main/sessions/ (session history snapshots)
- **Archive size**: 4.5M
- **Notes**: Archive contains multiple session files including long-running pipeline runs and conversation history. Likely projects referenced inside: Parker Content Pipeline runs (Scout/Quill/Echo/Frame), grocery optimization logs, cron agentmail digests, and other troubleshooting sessions.



### 2026-03-11 Dream

#### Decisions
- Grocery optimization work should move to a **mapping-first / canonical item** workflow before building dashboards or reorder logic.
- Use a **strict 4-month block rule** for recurring-item inclusion in grocery planning.
- Reorder targets should default to **4 weeks for non-perishables** and **2 weeks for perishables**.

#### Insights
- Raw grocery SKUs are too fragmented for useful burn-rate planning; items like apples need to be consolidated across variants/brands/sizes into a single canonical item.
- The first grocery dashboard attempt was premature because burn-rate metrics were based on raw item descriptions instead of canonical groupings.
- Walmart item pricing required correction: for most Walmart rows, the original `price` field functioned as the line total and needed to be moved to `total`, with corrected unit price derived as `total / quantity`, excluding already-fixed protein/yogurt drinks and produce items containing "Each".

#### Projects
- Grocery Optimization Hub:
- Built corrected consolidated CSV for 3-store grocery history.
- Generated burn-rate analysis over the full observed period and last 13 weeks.
- Pivoted to a canonical item mapping workflow before rebuilding the dashboard.
- Created mapping suggestion and canonical preview sheets in Google Sheets for review and manual refinement.

#### Areas
- Grocery optimization
- Household budgeting
- Inventory planning
- Data cleaning / item normalization

#### Resources
- Corrected consolidated CSV: `/home/ubuntu/.openclaw/workspace/review_raw_consolidated_3store_fixed2.csv`
- Burn-rate CSV: `/home/ubuntu/.openclaw/workspace/burn_rate_items_weekly.csv`
- Initial mapping suggestions sheet: `https://docs.google.com/spreadsheets/d/191dXqur18Wm5XGq2dQVwd6ahDWrqLETD0N5Bv61inBw/edit`
- Initial canonical preview sheet: `https://docs.google.com/spreadsheets/d/1MwbVydbPadk8Ib1uA_mu4SHIXJxEzkP8W19KHwjxG6w/edit`
- Refined mapping suggestions sheet: `https://docs.google.com/spreadsheets/d/1P4_cXCmUjqA-d0oQAkxHG_-8lnU745T5mESFH_k-pfg/edit`
- Refined canonical preview sheet: `https://docs.google.com/spreadsheets/d/1ik4XkC3i_uuK10qMqqYWsRvbsSFuT8Q2YJJWZ9iBvfc/edit`

### 2026-03-12 Dream

#### Decisions
- Planning a West Yellowstone snowmobile trip with 2 friends (3 people total)
- Comparing Polaris sled deal ($100/day/person) vs local West Yellowstone rentals
- Choosing between two trip logistics: Idaho Falls flights + Rigby tow vs Bozeman flights + local rentals
- Hot tub is mandatory for cabin selection
- Jenna Gotthelf mentioned CIO updates for March 12

#### Insights
- Friend works at Polaris — potential equipment discount is significant factor in trip decision
- Location choice (Island Park, Idaho vs West Yellowstone) affects both cabin costs and rental logistics

#### Projects
- **West Yellowstone Snowmobile Trip** — cost/logistics analysis in progress

#### Areas
- Travel Planning
- Budget Optimization
- Logistics

#### Resources
- Polaris sled: $100/day per person
- Need to source: Idaho Falls flight prices, Bozeman flight prices, West Yellowstone sled rentals, cabin rentals (West Yellowstone + Island Park, all with hot tubs)

### 2026-03-13 Dream

#### Decisions
- Keep the email-checking cron job on `openclaw agent --local` for delivery instead of gateway mode.

#### Insights
- Gateway-mode `openclaw agent --deliver --channel telegram --to 6683507702` can fail with `Context overflow: prompt too large for the model`.
- Local-mode `openclaw agent --local --deliver --channel telegram --to 6683507702` succeeds, so the cron delivery path avoids the old context issue when run locally.
- The current email-checking script still has reliability issues beyond context size: `MAX_MESSAGES=1`, a subshell `while ... | read` digest builder, and a fallback to `telegram-send` even though `telegram-send` is not installed.

#### Projects
- **Email Checking Cron Job** — evaluated delivery path and confirmed local mode avoids gateway context overflow, but script hardening is still needed.

#### Areas
- Automation
- Email triage
- Cron reliability

#### Resources
- Cron script: `/usr/local/bin/check_agentmail.sh`
