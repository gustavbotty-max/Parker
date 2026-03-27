require('dotenv').config();
const { chromium } = require('playwright-core');
const Browserbase = require('@browserbasehq/sdk').default;

async function textSnippet(page, n = 800) {
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
  page.setDefaultTimeout(25000);

  await page.goto('https://www.walmart.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  console.log('Initial homepage snippet:', await textSnippet(page, 400));

  // Try location flow
  const pickupText = page.getByText(/Pickup or delivery\?/i).first();
  if (await pickupText.count().catch(() => 0)) {
    await pickupText.click().catch(() => {});
    await page.waitForTimeout(2000);
  }

  const zipInput = page.locator('input[aria-label*="ZIP" i], input[placeholder*="ZIP" i], input[name*="zip" i]').first();
  if (await zipInput.count().catch(() => 0)) {
    await zipInput.fill('27610').catch(() => {});
    await page.waitForTimeout(1000);
    const submitBtn = page.getByRole('button', { name: /save|update|continue|search/i }).first();
    if (await submitBtn.count().catch(() => 0)) {
      await submitBtn.click().catch(() => {});
      await page.waitForTimeout(4000);
    }
  }

  // Directly search for the New Bern Ave store if UI path didn't expose a zip input
  const storeSearch = page.locator('input[aria-label*="store" i], input[placeholder*="store" i], input[placeholder*="city" i], input[aria-label*="Search" i]').nth(1);
  if (await storeSearch.count().catch(() => 0)) {
    await storeSearch.fill('New Bern Raleigh NC').catch(() => {});
    await page.waitForTimeout(1000);
    await storeSearch.press('Enter').catch(() => {});
    await page.waitForTimeout(5000);
  }

  // Try to click a Raleigh/New Bern store if listed
  const possibleStore = page.getByText(/New Bern|Raleigh|27610/i).first();
  if (await possibleStore.count().catch(() => 0)) {
    await possibleStore.click().catch(() => {});
    await page.waitForTimeout(3000);
  }

  console.log('Post-location snippet:', await textSnippet(page, 700));

  const items = ['bananas', 'milk', 'eggs', 'ground beef'];
  for (const item of items) {
    await page.goto(`https://www.walmart.com/search?q=${encodeURIComponent(item)}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(4000);
    const snippet = await textSnippet(page, 1200);
    console.log(`\n=== ITEM: ${item} ===`);
    console.log('URL:', page.url());
    console.log(snippet);
  }

  await page.screenshot({ path: 'walmart-raleigh-browserbase.png', fullPage: true }).catch(() => {});
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
