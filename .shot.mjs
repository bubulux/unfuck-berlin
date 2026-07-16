import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 430, height: 1600 } });
await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await p.screenshot({ path: '/tmp/claude-1000/-home-s-berenzon-private-unfuck-berlin/f5aa3fb1-9e6e-4e69-a1b8-107d600d5aa8/scratchpad/home.png', fullPage: true });
await b.close();
console.log('shot ok');
