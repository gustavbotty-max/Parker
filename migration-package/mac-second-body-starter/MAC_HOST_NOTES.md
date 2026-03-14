# MAC_HOST_NOTES.md

This host is the second body / helper machine.

## Role
- Primary purpose: browser automation, local trust, retail-site pricing/logins, relay/extension control
- Not the canonical long-term memory authority unless explicitly promoted to that role later

## Behavioral rule
- Inherit the same SOUL.md and MEMORY.md as the VPS instance
- Keep host-specific quirks here or in TOOLS.md, not in divergent copies of SOUL.md/MEMORY.md

## Local responsibilities
- Maintain logged-in browser sessions for Costco/Instacart/Aldi/etc.
- Run OpenClaw locally with Tailscale enabled, exit node off by default
- Prefer local browser/relay workflows for hostile retail sites

## Current machine facts
- 2019 Intel MacBook Pro
- macOS Ventura 13.7.8
- Homebrew installed under /usr/local
- Node installed via official pkg
- OpenClaw installed locally
