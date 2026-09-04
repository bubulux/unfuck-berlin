import { useMemo, useState } from 'react'
import type { HTMLAttributes } from 'react'
import { Text } from '../../atoms/text'
import { Button } from '../../atoms/button'
import { HighlightText } from '../../atoms/highlight-text'
import { EventCard } from '../../molecules/event-card'
import { MultiSelect } from '../../molecules/multi-select'
import { BERLIN_DISTRICT_NAMES, districtsInText } from '../../../lib/berlin-districts'
import type { CalendarEventItem } from '../calendar-section'
import './styles.css'

/** Month abbreviation (as produced by the calendar lib) → full German name. */
const MONTH_NAMES: Record<string, string> = {
  JAN: 'Januar',
  FEB: 'Februar',
  MÄR: 'März',
  APR: 'April',
  MAI: 'Mai',
  JUN: 'Juni',
  JUL: 'Juli',
  AUG: 'August',
  SEP: 'September',
  OKT: 'Oktober',
  NOV: 'November',
  DEZ: 'Dezember',
}

/** Preferred order for the category badges we know about. */
const CATEGORY_ORDER = ['Bezirkstreffen', 'Veranstaltung', 'Highlight']

/** Group already-sorted events into consecutive runs of the same month. */
function groupByMonth(events: CalendarEventItem[]) {
  const groups: { month: string; events: CalendarEventItem[] }[] = []
  for (const event of events) {
    const last = groups[groups.length - 1]
    if (last && last.month === event.month) last.events.push(event)
    else groups.push({ month: event.month, events: [event] })
  }
  return groups
}

export interface EventsSectionProps extends HTMLAttributes<HTMLElement> {
  events: CalendarEventItem[]
  /** Loading state of the (async) calendar data. Defaults to `ready`. */
  status?: 'loading' | 'ready' | 'error'
  /** Show the filter bar above the list. */
  filterable?: boolean
  emptyLabel?: string
  loadingLabel?: string
  errorLabel?: string
}

export function EventsSection({
  events,
  status = 'ready',
  filterable = true,
  emptyLabel = 'Aktuell keine anstehenden Termine.',
  loadingLabel = 'Termine werden geladen…',
  errorLabel = 'Termine konnten gerade nicht geladen werden. Bitte versuch es später erneut.',
  className,
  ...rest
}: EventsSectionProps) {
  const classes = ['events', className].filter(Boolean).join(' ')

  const [categories, setCategories] = useState<string[]>([])
  const [districts, setDistricts] = useState<string[]>([])
  const [query, setQuery] = useState('')

  // Category options are derived from the badges actually present, kept in a
  // stable, human-sensible order.
  const categoryOptions = useMemo(() => {
    const present = new Set(events.map((e) => e.badge?.label).filter(Boolean) as string[])
    const known = CATEGORY_ORDER.filter((c) => present.has(c))
    const extra = [...present].filter((c) => !CATEGORY_ORDER.includes(c)).sort()
    return [...known, ...extra]
  }, [events])

  // AND across the four filter groups; OR within the multi-selects.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return events.filter((ev) => {
      if (categories.length && !(ev.badge && categories.includes(ev.badge.label))) return false
      if (districts.length) {
        const evDistricts = districtsInText(ev.title)
        if (!evDistricts.some((d) => districts.includes(d))) return false
      }
      if (q && !ev.title.toLowerCase().includes(q)) return false
      return true
    })
  }, [events, categories, districts, query])

  const groups = groupByMonth(filtered)

  const hasActiveFilters =
    categories.length > 0 || districts.length > 0 || query.trim().length > 0
  const clearFilters = () => {
    setCategories([])
    setDistricts([])
    setQuery('')
  }

  return (
    <section className={classes} {...rest}>
      <div className="events__inner">
        {status === 'loading' ? (
          <Text as="p" variant="body" color="white">
            {loadingLabel}
          </Text>
        ) : status === 'error' ? (
          <Text as="p" variant="body" color="white">
            {errorLabel}
          </Text>
        ) : (
          <>
            {filterable && events.length > 0 ? (
              <div className="events__filters" role="search">
                <MultiSelect
                  label="Kategorie"
                  className="events__filter"
                  options={categoryOptions}
                  selected={categories}
                  onChange={setCategories}
                />
                <MultiSelect
                  label="Bezirk"
                  className="events__filter"
                  options={BERLIN_DISTRICT_NAMES}
                  selected={districts}
                  onChange={setDistricts}
                />
                <label className="events__filter events__filter--search">
                  <span className="events__filter-caption">Suche</span>
                  <input
                    type="search"
                    className="events__search-input"
                    placeholder="Termin suchen…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
              </div>
            ) : null}

            {filtered.length > 0 ? (
              <div className="events__groups">
                {groups.map((group) => (
                  <div className="events__group" key={group.month}>
                    <div className="events__month">
                      <HighlightText
                        as="h2"
                        lines={[MONTH_NAMES[group.month] ?? group.month]}
                        variant="subtitel"
                        color="neon"
                        textColor="purple"
                        uppercase
                      />
                      <span className="events__month-rule" aria-hidden="true" />
                    </div>
                    <div className="events__list">
                      {group.events.map((event) => (
                        <EventCard
                          event_id={event.id}
                          key={event.id}
                          day={event.day}
                          month={event.month}
                          title={event.title}
                          time={event.time}
                          location={event.location}
                          badge={event.badge}
                          highlight={query}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="events__empty">
                <Text as="p" variant="body" color="white">
                  {events.length > 0 ? 'Leider keine Ergebnisse…' : emptyLabel}
                </Text>
                {hasActiveFilters ? (
                  <Button color="neon" variant="solid" onClick={clearFilters}>
                    Alle Filter entfernen
                  </Button>
                ) : null}
              </div>
            )}
          </>
        )}

        <div className="events__note">
          <Text as="p" variant="body" color="white">
            Du vermisst hier ein Event, oder würdest uns gerne auf
            einem Panel begrüßen? <strong>Dann lad' uns ein!</strong><br />
            Schreib dazu eine Mail an <a href="mailto:presse@voltberlin.org">presse@voltberlin.org</a>.
          </Text>
        </div>
      </div>
    </section>
  )
}

export default EventsSection
