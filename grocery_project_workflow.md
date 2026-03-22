# Grocery Project Workflow

## Purpose
Make the grocery system reliable enough that Jonathan can say:

> "We need to grocery shop"

…and the system can build, compare, and refine a real weekly grocery plan without re-deriving the whole process from chat history.

---

## Core source of truth

### 0. SSH / second-body browser access matters for this project
For this grocery project, browser work may need to run on Jonathan's MacBook rather than the Ubuntu host.

Current known access path:
- Mac user: `jonathanparker`
- Mac Tailscale IP: `100.94.134.110`
- Ubuntu private key: `~/oracle_key`
- Direct SSH test from Ubuntu:
  ```bash
  ssh -i ~/oracle_key jonathanparker@100.94.134.110
  ```

Important:
- The Mac may not always be on Tailscale.
- `Remote Login` must be enabled on macOS for SSH to work.
- If SSH breaks, verify:
  - Tailscale connected on the Mac
  - Remote Login enabled
  - `~/.ssh/authorized_keys` on the Mac still trusts the Ubuntu public key

### 1. Google Drive / Google Sheets = canonical planning source
For active grocery planning, always check the live Google Sheet(s) in Drive first.

These may include:
- master needs / household list
- weekly savings / comparison sheets
- manual adjustments Jonathan made directly
- latest working planning tabs

**Rule:** if the live sheet and local files disagree, prefer the live sheet unless there is a clear reason not to.

### 2. Local workspace files = analysis / backup / processing layer
Use local files for:
- receipt parsing
- historical CSV analysis
- burn-rate calculations
- canonical item mapping
- store-role logic
- backup copies of outputs

Local files are useful, but they are not always the freshest planning layer.

### 3. Receipts = truth for actual purchases
Plans are hypotheses.
Receipts are truth.

Whenever a real receipt is available:
- log it
- treat it as the source of truth for what was actually bought
- use it to improve price history and future store recommendations

---

## Workflow order

### Step 1 — Check live Google Sheet(s)
Before building a grocery plan:
- identify the active grocery spreadsheet in Drive
- review the latest tabs / edits
- check for manual overrides, current needs, or marked weekly items

Known live sheet references from project memory/docs:
- Master Needs Google Sheet: `https://docs.google.com/spreadsheets/d/1HjRnkbNLbG6E5RyaHu78px3AK44MzRPyPUiRfwhEf7c/edit`
- Weekly grocery savings sheet: `https://docs.google.com/spreadsheets/d/1Y_dZkIc3IuXkeiewwQJdXXbQI5xhF73nEb_vOMiFLJU/edit`

Do not start from local files alone if the live sheet exists.

### Step 2 — Use local analysis files to support planning
Then consult local files such as:
- `grocery_process.md`
- `grocery_store_roles.md`
- `grocery_known_preferences.md`
- `master_household_needs_list.csv`
- `burn_rate_canonical_weekly.csv`
- `burn_rate_canonical_weekly_top.csv`
- `grocery_normalized_model_v2.csv`
- prior store output files

Use them to:
- estimate likely run-through
- map items to stores
- identify recurring staples
- compare planned vs historical behavior

### Step 3 — Build this week’s draft
Produce:
- likely needed items this week
- recommended store for each item
- uncertainty flags / confirmation questions

Store roles:
- **Costco** = bulk staples, household stock-ups, clearly worthwhile bulk buys
- **Aldi** = produce, cheap staples, flexible meal ingredients, pantry fill-ins
- **Walmart** = brand-specific cleanup store, specialty items, missing items

### Step 4 — Use live pricing when possible
If browser control works:
- check live store pricing for likely items
- compare package sizes and unit prices
- optimize based on real current prices, not only historical averages

Preferred browser workflow:
1. Use the MacBook as the grocery-shopping second body.
2. Prefer the OpenClaw-managed browser on the Mac node for store-site work.
3. If needed, SSH into the Mac and verify node/browser state.
4. Use live store sites for Costco / Walmart / Aldi price confirmation.

Known browser/tooling notes:
- The repaired second-body path uses the Mac as a connected node.
- Browser tasks should prefer the Mac node when store sites or Drive/Sheets access matter.
- If the browser path seems broken, verify:
  - Mac node is connected from Ubuntu: `openclaw nodes status`
  - Mac SSH still works: `ssh -i ~/oracle_key jonathanparker@100.94.134.110`
  - Mac Tailscale is connected
  - Mac browser is running if user-browser work is needed

If browser control is unavailable:
- use receipt history and historical logic
- explicitly mark where live pricing was not confirmed
- do not pretend a stale price is a live price

### Step 5 — After shopping, log receipts
For each receipt:
- extract store, date, item, quantity, total
- append to the raw purchase history / spreadsheet workflow
- update store assumptions and price truth

Receipt-handling rules:
- A shaky phone photo is useful for rough price sanity checks.
- A clean scan or straightened full-photo receipt is preferred for logging line-item data.
- If the receipt is only partially legible, do **not** append guessed line items to the raw data sheet.
- If necessary, extract only the clearly readable subset and mark the rest as needing confirmation.
- Receipt truth should override prior plan assumptions.
- Use the receipt to update where the item was *actually* bought, not where it was originally recommended.

If a receipt scan is too low quality:
- ask for a better scan/photo before logging line-item data
- do not poison the raw dataset with bad OCR guesses

---

## Operating principles

### Google Sheet first
Do not assume local CSVs are current if a live Drive sheet exists.

### Avoid fake certainty
If the data is incomplete:
- say what is assumed
- say what needs confirmation
- do not overstate confidence

### Preserve manual edits
If Jonathan updates items directly in the spreadsheet, treat that as intentional input, not noise.

### Store assignment logic should stay practical
Optimization is not just cheapest unit price.
Also consider:
- brand preference
- trip practicality
- bulk burden
- whether a cheaper buy is actually realistic this week

---

## Operational checklist when Jonathan says "we need to grocery shop"
1. Check the live Google Sheet(s) first.
2. Review local grocery docs / burn-rate files second.
3. Build a likely weekly draft with store assignments.
4. Ask only the minimum confirmation questions needed.
5. Use the MacBook browser path for live price checks when available.
6. Separate the final plan into Aldi / Costco / Walmart.
7. After shopping, process receipts and update the raw data workflow.

## Operational checklist when Jonathan sends a receipt
1. Identify the store and date.
2. Judge receipt quality:
   - rough photo = sanity-check only
   - clean scan = logging candidate
3. Extract only clearly readable line items.
4. Append to the raw data spreadsheet/workflow if quality is good enough.
5. If quality is not good enough, ask for a better scan before logging.
6. Update assumptions about real purchase behavior, prices, and preferred stores.

## Future-state goal
The grocery project should become a repeatable loop:

1. Read live planning sheet
2. Combine with local burn-rate / receipt history
3. Build weekly draft
4. Confirm a few uncertainties
5. Shop / compare / refine
6. Log receipts back into the system

That makes the project durable instead of chat-fragile.
