### Google Workspace (gog CLI) Access
- **Account:** gustavbotty@gmail.com
- **Keyring Passphrase:** `MrGustavBotty#2000` (used for `GOG_KEYRING_PASSWORD` environment variable).
- **Services:** Calendar, Gmail, Drive, Contacts, Sheets, Docs.
- Note: Passphrase should be used for automated tasks requiring `gog` CLI authentication (e.g., uploading files, managing Drive content).

### Parker Content Pipeline (recap)
- **Purpose:** Multi-agent content system that generates research → blog drafts → social + video scripts to feed the calculators site.
- **Repos:**
  - **Private pipeline repo:** operational system (agents, content drafts, pipeline state).
  - **Public site repo (GitHub Pages):** `gustavbotty-max/Parker` with published content only.
- **Agents & outputs:**
  - **Scout** → `content/research/`
  - **Quill** → `content/blog/`
  - **Echo** → `content/social/`
  - **Frame** → `content/scripts/`
- **Workflow:** Scout research → Quill blog → human review → publish to public repo → Echo/Frame generate social + scripts.
- **Orchestrator:** `./agents/orchestrator.sh pipeline "<topic>"`
- **Publish:** copy approved blog post to `Parker/blog-posts/` then commit/push.
