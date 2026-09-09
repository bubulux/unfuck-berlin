import { useEffect } from 'react'
import { useLocation } from 'react-router'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Sends a GA4 page_view on every client-side route change. The base gtag config
 * in index.html runs with send_page_view:false, so this is the single source of
 * page views for the SPA routes.
 */
export function AnalyticsTracker() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    window.gtag?.('event', 'page_view', {
      page_path: pathname + search,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname, search])
  return null
}

export default AnalyticsTracker
