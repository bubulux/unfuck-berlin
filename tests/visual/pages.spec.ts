import { test, expect } from '@playwright/test'
import { KANDIDATEN_CMS } from '../../src/data/kandidaten.generated'
import { NEWS_CMS } from '../../src/data/news.generated'
import { REGIONS_CMS } from '../../src/data/regions.generated'
import { PAGES_CMS } from '../../src/data/pages.generated'

/**
 * Full-Page-Snapshot-Suite ueber alle Seiten/Unterseiten.
 *
 * Die dynamischen Routen (Kandidierende, News, Bezirke, CMS-Seiten) werden aus
 * den generierten Sanity-Daten abgeleitet – die Suite bleibt damit automatisch
 * in sync, wenn Inhalte dazukommen oder wegfallen. Jede Route wird in Desktop-
 * und Mobil-Breite aufgenommen (siehe Projekte in playwright.config.ts).
 *
 * Routen-Uebersicht siehe src/main.tsx.
 */
type Route = { name: string; path: string }

// Statische Seiten mit eigener Route.
const staticRoutes: Route[] = [
  { name: 'home', path: '/' },
  { name: 'kandidierende', path: '/kandidierende' },
  { name: 'news', path: '/news' },
  { name: 'bezirke', path: '/bezirke' },
  { name: 'sticker', path: '/sticker' },
  { name: 'confirm', path: '/confirm' },
]

// Dynamische Seiten aus den generierten CMS-Daten.
const dynamicRoutes: Route[] = [
  ...KANDIDATEN_CMS.map((k) => ({ name: `kandidierende-${k.slug}`, path: `/kandidierende/${k.slug}` })),
  ...NEWS_CMS.map((a) => ({ name: `news-${a.slug}`, path: `/news/${a.slug}` })),
  ...REGIONS_CMS.map((r) => ({ name: `bezirke-${r.slug}`, path: `/bezirke/${r.slug}` })),
  // Die "home"-Seite doppelt die Startseite (/) – daher raus.
  ...PAGES_CMS.filter((p) => p.slug && p.slug !== 'home').map((p) => ({
    name: `page-${p.slug}`,
    path: `/${p.slug}`,
  })),
]

const routes: Route[] = [...staticRoutes, ...dynamicRoutes]

// Vor jedem Seitenaufruf injizieren: Uhr einfrieren und Video-Wiedergabe
// neutralisieren. Sonst tickt der Countdown bzw. laufen Autoplay-Videos und die
// Screenshots stabilisieren sich nie (Timeout beim Vergleich).
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    // Feste "Jetzt"-Zeit -> Countdown ist konstant und reproduzierbar.
    const OriginalDate = Date
    const FIXED = new OriginalDate('2026-08-23T10:00:00Z').getTime()
    class FrozenDate extends OriginalDate {
      constructor(...args: unknown[]) {
        if (args.length === 0) super(FIXED)
        // @ts-expect-error Durchreichen aller anderen Date-Signaturen.
        else super(...args)
      }
      static now() {
        return FIXED
      }
    }
    window.Date = FrozenDate as unknown as DateConstructor
    // Videos spielen nie ab -> deterministisches Poster/erstes Frame.
    window.HTMLMediaElement.prototype.play = function () {
      return Promise.resolve()
    }
  })
})

for (const route of routes) {
  test(`${route.name} (${route.path})`, async ({ page }) => {
    await page.goto(route.path, { waitUntil: 'load' })
    // Selbst gehostete Fonts abwarten, sonst FOUT-Flackern im Screenshot.
    await page.evaluate(() => document.fonts.ready)
    // Netzwerk zur Ruhe kommen lassen, aber nicht daran haengen bleiben.
    // Kurz gedeckelt: Video-Seiten erreichen nie echte Netz-Ruhe (Buffering).
    await page.waitForLoadState('networkidle', { timeout: 3_000 }).catch(() => {})
    // Lazy-Loading aufloesen: einmal komplett durchscrollen, damit alle Bilder
    // (auch unterhalb des Folds) angefragt werden, dann zurueck nach oben.
    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let y = 0
        const step = () => {
          window.scrollTo(0, y)
          y += window.innerHeight
          if (y < document.body.scrollHeight) requestAnimationFrame(step)
          else {
            window.scrollTo(0, 0)
            resolve()
          }
        }
        step()
      })
    })
    // Kurz gedeckelt: Video-Seiten erreichen nie echte Netz-Ruhe (Buffering).
    await page.waitForLoadState('networkidle', { timeout: 3_000 }).catch(() => {})
    // Videos hart anhalten und warten, bis alle Bilder wirklich dekodiert sind.
    await page.evaluate(async () => {
      for (const v of Array.from(document.querySelectorAll('video'))) {
        try {
          v.pause()
          v.currentTime = 0
        } catch {
          /* ignore */
        }
      }
      await Promise.all(
        Array.from(document.images).map((img) =>
          img.complete ? Promise.resolve() : img.decode().catch(() => {}),
        ),
      )
    })
    await expect(page).toHaveScreenshot(`${route.name}.png`, { fullPage: true, timeout: 20_000 })
  })
}
