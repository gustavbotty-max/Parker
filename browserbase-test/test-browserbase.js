require('dotenv').config();
const { chromium } = require('playwright-core');
const Browserbase = require('@browserbasehq/sdk').default;

async function main() {
  const apiKey = process.env.BROWSERBASE_API_KEY;
  const projectId = process.env.BROWSERBASE_PROJECT_ID;

  if (!apiKey) {
    throw new Error('Missing BROWSERBASE_API_KEY in .env');
  }

  const bb = new Browserbase({ apiKey });
  const session = await bb.sessions.create({
    projectId,
    browserSettings: {
      recordSession: true,
      logSession: true,
      solveCaptchas: true,
      advancedStealth: false,
      blockAds: false,
    },
    keepAlive: true,
  });

  console.log('Session ID:', session.id);
  console.log('Connect URL:', session.connectUrl || session.connect_url);
  console.log('Replay URL:', `https://browserbase.com/sessions/${session.id}`);

  const browser = await chromium.connectOverCDP(session.connectUrl || session.connect_url);
  const context = browser.contexts()[0];
  const page = context.pages()[0] || await context.newPage();

  await page.goto('https://example.com', { waitUntil: 'domcontentloaded' });
  console.log('Title:', await page.title());

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
