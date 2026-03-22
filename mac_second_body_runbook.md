# Mac Second-Body Runbook

## Purpose
Make Jonathan's MacBook behave like a reliable second body for OpenClaw tasks that need:
- a real browser
- logged-in websites
- Google Drive / Sheets access
- store-site pricing and shopping workflows

This exists because browser-heavy tasks (especially grocery work) are much more reliable when they run on the MacBook instead of trying to force everything through the Ubuntu host alone.

---

## Machines and roles

### Ubuntu host (`gustavo`)
Role:
- primary OpenClaw gateway
- primary assistant runtime
- canonical control plane

Known details:
- LAN IP used during repair: `10.0.0.107`
- SSH login from Mac worked to: `ubuntu@132.145.202.45`
- Ubuntu SSH key used for Mac access: `~/oracle_key`

### MacBook (`Kellys MacBook Pro`)
Role:
- second body / node
- browser-capable machine
- shopping / logged-in web surface

Known access:
- user: `jonathanparker`
- Tailscale IP: `100.94.134.110`
- SSH from Ubuntu:
  ```bash
  ssh -i ~/oracle_key jonathanparker@100.94.134.110
  ```

---

## Current working architecture

### Working model
The stable repaired path is:
1. Ubuntu runs the parent gateway.
2. Mac runs the node service.
3. Mac opens an SSH tunnel back to Ubuntu.
4. Mac node talks to the tunneled Ubuntu gateway through local loopback.

This avoids OpenClaw's plaintext private-network WebSocket restrictions and is safer/more reliable than directly pointing the Mac node at a LAN `ws://` endpoint.

### Why this was necessary
Direct node-to-LAN WebSocket was blocked because OpenClaw does not want insecure non-loopback `ws://` connections by default.
Using an SSH tunnel lets the Mac keep talking to `127.0.0.1` while the traffic safely reaches Ubuntu.

---

## Important files and services

### On Ubuntu
OpenClaw config:
- `~/.openclaw/openclaw.json`

Gateway settings repaired during this session:
- `gateway.bind = lan`
- `gateway.tailscale.mode = off`

### On the Mac
OpenClaw config:
- `~/.openclaw/openclaw.json`

LaunchAgents:
- `~/Library/LaunchAgents/ai.openclaw.node.plist`
- `~/Library/LaunchAgents/ai.openclaw.gateway-tunnel.plist`
- `~/Library/LaunchAgents/ai.openclaw.gateway.plist` *(standalone local gateway path; should not be the preferred operational path for second-body browser work)*

Useful Mac logs:
- `~/.openclaw/logs/node.log`
- `~/.openclaw/logs/node.err.log`
- `~/.openclaw/logs/gateway-tunnel.log`
- `~/.openclaw/logs/gateway-tunnel.err.log`

---

## Quick health checks

### From Ubuntu
Check whether the Mac second body is connected:
```bash
openclaw nodes status
```

Test Mac SSH access:
```bash
ssh -i ~/oracle_key jonathanparker@100.94.134.110
```

### From the Mac
Check node service:
```bash
/Users/jonathanparker/.nvm/versions/node/v24.14.0/bin/openclaw node status
```

Check browser status:
```bash
/Users/jonathanparker/.nvm/versions/node/v24.14.0/bin/openclaw browser status
```

Check whether the gateway tunnel is alive:
```bash
launchctl list | grep ai.openclaw.gateway-tunnel
```

---

## Browser workflow guidance

### Preferred browser strategy
For repeatable automation, prefer:
- the Mac second body
- the OpenClaw-managed browser on the Mac node

Use this for:
- Costco / Instacart
- Walmart
- Google Drive / Google Sheets
- other shopping/admin workflows

### Personal browser caveat
Personal Chrome / Browser Relay can work, but it is more fragile and more sensitive to host/profile attachment issues.
Use the managed browser when possible.

### If browser tasks fail
Check in this order:
1. `openclaw nodes status` on Ubuntu
2. SSH to the Mac
3. Mac Tailscale connected
4. Mac node service healthy
5. Mac browser status healthy
6. gateway tunnel running on Mac

---

## SSH / authentication notes

### Ubuntu → Mac SSH prerequisites
These must remain true:
- Mac is on Tailscale
- macOS `Remote Login` is enabled
- Mac trusts Ubuntu public key in:
  - `~/.ssh/authorized_keys`

Ubuntu key used during repair:
- private key: `~/oracle_key`
- public key: `~/oracle_key.pub`

### Fast SSH test
```bash
ssh -i ~/oracle_key jonathanparker@100.94.134.110 'echo connected && hostname && whoami'
```

---

## Failure modes to remember

### Symptom: relay is ON but tabs do not appear to the assistant
Possible causes:
- Mac node disconnected from Ubuntu gateway
- Mac was running as its own standalone local gateway instead of a clean second body
- browser control was landing in the wrong gateway context

### Symptom: Ubuntu cannot use Mac browser
Check:
- Ubuntu gateway healthy
- Ubuntu gateway reachable
- Mac node connected
- browser capability exposed on the connected node

### Symptom: SSH fails from Ubuntu to Mac
Interpretation:
- timeout = Tailscale / network path issue
- connection refused = Remote Login off / no SSH server
- permission denied = auth key problem

---

## What to do before browser-heavy tasks
When the user wants live web work (shopping, pricing, Drive, etc.):
1. Confirm the Mac second body is connected.
2. Prefer the Mac node browser.
3. Use SSH to inspect/fix the Mac if needed.
4. Avoid assuming the personal browser path is healthy.

---

## Goal state
The durable goal is:
- Jonathan says: "we need to grocery shop"
- assistant checks node health
- assistant uses Mac browser
- assistant reads live sheets / store sites
- assistant produces store-optimized plan
- assistant logs receipts back into the system afterward

If this runbook is being consulted, something is either broken or important enough to verify before shopping/browser work.
