import { createContext, useContext } from 'react'
import type { CalendarItem } from '../lib/calendar'
import type { CalendarEventItem } from '../components/organisms/calendar-section'

export type CalendarStatus = 'loading' | 'ready' | 'error'

export interface CalendarState {
  status: CalendarStatus
  /** Future events (soonest first), ready for display. */
  items: CalendarEventItem[]
  /** Raw parsed items, in case a consumer needs the Date objects. */
  raw: CalendarItem[]
}

export const CalendarContext = createContext<CalendarState>({
  status: 'loading',
  items: [],
  raw: [],
})

export function useCalendar(): CalendarState {
  return useContext(CalendarContext)
}
