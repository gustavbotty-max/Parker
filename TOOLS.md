# TOOLS.md - Local Notes

### Oracle VPS VNC Access (Visual OS and Browser)
- **Host:** 100.81.191.88 (Tailscale IP)
- **Port:** 5901
- **Password:** GustavtheGoat
- **Notes:**
  - XFCE desktop accessible via VNC over Tailscale network.
  - Browsers available: Epiphany, Brave (use flags: `--no-sandbox --disable-gpu`).
  - Screenshot tool installed: `scrot`.

### SSH Details
- **Command:** `ssh -i ~/oracle_key ubuntu@132.145.202.45`
- **Purpose:** SSH into Oracle VPS for setup and management tasks.

### MacBook Second-Body Access
- **Mac user:** `jonathanparker`
- **Mac Tailscale IP:** `100.94.134.110`
- **SSH from Ubuntu:** `ssh -i ~/oracle_key jonathanparker@100.94.134.110`
- **Requirements:**
  - Tailscale connected on the Mac
  - macOS Remote Login enabled
  - Mac `~/.ssh/authorized_keys` trusts Ubuntu's `~/oracle_key.pub`
- **Notes:**
  - Grocery/browser tasks may need to run on the Mac as the second body.
  - The repaired second-body path uses a Mac → Ubuntu SSH tunnel for the node/gateway path.

### VNC Login Credentials
- **VNC Password:** GustavtheGoat
- **Username:** ubuntu
