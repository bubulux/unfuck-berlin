import type { ColorToken } from '../../components/atoms/highlight-text'
import type { CtaItem } from '../../components/organisms/cta-collection/model'

export type PageEntry<M> =
  | { kind: 'module'; module: M; index: number }
  | {
      kind: 'cta-group'
      key: string
      headlineZeilen: string[]
      headlineTheme: ColorToken
      items: CtaItem[]
    }

/** Ab so vielen aufeinanderfolgenden CTAs lohnt sich eine gestaltete Sammlung. */
const MIN_RUN = 2

/**
 * Fasst eine Ueberschrift und die unmittelbar darauf folgenden CTA-Buttons zu
 * einer Gruppe zusammen. Genau dieses Muster steht auf /wahlprogramm zweimal
 * hintereinander: "Kurzwahlprogramme" mit den Sprachfassungen und
 * "Positionspapiere" mit den einzelnen Papieren. Einzelne CTAs zwischen
 * Textbloecken bleiben unangetastet Buttons.
 */
export function groupCtaRuns<M extends { _type: string }>(
  modules: M[],
): PageEntry<M>[] {
  const entries: PageEntry<M>[] = []
  let i = 0

  while (i < modules.length) {
    const current = modules[i]

    if (current._type === 'headline') {
      const items: CtaItem[] = []
      let j = i + 1

      while (j < modules.length && modules[j]._type === 'one_cta') {
        const cta = modules[j] as M & {
          _key?: string
          ctaLabel?: string
          ctaHref?: string
        }
        items.push({
          key: cta._key || `cta-${j}`,
          label: cta.ctaLabel || '',
          href: cta.ctaHref || '',
        })
        j++
      }

      if (items.length >= MIN_RUN) {
        const headline = current as M & {
          _key?: string
          headlineZeilen?: string[]
          headline_theme?: ColorToken
        }
        entries.push({
          kind: 'cta-group',
          key: headline._key || `group-${i}`,
          headlineZeilen: headline.headlineZeilen || [],
          headlineTheme: (headline.headline_theme || 'neon') as ColorToken,
          items,
        })
        i = j
        continue
      }
    }

    entries.push({ kind: 'module', module: current, index: i })
    i++
  }

  return entries
}
