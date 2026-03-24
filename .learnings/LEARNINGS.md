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

## [LRN-20260313-001] best_practice

**Logged**: 2026-03-13T00:05:03Z
**Priority**: high
**Status**: pending
**Area**: infra

### Summary
For cron-driven Telegram digests, use `openclaw agent --local --deliver --channel telegram --to <id>` instead of relying on gateway session context.

### Details
A recurring email-digest cron stopped sending `All clear` messages. Manual testing showed gateway-mode `openclaw agent` could fail with `Context overflow: prompt too large for the model`, while embedded/local mode succeeded and delivered normally. Also, current CLI delivery requires an explicit destination such as `--to 6683507702` for Telegram.

### Suggested Action
Prefer embedded/local delivery for unattended cron jobs, and always specify the destination target explicitly. Keep stderr visible through logger so silent failures do not disappear into `/dev/null`.

### Metadata
- Source: error
- Related Files: /usr/local/bin/check_agentmail.sh
- Tags: cron, telegram, openclaw, context-overflow, delivery

---

## [LRN-20260314-001] correction

**Logged**: 2026-03-14T20:48:00Z
**Priority**: high
**Status**: pending
**Area**: docs

### Summary
For grocery planning, broadening from weekly items to monthly household needs requires expanding the distinct item set, not just increasing quantities on the same shortlist.

### Details
Jonathan pointed out that the broadened Google Sheet still felt wrong because it mostly reused the same core weekly items with larger volume assumptions. The correct interpretation of "all items we buy at least once per month" is to include more distinct recurring categories/items from purchase history, not just monthlyized weekly staples.

### Suggested Action
When building household-needs sheets, start from the recurring-item universe (e.g. bought at least once in the last 4 months or satisfying the 4-month block rule), then assign store recommendations. Keep separate outputs for master needs, Costco trip list, Aldi pickup, and Walmart pickup.

### Metadata
- Source: user_feedback
- Related Files: weekly_mock_order_3store_2026-03-14.md, master_household_needs_list.csv
- Tags: grocery, planning, sheet-design, correction

---

## [LRN-20260323-001] best_practice

**Logged**: 2026-03-23T21:40:00Z
**Priority**: high
**Status**: pending
**Area**: docs

### Summary
When publishing Parker blog posts, update both the main blog index and the homepage recent-articles grid (including duplicated `Parker/` site copies), not just `blog.html`.

### Details
A recurring publishing issue caused new posts to appear only after clicking "View All Articles" because `scripts/publish_blog_post.py` updated the blog index but did not update the homepage article cards. The repo also contains duplicate site copies under both the root and `Parker/`, so a publish helper that only touches one surface silently leaves the live site out of sync.

### Suggested Action
Keep the publish helper responsible for syncing all blog surfaces in one run: generated post HTML, `blog.html`, homepage recent-articles section, and the mirrored `Parker/` copies. After publishing, verify the new slug appears in both `index.html` and `blog.html` before pushing.

### Metadata
- Source: user_feedback
- Related Files: scripts/publish_blog_post.py, index.html, blog.html, Parker/index.html, Parker/blog.html
- Tags: parker, blog, publishing, homepage, sync, self-improvement

---

## [LRN-20260324-001] best_practice

**Logged**: 2026-03-24T12:20:00Z
**Priority**: high
**Status**: pending
**Area**: infra

### Summary
For unattended OpenClaw cron-style agent runs, avoid the main session lane and pin the current OpenClaw binary explicitly.

### Details
The `check_agentmail.sh` cron job was intermittently failing not because email parsing was broken, but because its `openclaw agent --local` handoff was colliding with the main session JSONL lock. Cron also resolved `openclaw` to `/usr/bin/openclaw` (2026.3.8) while the active installed version was `/home/ubuntu/.nvm/versions/node/v22.22.0/bin/openclaw` (2026.3.13), causing config-version mismatch warnings. The more reliable pattern is to (1) use the current binary explicitly, (2) route through a dedicated non-main agent session, and (3) add a shell lock to prevent overlapping cron runs.

### Suggested Action
Use a dedicated agent (not the main session), pin the current OpenClaw binary path inside the script, and protect the cron script with `flock` so overlapping runs skip instead of stacking. For email triage specifically, allow proactive calendar checks/creation only when the scheduling signal is obvious.

### Metadata
- Source: simplify-and-harden
- Related Files: /usr/local/bin/check_agentmail.sh
- Tags: cron, openclaw, locking, agentmail, reliability
- Pattern-Key: harden.cron_agent_session_locking
- Recurrence-Count: 1
- First-Seen: 2026-03-24
- Last-Seen: 2026-03-24

---

## [LRN-20260324-002] correction

**Logged**: 2026-03-24T15:20:00Z
**Priority**: high
**Status**: pending
**Area**: infra

### Summary
Scheduling triage must treat reply confirmations without explicit times as scheduling events when the subject/thread clearly refers to an already-arranged meeting.

### Details
The email triage flow missed a Ben Talton scheduling confirmation because the latest email body only said things like "sounds great" / "look forward to meeting you then" without restating the exact date/time. The message still belonged to a scheduling thread and should have triggered a calendar lookup by subject/participants before replying `All clear`.

### Suggested Action
For email triage prompts and logic, classify replies/confirmations in active scheduling threads as scheduling items even when the newest message lacks explicit time text. Use subject names, participant names, and nearby dates to verify whether a calendar event already exists, and create one only if the meeting can be inferred confidently and no matching event is found.

### Metadata
- Source: user_feedback
- Related Files: /usr/local/bin/check_agentmail.sh
- Tags: email, scheduling, calendar, triage, prompt-design
- Pattern-Key: harden.email_thread_scheduling_detection
- Recurrence-Count: 1
- First-Seen: 2026-03-24
- Last-Seen: 2026-03-24

---

## [LRN-20260324-003] best_practice

**Logged**: 2026-03-24T20:35:00Z
**Priority**: high
**Status**: pending
**Area**: tooling

### Summary
When prompting an agent to use `gog calendar`, include the exact create command syntax. Otherwise the model may hallucinate `gog calendar events create`, which fails even though calendar access is working.

### Details
The email cron agent correctly identified sports scheduling emails and attempted calendar creation, but used the invalid command `gog calendar events create ...` instead of the real syntax `gog calendar create <calendarId> --summary ... --from ... --to ...`. This produced misleading “technical issue” messages that looked like calendar access failures when the real problem was bad CLI syntax selection by the model.

### Suggested Action
When an agent must use `gog calendar`, provide the exact create command shape in the prompt and prefer one canonical calendar ID (`gustavbotty@gmail.com`) for creation. Avoid vague instructions like `gog calendar events/create` that invite hallucinated subcommands.

### Metadata
- Source: recurring_tool_failure
- Related Files: /usr/local/bin/check_agentmail.sh
- Tags: gog, calendar, cli, prompting, cron, reliability
- Pattern-Key: harden.gog_calendar_exact_command
- Recurrence-Count: 1
- First-Seen: 2026-03-24
- Last-Seen: 2026-03-24

---
