# Mac Migration Notes

## Bundle created
- Archive: `migration-package/mac-openclaw-grocery-bundle.tar.gz`
- Expanded dir: `migration-package/mac-openclaw-grocery-bundle/`

## Goal
Move the minimum viable grocery-project context from the VPS to the new Mac OpenClaw host without hauling over unrelated junk.

## Included
- Core assistant context: `AGENTS.md`, `SOUL.md`, `USER.md`, `MEMORY.md`, `TOOLS.md`, `IDENTITY.md`
- Grocery data + outputs:
  - `burn_rate_canonical_weekly.csv`
  - `burn_rate_canonical_weekly_top.csv`
  - `burn_rate_items_weekly.csv`
  - `review_raw_consolidated_3store_fixed2.csv`
  - `walmart_orders_full.csv`
  - refined mapping/canonical preview CSVs
- Helper scripts for the grocery workflow
- Relevant recent memory files for grocery + relay/browser troubleshooting

## Not included
- `node_modules/`
- browser profiles/cookies
- full OpenClaw runtime state
- secrets tarballs / archives
- unrelated web assets and old project clutter

## Intended architecture
- MacBook: OpenClaw runtime, browser automation, store logins/sessions
- VPS: source-of-truth workspace, datasets, scripts, backups, cron/background work

## Next step on Mac
Unpack the bundle into a temporary folder first, review, then merge only what is actually needed into the Mac OpenClaw workspace.
