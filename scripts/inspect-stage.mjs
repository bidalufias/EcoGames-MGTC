import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});
const context = await browser.newContext({
  viewport: { width: 390, height: 680 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await context.newPage();

await page.goto('http://localhost:5173/games/recycle-rush', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
await page.getByRole('button', { name: /Start Sorting/i }).click();
await page.waitForTimeout(2000);

const info = await page.evaluate(() => {
  const stage = document.querySelector('.recycle-rush-stage');
  const natural = document.querySelector('.recycle-rush-natural');
  if (!stage || !natural) return { error: 'not found', stage: !!stage, natural: !!natural };
  const sr = stage.getBoundingClientRect();
  const nr = natural.getBoundingClientRect();
  const naturalCS = getComputedStyle(natural);
  const stageCS = getComputedStyle(stage);
  return {
    stage: { width: sr.width, height: sr.height, top: sr.top, computed_height: stageCS.height },
    natural: {
      visualWidth: nr.width,
      visualHeight: nr.height,
      top: nr.top,
      bottom: nr.bottom,
      cssWidth: naturalCS.width,
      cssHeight: naturalCS.height,
      transform: naturalCS.transform,
      offsetWidth: natural.offsetWidth,
      offsetHeight: natural.offsetHeight,
    },
    viewport: { width: window.innerWidth, height: window.innerHeight },
  };
});

console.log(JSON.stringify(info, null, 2));
await browser.close();
