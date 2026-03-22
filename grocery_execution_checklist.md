# Grocery Execution Checklist

## Purpose
Operational checklist for running the grocery system end-to-end with minimal re-derivation.

Use this when Jonathan says:
- "We need to grocery shop"
- "Build this week's order"
- "Figure out which store to buy this from"
- "Check live pricing"

---

## Core principle
For this project:
- **Google Sheets / Drive = live planning source of truth**
- **receipts = actual purchase truth**
- **local files = analysis, backup, and supporting logic**

Do not rely on local CSVs alone if the live sheet exists.

---

## Part 1 — Weekly grocery planning

### Step 1 — Check the live sheet first
Review the active grocery spreadsheet(s):
- Master Needs Google Sheet
- Weekly grocery savings / comparison sheet

Look for:
- current needs
- manual edits
- notes about low/out items
- store-specific plans

### Step 2 — Review local support files
Use these as support, not sole truth:
- `grocery_project_workflow.md`
- `grocery_process.md`
- `grocery_store_roles.md`
- `grocery_known_preferences.md`
- `master_household_needs_list.csv`
- burn-rate files
- normalized grocery model files
- prior weekly drafts / store output files

### Step 3 — Build the likely weekly draft
Output should include:
- likely needed items
- recommended store per item
- uncertainty flags
- questions only where necessary

Store defaults:
- **Costco** = bulk/value staples
- **Aldi** = produce, cheap staples, pantry fill-ins
- **Walmart** = brand-specific cleanup store

### Step 4 — Confirm only the key unknowns
Ask the smallest useful set of questions, such as:
- doing Costco this week?
- out of detergent?
- pizzas needed?
- muffins/bagels needed?
- any special meal plans?

### Step 5 — Live pricing check when needed
If browser workflow is healthy:
- use the Mac second body
- prefer the managed browser path
- check Costco / Walmart / Aldi live prices for high-impact items

High-value live price checks are usually:
- nuts
- cereal
- milk / eggs
- family snack staples
- brand-sensitive items

### Step 6 — Finalize store-by-store list
Return a clean output split into:
- Aldi
- Costco
- Walmart

---

## Part 2 — Browser / Mac path for grocery work

### Preferred path
Use the MacBook as the shopping/browser second body.

### Before live web work, verify
From Ubuntu:
```bash
openclaw nodes status
ssh -i ~/oracle_key jonathanparker@100.94.134.110
```

If needed, confirm on Mac:
- Tailscale connected
- Remote Login enabled
- node service healthy
- browser healthy

### If browser work breaks
Check in order:
1. Is the Mac node connected?
2. Can Ubuntu SSH into the Mac?
3. Is the browser running on the Mac?
4. Is the managed browser path healthier than the personal browser path?
5. If no live pricing is available, explicitly say prices were not confirmed live.

---

## Part 3 — Receipt handling

### Receipt quality rules
- rough photo = okay for quick sanity check only
- clean scan / straightened full image = acceptable for logging
- partial / blurry receipt = do not append guessed rows

### When Jonathan sends a receipt
1. Identify store and date.
2. Decide if quality is sufficient for line-item extraction.
3. Extract only clearly readable rows.
4. Append to raw purchase data / spreadsheet workflow only if quality is good enough.
5. Use the receipt to update what was actually bought and where.

### Important rule
Receipt truth overrides planning assumptions.
If the family actually bought it at Aldi/Walmart/Costco, log that reality.

---

## Part 4 — Decision rules

### Prefer Aldi when
- produce quality/price is good
- pantry staples are clearly cheaper
- private-label equivalent is acceptable
- the item is not brand-sensitive

### Prefer Costco when
- bulk quantity is genuinely useful
- unit price is clearly better
- the household consistently consumes the item
- it is a staple, not a one-off novelty

### Prefer Walmart when
- exact brand matters
- Costco bulk is impractical
- Aldi equivalent is not acceptable
- it is a cleanup item after Aldi/Costco

---

## Part 5 — Minimal success criteria
A successful grocery run should produce:
- a realistic weekly list
- store assignments that are actually practical
- no fake certainty about live pricing
- receipts fed back into the system afterward

That is more important than pretending every item has been perfectly optimized.
