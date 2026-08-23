import { defineConfig, devices } from '@playwright/test'

/**
 * Visuelle Regression-Suite: Full-Page-Screenshots aller Seiten/Unterseiten.
 *
 * Laeuft ausschliesslich gegen den lokalen Vite-Dev-Server (baseURL unten) –
 * niemals gegen Produktion. `webServer` startet ihn bei Bedarf selbst und
 * verwendet einen bereits laufenden weiter (reuseExistingServer).
 *
 * Ausgefuehrt wird die Suite im offiziellen Playwright-Docker-Image, damit die
 * Screenshots unabhaengig vom Host-Betriebssystem (Fonts, Antialiasing) stabil
 * bleiben. Siehe scripts/snapshots.sh bzw. `npm run test:visual`.
 * Fonts sind selbst gehostet (public/fonts) – kein externer Netzzugriff noetig.
 */
const PORT = 5173
const BASE_URL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: './tests/visual',
  // Baselines liegen neben den Specs in *-snapshots/ und gehoeren ins Git.
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],

  expect: {
    toHaveScreenshot: {
      // Animationen einfrieren, sonst flackern Screenshots.
      animations: 'disabled',
      // Kleine Toleranz gegen Sub-Pixel-Rauschen; echte Aenderungen bleiben sichtbar.
      maxDiffPixelRatio: 0.01,
    },
  },

  use: {
    baseURL: BASE_URL,
    // Feste Breite = stabiles Layout. Full-Page erfasst die gesamte Scrollhoehe.
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    trace: 'off',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
  ],

  // Startet den lokalen Vite-Server im Container; nutzt einen laufenden weiter.
  webServer: {
    command: 'npm run dev',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
})
