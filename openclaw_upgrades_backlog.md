# OpenClaw Upgrades Backlog

## Purpose
Track the most useful upgrades for Jonathan's OpenClaw setup so improvements are intentional instead of rediscovered in chat.

---

## Do now

### 1. Stabilize the Mac second-body browser workflow
Why:
- high-value capability for grocery shopping, Drive work, and live website tasks
- already proven useful
- previously too brittle

Success state:
- Ubuntu is the control plane
- Mac is a connected node
- browser tasks reliably route to the Mac
- browser work does not require ritual debugging

### 2. Prefer the Mac managed browser for repeatable web tasks
Why:
- less fragile than personal Chrome attach / relay
- better for store pricing and Google Sheets work
- easier to reason about operationally

Use for:
- Costco / Instacart
- Walmart
- Google Drive / Sheets
- repeat shopping/admin workflows

### 3. Make grocery workflow Google-Sheet-first by default
Why:
- the live sheet is the real planning source
- local files are useful but can be stale
- manual sheet edits should override local assumptions

### 4. Normalize receipt handling
Why:
- receipts are actual purchase truth
- current receipt handling is too ad hoc

Upgrade target:
- clean scans become appendable raw-data entries
- bad receipt photos are explicitly treated as non-loggable
- the system updates actual store behavior from receipts, not just prior plans

### 5. Capture operational runbooks for recurring systems
Needed runbooks:
- Mac second body / browser
- grocery system
- Parker content pipeline
- site publishing workflow

---

## Do next

### 6. Add useful cron jobs
High-value cron candidates:
- morning business brief
- unread email / upcoming calendar check
- weekly grocery prep prompt
- weekly site/content reminder
- receipt logging follow-up reminder

Why:
- makes the system proactive
- reduces the need to manually remember recurring tasks

### 7. Tighten gateway/service hygiene
Why:
- current setup has shown drift and split-brain behavior
- better service hygiene reduces surprise failures

Likely actions:
- run `openclaw doctor` periodically
- document the desired gateway/node architecture
- reduce local/remote ambiguity

### 8. Improve project-specific workflow docs
Examples:
- which files are canonical
- which sheets matter
- what browser path to use
- how to recover when a workflow breaks

---

## Nice next

### 9. Build a grocery-specific skill or helper layer
Why:
- grocery project already has enough repeated logic to justify a more intentional interface

Potential scope:
- read live sheet
- combine with local burn-rate files
- build weekly draft
- process receipts
- suggest store assignments

### 10. Formalize a price-tracking list for recurring staples
Good targets:
- nuts
- cereal
- milk
- eggs
- bread / bagels
- snack staples

Why:
- some items are worth periodic live comparisons
- avoids redoing the same reasoning every trip

### 11. More intentional model/task routing
Why:
- infrastructure debugging, planning, and content work have different needs
- cleaner model use usually improves reliability and cost control

---

## Future experiments

### 12. Better browser automation on the Mac node
Possible directions:
- more stable managed-browser workflows
- reliable logged-in shopping/browser surfaces
- saved task-specific browser profiles

### 13. Richer Drive/Sheets operational layer
Possibilities:
- more direct sheet append/update flows
- more reliable receipt-to-sheet logging
- fewer manual intermediate steps

### 14. More specialized skills
Good categories:
- browser/node operations
- Google Sheets-heavy workflows
- receipt / OCR workflows
- content/video production

---

## Priority order (practical)
1. Mac second-body/browser stability
2. Managed browser usage for repeatable web tasks
3. Google-Sheet-first grocery workflow
4. Receipt normalization
5. Useful cron jobs
6. Better service hygiene

---

## Rule of thumb
Prefer upgrades that make the current system:
- more reliable
- easier to operate repeatedly
- less dependent on remembering tribal knowledge

Prefer reliability over shiny features.
