# Grocery Receipt Logging

## Goal
Keep the grocery model current by logging every real purchase back into the raw data.

## Rule
Every receipt should update the raw purchase history.

## Minimum fields to capture
- `date`
- `store`
- `item`
- `quantity`
- `total`

Optional but helpful:
- unit size
- unit price
- category guess
- notes about substitutions or promotions

## Process
1. Receive receipt photo or screenshot
2. Extract readable line items
3. Normalize obvious OCR mistakes only when confidence is high
4. Append rows into the raw consolidated history
5. Re-run analyses if needed:
   - recurring item review
   - price comparisons
   - store assignment logic
   - weekly/monthly planning sheets

## Important interpretation rules
- Do not assume a planned item equals the purchased item without checking the receipt.
- Treat the receipt as the source of truth when plan vs actual differs.
- Use receipts to improve item specificity for vague canonical buckets.

## Examples of why this matters
- actual Aldi items may differ from planned Aldi items
- Costco in-store prices can beat Same-Day estimates
- Walmart brand preferences become clear only from repeated receipt lines
- meal-plan extras show up in receipts even when not in the recurring baseline
