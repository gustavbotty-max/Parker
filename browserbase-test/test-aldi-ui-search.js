require('dotenv').config();
const { chromium } = require('playwright-core');
const Browserbase = require('@browserbasehq/sdk').default;

async function snippet(page, n = 1400) {
  const txt = await page.locator('body').innerText().catch(() => '');
  return txt.replace(/\s+/g, ' ').slice(0, n);
}

async function main() {
  const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY });
  const session = await bb.sessions.create({
    projectId: process.env.BROWSERBASE_PROJECT_ID,
    browserSettings: {
      recordSession: true,
      logSession: true,
      solveCaptchas: true,
      advancedStealth: false,
      blockAds: false,
    },
    keepAlive: false,
  });

  console.log('Session ID:', session.id);
  console.log('Replay URL:', `https://browserbase.com/sessions/${session.id}`);

  const browser = await chromium.connectOverCDP(session.connectUrl || session.connect_url);
  const context = browser.contexts()[0];
  const page = context.pages()[0] || await context.newPage();
  page.setDefaultTimeout(30000);

  await page.goto('https://www.aldi.us/store/aldi/storefront', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);

  // Try search box
  const search = page.locator('input[placeholder*="Ask or search" i], input[aria-label*="search" i], input[type="search"]').first();
  console.log('Search count:', await search.count().catch(() => 0));

  if (await search.count().catch(() => 0)) {
    for (const item of ['bananas', 'milk', 'eggs']) {
      await search.fill(item).catch(() => {});
      await page.waitForTimeout(1500);
      await search.press('Enter').catch(() => {});
      await page.waitForTimeout(6000);
      console.log(`\n=== SEARCH UI ITEM: ${item} ===`);
      console.log('URL:', page.url());
      console.log(await snippet(page));
      await page.goto('https://www.aldi.us/store/aldi/storefront', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(4000);
    }
  }

  await page.screenshot({ path: 'aldi-ui-search-browserbase.png', fullPage: true }).catch(() => {});
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
