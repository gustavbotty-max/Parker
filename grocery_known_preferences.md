# Grocery Known Preferences

This file should contain only preferences strong enough to act on during planning/cart-building.

## Confirmed / strong signals
- **Crackers** → treat `Crunchmaster` as the correct interpretation for the current household cracker preference when a single cracker item must be chosen.
- **Blue Diamond almonds** → prefer the best value option, not automatically the most common historic size.
- **Costco-native staples** include snack/bar items that should not be counted as newly discovered savings wins if they were already normal Costco buys.
- **Costco snack staples** worth remembering:
  - fig bars
  - Kirkland protein bars
  - almond bars
- **Costco household stock-up** item worth remembering:
  - Free & Clear laundry detergent was identified as a strong deal.
- **Costco protein drinks**:
  - Chobani yogurt/protein drinks 8-packs are relevant enough to check for in stock.

## Things still too vague / should be refined later
- generic `crackers` bucket may still contain multiple behaviors in historical data even though Crunchmaster is the current best single fit
- some snack categories still need better canonical splitting
- meal-plan-driven items should not be mistaken for stable preference items
