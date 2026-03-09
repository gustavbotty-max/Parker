# WORKFLOW_AUTO.md

This file automates essential workflows in the OpenClaw workspace. Tasks or processes can be defined here to ensure seamless operation post-compaction or during initialization.

## Default Workflow
- Set Scout agent to handle research queries.
- Default findings output to `/home/ubuntu/.openclaw/workspace/content/research/YYYY-MM-DD-findings.md`.
- Use default model unless specified otherwise.

## Blog Publishing Checklist
1. **Feature latest post everywhere** – After running `publish_blog_post.py`, confirm the new slug appears first on both `index.html` (home page cards) and `blog.html` (full listing). If needed, manually insert the card at the top of each grid before deploying.
2. *(Reserved for future use)*
3. **Clean excerpts** – The publish script now unescapes card excerpts, but if you tweak copy manually, ensure no `&#x27;`-style entities remain before committing.
4. **Deploy immediately** – `git add blog.html index.html blog-posts/<slug>.html scripts/publish_blog_post.py && git commit -m "Publish <slug>" && git push origin main` so GitHub Pages updates the public site.

## Notes
- This file is auto-generated for compatibility.
- Define additional automation as necessary.