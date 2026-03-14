# Mac OpenClaw Grocery Bundle

Purpose: minimal transfer package for moving grocery-project context and data from the VPS to the MacBook OpenClaw instance.

## Included
- Core workspace identity/context files (AGENTS.md, SOUL.md, USER.md, MEMORY.md, TOOLS.md)
- Grocery data inputs and normalized outputs
- Burn-rate outputs
- Refined mapping/canonical preview CSVs
- A few helper scripts used in the grocery workflow
- Recent daily memory files relevant to grocery + relay/browser setup

## Not Included
- node_modules/
- .git/
- secrets/archive blobs
- browser profiles/cookies
- full OpenClaw runtime state
- random legacy website assets unrelated to grocery pricing

## Suggested destination on Mac
Place these inside the Mac OpenClaw workspace, then review before merging with any existing files.

## First tasks on Mac
1. Verify `openclaw status`
2. Confirm browser/relay strategy
3. Rehydrate grocery workspace files
4. Test one store pricing workflow (Costco/Instacart first)
