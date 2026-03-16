# Grocery Process

Purpose: turn the grocery project into a repeatable weekly system instead of one-off analysis.

## Core principle
**Receipts are truth. Plans are hypotheses.**

Every shopping cycle should end with receipt logging and model updates.

## Weekly workflow

### 1. Build / refresh the Master Needs list
- Start from the recurring unique-item universe.
- Use items purchased at least monthly as the base pool.
- Plan around a **2-week supply target**, not a full month of inventory.
- Keep a simple `Need This Week?` field so Jonathan can mark items with `y` / `n`.

### 2. Split items by store role
Use the current working store roles:
- **Costco** = bulk staples, snack staples, household stock-ups, clearly worthwhile in-store wins
- **Aldi** = cheap staples, produce, flexible meal ingredients, value fill-ins
- **Walmart** = brand-specific cleanup store, specialty items, missing items Aldi/Costco do not fit well

### 3. Build store-specific shopping outputs
From the checked items:
- Create a **Costco in-store list**
- Build **Aldi cart** (curbside or in-store list)
- Build **Walmart pickup cart**

### 4. Respect shopping reality
- Costco often makes sense as an **inventory-verified in-store list** rather than a Same-Day cart.
- Aldi and Walmart can be cart-built slowly/reliably when useful.
- Do **not** place orders automatically unless Jonathan explicitly asks.
- Cart-building is allowed; checkout/order placement requires explicit permission.

### 5. After shopping: log receipts
For every receipt:
- Extract line items
- Capture store, date, item description, quantity, total
- Append to raw purchase history
- Use the new data to update price comparisons and preference signals

### 6. Recalculate learnings
After receipts are logged:
- Compare estimated vs actual totals
- Compare estimated vs actual savings
- Update recurring-item preferences
- Update store-role assumptions if needed

---

## Automation guidance

### Browser-control rules
- Prefer **one active store tab at a time**
- Use **explicit waits** and **post-click verification**
- Use role/ARIA-first targeting when possible
- Verify cart count changes after each add
- Accept that Aldi may be slower/more brittle than Walmart
- If reliable automation is slow, run it in the background / overnight

### Store-specific reality
- **Costco Same-Day / Instacart** is useful for inventory visibility, but prices may include markup
- **Costco in-store** pricing should be treated as the better truth when receipts are available
- **Aldi** is workable but more fragile in-browser
- **Walmart** has been the most automation-friendly of the three

---

## Modeling rules

### Recurring-item universe
Build the planning list from:
- unique canonical items
- recurring monthly purchases
- not just weekly staple volume inflation

### Two-layer grocery model
Keep the project mentally split into:
1. **Recurring staples / household baseline**
2. **Meal-plan-driven extras**

This matters because the big difference between a slim basket and a real weekly order is often the meal-plan layer.

### Costco-native items
Track items already normally bought at Costco separately.
Do **not** count them as newly discovered savings wins if they are already part of Jonathan's normal Costco behavior.

---

## End state
A successful grocery cycle should produce:
- one updated master needs sheet
- one Costco list
- one Aldi list/cart
- one Walmart list/cart
- receipts logged into raw data
- updated savings estimate grounded in actual receipt data
