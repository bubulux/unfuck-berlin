import type { ColorToken } from '../components/atoms/text'
import type { ProgramPillarItem } from '../components/organisms/program-section'
import { WAHLPROGRAMM_CMS } from './wahlprogramm.generated'

/** Ein Text-/CTA-Block (Intro bzw. Europa) der Wahlprogramm-Seite. */
export interface WahlprogrammBlock {
  /** Ueberschrift, eine Zeile pro Highlight-Box. */
  heading: string[]
  /** Roher Sanity-Farbwert (headline_theme), via mapHeadlineTheme gemappt. */
  theme: string
  /** Fliesstext (Absaetze durch Leerzeile getrennt, inline <strong> erlaubt). */
  body: string
  ctaLabel: string
  ctaHref: string
}

export interface WahlprogrammContent {
  intro: WahlprogrammBlock
  pillars: ProgramPillarItem[]
  europa: WahlprogrammBlock
}

/**
 * Sanity headline_theme -> unser ColorToken.
 * Achtung Namenskollision: Sanitys "yellow" wurde als Lime dargestellt (= unser
 * neon), Sanitys "orange" entspricht unserem gelb-orange (--color-yellow).
 */
const THEME_TO_COLOR: Record<string, ColorToken> = {
  white: 'white',
  green: 'green',
  blue: 'blue',
  orange: 'yellow',
  yellow: 'neon',
}

export function mapHeadlineTheme(
  theme: string | undefined,
  fallback: ColorToken = 'neon',
): ColorToken {
  return (theme && THEME_TO_COLOR[theme]) || fallback
}

// Fallback, falls die generierte Datei (noch) leer ist. Der Regelfall sind die
// aus Sanity generierten Inhalte (via `npm run content` / prebuild); bei
// erreichbarem Sanity gewinnt immer der CMS-Inhalt.
const FALLBACK: WahlprogrammContent = {
  intro: {
    heading: [],
    theme: 'green',
    body: '',
    ctaLabel: '',
    ctaHref: '',
  },
  pillars: [],
  europa: {
    heading: [],
    theme: 'orange',
    body: '',
    ctaLabel: '',
    ctaHref: '',
  },
}

const CMS: WahlprogrammContent = WAHLPROGRAMM_CMS

export const WAHLPROGRAMM: WahlprogrammContent = CMS.pillars.length ? CMS : FALLBACK

export const PROGRAM_PILLARS: ProgramPillarItem[] = WAHLPROGRAMM.pillars
