# Errors Log

Command failures, exceptions, and unexpected behaviors.

---
## [ERR-20260307-001] git clone parker-pipeline auth

**Logged**: 2026-03-07T17:11:19Z
**Priority**: medium
**Status**: pending
**Area**: infra

### Summary
Git clone failed for https://github.com/gustavbotty-max/parker-pipeline due to missing credentials.

### Error
```
fatal: could not read Username for 'https://github.com': No such device or address
```

### Context
- Command: git clone https://github.com/gustavbotty-max/parker-pipeline
- Environment: OpenClaw workspace

### Suggested Fix
Provide GitHub credentials (token) or use SSH deploy key and repo access.

### Metadata
- Reproducible: yes
- Related Files: /home/ubuntu/.openclaw/workspace

---
## [ERR-20260307-002] decrypt openclaw-secrets tarball

**Logged**: 2026-03-07T17:43:07Z
**Priority**: medium
**Status**: pending
**Area**: infra

### Summary
Failed to decrypt openclaw-secrets-20260228.tar.gz.enc with provided passphrase.

### Error
```
openssl: bad decrypt
```

### Context
- File: /home/ubuntu/.openclaw/workspace/openclaw-secrets-20260228.tar.gz.enc
- Commands tried: openssl enc -d -aes-256-cbc (-salt), with and without -pbkdf2

### Suggested Fix
Confirm encryption command/cipher or passphrase; retry with correct options.

### Metadata
- Reproducible: yes
- Related Files: /home/ubuntu/.openclaw/workspace/openclaw-secrets-20260228.tar.gz.enc

---
## [ERR-20260314-002] python_missing_requests_module

**Logged**: 2026-03-14T01:40:00Z
**Priority**: low
**Status**: pending
**Area**: infra

### Summary
Quick HTML scraping fallback failed because the Python `requests` module is not installed in the workspace environment.

### Error
```
ModuleNotFoundError: No module named 'requests'
```

### Context
- Command: python3 inline script attempting requests.get('https://www.aldi.us/results?q=banana')
- Goal: scrape Aldi search result pages as fallback after cart flow redirected to login
- Environment: OpenClaw workspace host Python

### Suggested Fix
Use stdlib `urllib.request`, install `requests` in the project venv, or keep browser-based extraction as the default fallback.

### Metadata
- Reproducible: yes
- Related Files: /home/ubuntu/.openclaw/workspace/.learnings/ERRORS.md

---
## [ERR-20260314-003] git_add_ignored_workspace_bundle

**Logged**: 2026-03-14T17:15:00Z
**Priority**: low
**Status**: pending
**Area**: docs

### Summary
Attempting to commit the Mac migration bundle failed because `memory/` and the generated tarball path are ignored by the workspace gitignore rules.

### Error
```
The following paths are ignored by one of your .gitignore files:
memory
migration-package/mac-openclaw-grocery-bundle.tar.gz
```

### Context
- Command: `git add memory/2026-03-14.md .learnings/ERRORS.md migration-package/... && git commit ...`
- Goal: commit the migration prep artifacts after packaging the Mac transfer bundle

### Suggested Fix
Use `git add -f` for intentionally ignored artifacts, or commit only the non-ignored notes/scripts while leaving ignored runtime/memory artifacts out of git.

### Metadata
- Reproducible: yes
- Related Files: /home/ubuntu/.openclaw/workspace/.gitignore, /home/ubuntu/.openclaw/workspace/migration-package/

---
## [ERR-20260314-001] browser_tool_gateway_timeout

**Logged**: 2026-03-14T00:50:00Z
**Priority**: high
**Status**: pending
**Area**: infra

### Summary
OpenClaw browser tool timed out on start, preventing headless browser automation.

### Error
```
timed out. Restart the OpenClaw gateway (OpenClaw.app menubar, or `openclaw gateway`). Do NOT retry the browser tool — it will keep failing. Use an alternative approach or inform the user that the browser is currently unavailable.
```

### Context
- Operation attempted: browser start on host with profile=openclaw
- Goal: use headless-capable browser path for Aldi cart building
- User context: grocery cart/pricing automation

### Suggested Fix
Restart the OpenClaw gateway before attempting browser-tool automation again; use desktop/VNC browser as fallback.

### Metadata
- Reproducible: unknown
- Related Files: /home/ubuntu/.openclaw/workspace/TOOLS.md

---
