# Browserbase test harness

## Setup
1. Copy `.env.example` to `.env`
2. Fill in `BROWSERBASE_API_KEY` and optionally `BROWSERBASE_PROJECT_ID`
3. Run:
   ```bash
   node test-browserbase.js
   ```

## What this does
- Creates a Browserbase session
- Connects via Playwright CDP
- Opens example.com
- Prints session/replay info

## Installed packages
- playwright-core
- @browserbasehq/sdk
- dotenv
