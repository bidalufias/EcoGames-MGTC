// Click through into each game's play screen and screenshot it.
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const BASE = 'http://localhost:5173';
const OUT_DIR = 'scripts/portrait-shots';

await mkdir(OUT_DIR, { recursive: true });

// Smaller height than the device's 844px so the screenshots reflect
// what's visible with iOS Safari's URL + tab bars on screen — the
// scenario where bin trays / boards previously clipped under chrome.
const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});
const context = await browser.newContext({
  viewport: { width: 390, height: 680 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});

const flows = [
  {
    name: '08-recycle-rush-play',
    path: '/games/recycle-rush',
    steps: async (page) => {
      await page.getByRole('button', { name: /Start Sorting/i }).click();
      // Wait long enough for the first waste item to spawn and start
      // falling so the inline status pill is rendered.
      await page.waitForTimeout(3000);
    },
  },
  {
    name: '09-eco-memory-solo',
    path: '/games/eco-memory',
    steps: async (page) => {
      await page.getByRole('button', { name: /^Solo:/i }).click();
      await page.waitForTimeout(800);
    },
  },
  {
    name: '10-climate-2048-tech',
    path: '/games/climate-2048',
    steps: async (page) => {
      const card = page.getByRole('button', { name: /^Solo:/i });
      await card.click();
      await page.waitForTimeout(400);
      try {
        await page.getByRole('button', { name: /Choose/i }).first().click({ timeout: 1500 });
      } catch { /* maybe direct */ }
      await page.waitForTimeout(800);
    },
  },
  {
    name: '10b-climate-2048-play',
    path: '/games/climate-2048',
    steps: async (page) => {
      await page.getByRole('button', { name: /^Solo:/i }).click();
      await page.waitForTimeout(400);
      try {
        await page.getByRole('button', { name: /Choose/i }).first().click({ timeout: 1500 });
      } catch { /* skip */ }
      await page.waitForTimeout(400);
      // Click into Solar Power tile
      try {
        await page.locator('text=Solar Power').first().click({ timeout: 1500 });
      } catch { /* skip */ }
      await page.waitForTimeout(800);
    },
  },
  {
    name: '11-carbon-crush-play',
    path: '/games/carbon-crush',
    steps: async (page) => {
      await page.getByRole('button', { name: /Start Playing/i }).click();
      await page.waitForTimeout(800);
    },
  },
  {
    name: '12-green-defence-play',
    path: '/games/green-defence',
    steps: async (page) => {
      await page.getByRole('button', { name: /Deploy Defences/i }).click();
      await page.waitForTimeout(800);
    },
  },
  {
    name: '13-climate-ninja-start',
    path: '/games/climate-ninja',
    steps: async (page) => {
      await page.getByRole('button', { name: /Start Mission/i }).click();
      await page.waitForTimeout(800);
    },
  },
];

for (const f of flows) {
  const page = await context.newPage();
  try {
    await page.goto(BASE + f.path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    await f.steps(page);
    const file = `${OUT_DIR}/${f.name}.png`;
    await page.screenshot({ path: file, fullPage: false });
    console.log('captured', file);
  } catch (e) {
    console.log('FAILED', f.name, e.message);
  }
  await page.close();
}

await browser.close();
console.log('done');
