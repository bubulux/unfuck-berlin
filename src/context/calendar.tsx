import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { fetchCalendar, toDisplayItem } from '../lib/calendar'
import { CalendarContext, type CalendarState } from './calendar-context'

/**
 * Fetches the public Volt Berlin calendar once, on mount, and shares it with
 * the whole app. Because the provider sits above the router, navigating between
 * pages reuses the already-loaded data instead of refetching.
 */
export function CalendarProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CalendarState>({
    status: 'loading',
    items: [],
    raw: [],
  })

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    fetchCalendar(controller.signal)
      .then((raw) => {
        if (!active) return
        setState({ status: 'ready', raw, items: raw.map(toDisplayItem) })
      })
      .catch((err: unknown) => {
        if (!active || (err instanceof DOMException && err.name === 'AbortError')) {
          return
        }
        setState({ status: 'error', items: [], raw: [] })
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [])

  return (
    <CalendarContext.Provider value={state}>{children}</CalendarContext.Provider>
  )
}
