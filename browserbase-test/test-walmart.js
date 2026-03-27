require('dotenv').config();
const { chromium } = require('playwright-core');
const Browserbase = require('@browserbasehq/sdk').default;

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

  await page.goto('https://www.walmart.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  console.log('Final URL after load:', page.url());
  console.log('Title after load:', await page.title());

  const bodyText = await page.locator('body').innerText().catch(() => '');
  console.log('Body snippet:', bodyText.replace(/\s+/g, ' ').slice(0, 500));

  const searchBox = page.locator('input[type="search"], input[aria-label*="Search" i], input[name="q"]');
  const searchCount = await searchBox.count().catch(() => 0);
  console.log('Search box count:', searchCount);

  if (searchCount > 0) {
    await searchBox.first().fill('bananas');
    await searchBox.first().press('Enter');
    await page.waitForTimeout(5000);
    console.log('URL after search:', page.url());
    console.log('Title after search:', await page.title());
    const resultSnippet = await page.locator('body').innerText().catch(() => '');
    console.log('Search result snippet:', resultSnippet.replace(/\s+/g, ' ').slice(0, 700));
  }

  await page.screenshot({ path: 'walmart-browserbase.png', fullPage: true }).catch(() => {});
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
