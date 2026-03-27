require('dotenv').config();
const { chromium } = require('playwright-core');
const Browserbase = require('@browserbasehq/sdk').default;

async function snippet(page, n = 1200) {
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

  await page.goto('https://new.aldi.us/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  console.log('Homepage URL:', page.url());
  console.log('Homepage title:', await page.title());
  console.log('Homepage snippet:', await snippet(page, 800));

  // Try to dismiss cookie banner if present
  const cookieBtn = page.getByRole('button', { name: /accept|agree|allow/i }).first();
  if (await cookieBtn.count().catch(() => 0)) {
    await cookieBtn.click().catch(() => {});
    await page.waitForTimeout(1500);
  }

  // Try store search / pickup location flow
  const locationTriggers = [
    page.getByText(/store|pickup|delivery|shop groceries/i).first(),
    page.getByRole('button', { name: /store|pickup|delivery|shop groceries/i }).first(),
  ];
  for (const loc of locationTriggers) {
    if (await loc.count().catch(() => 0)) {
      await loc.click().catch(() => {});
      await page.waitForTimeout(2000);
      break;
    }
  }

  const zipInput = page.locator('input[placeholder*="ZIP" i], input[aria-label*="ZIP" i], input[placeholder*="address" i], input[aria-label*="address" i]').first();
  if (await zipInput.count().catch(() => 0)) {
    await zipInput.fill('27610').catch(() => {});
    await page.waitForTimeout(1000);
    const searchBtn = page.getByRole('button', { name: /search|continue|confirm|set store/i }).first();
    if (await searchBtn.count().catch(() => 0)) {
      await searchBtn.click().catch(() => {});
      await page.waitForTimeout(5000);
    }
  }

  console.log('Post-location snippet:', await snippet(page, 900));

  const items = ['bananas', 'milk', 'eggs'];
  for (const item of items) {
    try {
      await page.goto(`https://new.aldi.us/results?q=${encodeURIComponent(item)}`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(5000);
      console.log(`\n=== ITEM: ${item} ===`);
      console.log('URL:', page.url());
      console.log(await snippet(page, 1400));
    } catch (e) {
      console.log(`Search failed for ${item}:`, e.message);
    }
  }

  await page.screenshot({ path: 'aldi-browserbase.png', fullPage: true }).catch(() => {});
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
