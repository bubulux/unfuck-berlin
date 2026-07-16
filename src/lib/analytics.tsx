import { useEffect } from 'react'
import { useLocation } from 'react-router'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Routes whose page views are handled elsewhere and must NOT be double-counted
 * here: they embed the ported static HTML (public/sticker/*.html) in an iframe,
 * and that HTML fires its own gtag config on load.
 */
const SELF_TRACKED_PATHS = new Set(['/sticker', '/confirm', '/confirm.html'])

/**
 * Sends a GA4 page_view on every client-side route change. The base gtag config
 * in index.html runs with send_page_view:false, so this is the single source of
 * page views for the SPA routes.
 */
export function AnalyticsTracker() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    if (SELF_TRACKED_PATHS.has(pathname)) return
    window.gtag?.('event', 'page_view', {
      page_path: pathname + search,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname, search])
  return null
}

export default AnalyticsTracker
