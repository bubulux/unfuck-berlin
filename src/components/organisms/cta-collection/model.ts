export interface CtaItem {
  key: string
  label: string
  href: string
}

/** Welche Sorte Liste: viele Sprachfassungen oder wenige Dokumente. */
export type CtaCollectionKind = 'sprachen' | 'dokumente'

/** Die drei Entwuerfe, zwischen denen der Umschalter wechselt. */
export type CtaVariant = 1 | 2 | 3

export const CTA_VARIANT_LABELS: Record<CtaVariant, string> = {
  1: 'Karten',
  2: 'Liste',
  3: 'Sticker',
}

/** Flaggen sind Paare aus Regional-Indicator-Symbolen. */
export const FLAG_PATTERN = /[\u{1F1E6}-\u{1F1FF}]{2}/u

/**
 * Sprachfassungen erkennt man an der Flagge im Label oder am Manifesto-Link.
 * Alles andere behandeln wir als Dokument.
 */
export function classifyCtaItems(items: CtaItem[]): CtaCollectionKind {
  const languageish = items.filter(
    (item) => FLAG_PATTERN.test(item.label) || /manifesto/i.test(item.href),
  ).length
  return languageish >= items.length / 2 ? 'sprachen' : 'dokumente'
}

export function parseLanguage(item: CtaItem) {
  const flag = item.label.match(FLAG_PATTERN)?.[0] ?? ''
  const name = item.label.replace(FLAG_PATTERN, '').trim()
  // Ohne Flagge (z. B. Arabisch) springt das Sprachkuerzel aus dem Link ein.
  const code = (item.href.split('-').pop() ?? '').toUpperCase()
  return { flag, name, code }
}

export function parseDocument(item: CtaItem) {
  const colon = item.label.indexOf(':')
  if (colon === -1) return { eyebrow: '', topic: item.label.trim() }
  return {
    eyebrow: item.label.slice(0, colon).trim(),
    topic: item.label.slice(colon + 1).trim(),
  }
}
