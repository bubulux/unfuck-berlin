import { useRef, type KeyboardEvent } from 'react'
import { useSearchParams } from 'react-router'
import { Text } from '../../atoms/text'
import { HighlightText } from '../../atoms/highlight-text'
import { ResultsDataTables, ThanksBlock } from './parts'
import { VariantChart } from './variant-chart'
import { VariantCards } from './variant-cards'
import { VariantMap } from './variant-map'
import './styles.css'

// TEMPORAER (Issue #78): drei Entwuerfe zur Abstimmung. Die Auswahl steht in
// `?ergebnis=v2`, damit sich eine Variante direkt verlinken laesst. Sobald
// entschieden ist, Umschalter und die nicht gewaehlten Varianten entfernen.
const VARIANTS = [
  { id: 'v1', label: 'V1 · Diagramm', Component: VariantChart },
  { id: 'v2', label: 'V2 · Bezirkskarten', Component: VariantCards },
  { id: 'v3', label: 'V3 · Karte', Component: VariantMap },
] as const

const PARAM = 'ergebnis'

function VariantTabs({
  current,
  onSelect,
}: {
  current: string
  onSelect: (id: string) => void
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  // Pfeiltasten wechseln zwischen den Tabs (WAI-ARIA Tabs-Pattern).
  function onKeyDown(event: KeyboardEvent, index: number) {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    event.preventDefault()
    const next = (index + step + VARIANTS.length) % VARIANTS.length
    onSelect(VARIANTS[next].id)
    refs.current[next]?.focus()
  }

  return (
    <div className="election-tabs">
      <span className="election-tabs__hint">Vorschau-Varianten</span>
      <div role="tablist" aria-label="Design-Variante der Wahlergebnisse" className="election-tabs__list">
        {VARIANTS.map((v, i) => {
          const selected = v.id === current
          return (
            <button
              key={v.id}
              ref={(el) => {
                refs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`election-tab-${v.id}`}
              aria-selected={selected}
              aria-controls="election-panel"
              tabIndex={selected ? 0 : -1}
              className="election-tabs__tab"
              onClick={() => onSelect(v.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {v.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function ElectionResultsSection() {
  const [params, setParams] = useSearchParams()
  const requested = params.get(PARAM)
  const variant = VARIANTS.find((v) => v.id === requested) ?? VARIANTS[0]
  const { Component } = variant

  function select(id: string) {
    const next = new URLSearchParams(params)
    next.set(PARAM, id)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  return (
    <section className="election" aria-labelledby="election-heading">
      <div className="election__inner">
        <VariantTabs current={variant.id} onSelect={select} />

        <div
          role="tabpanel"
          id="election-panel"
          aria-labelledby={`election-tab-${variant.id}`}
          className="election__panel"
        >
          <header className="election__header">
            <HighlightText
              as="h2"
              id="election-heading"
              lines={['Wahlergebnis', '2026']}
              variant="titel"
              color="white"
              textColor="purple"
              uppercase
            />
            <Text as="p" variant="body" color="white" className="election__lead">
              Volt zieht erstmals in vier Berliner Bezirksverordnetenversammlungen
              ein – mit sechs Sitzen. Bei der Wahl zum Abgeordnetenhaus haben wir
              2,1 % der Zweitstimmen erreicht.
            </Text>
          </header>

          <ResultsDataTables />
          <Component />
          <ThanksBlock />
        </div>
      </div>
    </section>
  )
}

export default ElectionResultsSection
