import { test, expect } from '@playwright/test'

/**
 * Starter-/Smoke-Test: prueft, dass die Docker+Vite-Pipeline laeuft und ein
 * Full-Page-Screenshot der Startseite erzeugt wird.
 *
 * Die vollstaendige Routen-Matrix (alle Seiten/Unterseiten, inkl. dynamischer
 * Kandidierenden-Detailseiten) bauen wir im naechsten Schritt hier aus.
 */
test('home – full page', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  // Selbst gehostete Fonts abwarten, sonst FOUT-Flackern im Screenshot.
  await page.evaluate(() => document.fonts.ready)
  await expect(page).toHaveScreenshot('home.png', { fullPage: true })
})
