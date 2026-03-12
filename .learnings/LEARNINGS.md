### OAuth Authentication in Limited-Graphics Environments
**Date:** 2026-03-09

#### Context:
Attempted to refresh Google account tokens using browser-based OAuth flow in VNC desktop environment. The browser (Epiphany) launched successfully under `DISPLAY=:1` but encountered rendering warnings (GTK and GPU-related) and callback URL failures.

#### Key Learning:
- Browser-based authentication in VNC can be unreliable due to rendering limitations and network callback issues.
- Terminal-based OAuth (`--manual` flag), which generates an authorization URL for manual input, is more reliable in environments with limited graphics support.

#### Actionable Outcome:
- Prefer terminal-based authentication methods over VNC browser workflows when working in constrained graphical environments.
- Document terminal-based OAuth command for quick reference:
  ```bash
  GOG_KEYRING_PASSWORD='your-keyring-password' gog auth add you@gmail.com --services drive,docs --manual
  ```
- Consider installing lightweight and GPU-friendly browsers (e.g., Brave with flags) for fallback UI-based flows when necessary.

---

## [LRN-20260312-001] correction

**Logged**: 2026-03-12T00:36:00Z
**Priority**: high
**Status**: pending
**Area**: docs

### Summary
Do not treat protein gram labels in grocery item names as package size or unit-of-measure.

### Details
While normalizing grocery items, strings like `20G`, `23g`, or `10g` in protein drink names were being interpreted as size/unit hints. Jonathan clarified these numbers refer to grams of protein content, not package size, pack count, or consumable unit volume. For grocery normalization, those labels should be ignored as nutrition metadata unless explicitly needed for product classification.

### Suggested Action
Update grocery normalization logic so protein grams are excluded from size extraction and unit normalization. Use actual package indicators like `4 count`, `8 pack`, `7 fl oz`, etc. for normalization. Keep protein drinks and yogurt drinks separate canonical groups.

### Metadata
- Source: user_feedback
- Related Files: burn_rate_items_weekly.csv, grocery_mapping_suggestions_refined.csv, grocery_normalized_model.csv
- Tags: grocery, normalization, units, correction

---
