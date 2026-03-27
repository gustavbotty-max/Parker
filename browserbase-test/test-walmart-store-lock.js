require('dotenv').config();
const { chromium } = require('playwright-core');
const Browserbase = require('@browserbasehq/sdk').default;

async function bodySnippet(page, n = 1200) {
  const txt = await page.locator('body').innerText().catch(() => '');
  return txt.replace(/\s+/g, ' ').slice(0, n);
}

async function main() {
  const apiKey = process.env.BROWSERBASE_API_KEY;
  const projectId = process.env.BROWSERBASE_PROJECT_ID;
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
    keepAlive: false,
  });

  console.log('Session ID:', session.id);
  console.log('Replay URL:', `https://browserbase.com/sessions/${session.id}`);

  const browser = await chromium.connectOverCDP(session.connectUrl || session.connect_url);
  const context = browser.contexts()[0];
  const page = context.pages()[0] || await context.newPage();
  page.setDefaultTimeout(30000);

  // Try direct location pages first
  const locationUrls = [
    'https://www.walmart.com/store/1372-raleigh-nc',
    'https://www.walmart.com/store-finder?location=27610',
    'https://www.walmart.com/search?q=bananas&location=27610'
  ];

  for (const url of locationUrls) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(4000);
      console.log('\nVisited:', url);
      console.log('Final URL:', page.url());
      console.log('Title:', await page.title());
      console.log('Snippet:', await bodySnippet(page, 700));
    } catch (e) {
      console.log('Visit failed for', url, e.message);
    }
  }

  // Try explicit store page and then search from there
  await page.goto('https://www.walmart.com/store/1372-raleigh-nc', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  console.log('\nStore page URL:', page.url());
  console.log('Store page title:', await page.title());
  console.log('Store page snippet:', await bodySnippet(page, 1200));

  // Search from current session after hitting store page
  const items = ['bananas', 'milk', 'eggs'];
  for (const item of items) {
    await page.goto(`https://www.walmart.com/search?q=${encodeURIComponent(item)}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(4000);
    const snippet = await bodySnippet(page, 1400);
    console.log(`\n=== AFTER STORE PAGE ITEM: ${item} ===`);
    console.log('URL:', page.url());
    console.log(snippet);
  }

  await page.screenshot({ path: 'walmart-store-lock-browserbase.png', fullPage: true }).catch(() => {});
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
