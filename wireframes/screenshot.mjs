import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(here, 'wireframes.html');

const games = [
  { id: 'g-ninja',   file: 'climate-ninja.png' },
  { id: 'g-crush',   file: 'carbon-crush.png' },
  { id: 'g-recycle', file: 'recycle-rush.png' },
  { id: 'g-memory',  file: 'eco-memory.png' },
  { id: 'g-defence', file: 'green-defence.png' },
  { id: 'g-2048',    file: 'climate-2048.png' },
];

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
});
const context = await browser.newContext({
  viewport: { width: 1320, height: 1200 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();
await page.goto('file://' + htmlPath, { waitUntil: 'networkidle' });

for (const g of games) {
  const el = await page.locator('#' + g.id);
  await el.scrollIntoViewIfNeeded();
  await el.screenshot({ path: resolve(here, g.file) });
  console.log('wrote', g.file);
}

await browser.close();
