// Capture portrait-mobile screenshots of each route at iPhone 12 dimensions
// (390x844). Outputs PNGs to scripts/portrait-shots/.
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const BASE = 'http://localhost:5173';
const OUT_DIR = 'scripts/portrait-shots';

const routes = [
  { name: '01-landing',           path: '/' },
  { name: '02-climate-ninja',     path: '/games/climate-ninja' },
  { name: '03-carbon-crush',      path: '/games/carbon-crush' },
  { name: '04-recycle-rush',      path: '/games/recycle-rush' },
  { name: '05-eco-memory',        path: '/games/eco-memory' },
  { name: '06-green-defence',     path: '/games/green-defence' },
  { name: '07-climate-2048',      path: '/games/climate-2048' },
];

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await context.newPage();

for (const r of routes) {
  await page.goto(BASE + r.path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const file = `${OUT_DIR}/${r.name}.png`;
  await page.screenshot({ path: file, fullPage: false });
  console.log('captured', file);
}

await browser.close();
console.log('done');
