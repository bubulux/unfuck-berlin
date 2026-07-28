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
    heading: ['Wahlprogramm'],
    theme: 'green',
    body: '<strong>Berlin ist pulsierend, aber sein Herzschlag erreicht die Politik nicht.</strong>\n\nDie Folgen spüren Berliner*innen täglich: Wohnungen, die unbezahlbar sind. Schulen, die marode sind. Eine Verwaltung, die auf einfache Anliegen monatelang nicht reagiert. Dazu kommt das Gefühl, dass es nicht besser wird, sondern schlechter.\n\nMit unserem Wahlprogramm legen wir einen echten, konkreten Plan vor, wie diese Stadt wieder funktioniert: <strong>pragmatisch, evidenzbasiert und europäisch.</strong>\n\nIn diesen Kapiteln zeigen wir, wie Berlin seine größten Probleme löst, von der Verwaltung über bezahlbares Wohnen bis zur Bildung. <strong>Denn Berlin braucht Politik, die Zukunft gestaltet.</strong>',
    ctaLabel: 'Wahlprogramm kurz',
    ctaHref:
      'https://voltdeutschland.org/storage/assets-berlin/pdf/policy-wahlprogramm-2026/kurzwahlprogramm-2026-final.pdf',
  },
  pillars: [
    {
      title: 'Berlin funktioniert',
      tags: ['Verwaltung', 'Digitalisierung', 'Beteiligung'],
      body: '…ist die Grundlage von allem: eine digitale Verwaltung, die an Ergebnissen gemessen wird. Mit dem Once-Only-Prinzip geben Berliner:innen ihre Daten nur einmal an, mit der Genehmigungsfiktion gelten vollständige Anträge nach Fristablauf automatisch als genehmigt.',
    },
    {
      title: 'Berlin lebt',
      tags: ['Wohnen', 'Mobilität', 'lebenswerte Kieze'],
      body: '…heißt bezahlbares Wohnen: Flächen für 300.000 neue Wohnungen, schnellere Genehmigungen und Housing First als wirksames Mittel gegen Obdachlosigkeit. Dazu ein verlässlicher ÖPNV bis in die Außenbezirke, sichere Rad- und Gehwege und saubere Kieze.',
    },
    {
      title: 'Berlin lernt',
      tags: ['Kita', 'Schule', 'Beruf'],
      body: '… setzt früh an: mit einer verbindlichen Vorschulphase ab fünf Jahren, Sprachtests mit vier, dem neuen Pflichtfach Lebenskompetenz und einer Ausbildungsplatzgarantie, damit die Herkunft nicht über Chancen entscheidet.',
    },
    {
      title: 'Berlin schafft',
      tags: ['Innovation', 'Wirtschaftskraft', 'Arbeitsplätze'],
      body: '…macht die Stadt zur Innovationshauptstadt: mit mehr Ausgründungen aus den Hochschulen, Berlin als Erstkundin für neue Technologien, schneller Fachkräfteeinwanderung und einer gemeinsamen Wirtschaftsregion mit Brandenburg.',
    },
  ],
  europa: {
    heading: ['Europäisch denken,', 'lokal liefern'],
    theme: 'orange',
    body: 'Volt ist die erste echte europäische Partei: in ganz Europa aktiv, mit einem gemeinsamen politischen Fundament. Genau das nutzen wir für Berlin. Wir experimentieren nicht auf Kosten der Berliner:innen, sondern holen Lösungen in die Stadt, die sich in Europa bereits bewährt haben. 98 Best-Practice-Beispiele aus Städten wie Helsinki, Wien, Amsterdam und Kopenhagen belegen, dass unsere Vorschläge keine Utopien sind, sondern erprobte Realität. Dabei gilt: Evidenz entscheidet, nicht Ideologie. Wir messen die Wirkung unserer Maßnahmen und passen an, was nicht die gewünschten Ergebnisse bringt.',
    ctaLabel: 'Gesamtes Wahlprogramm zur AGH-Wahl 2026',
    ctaHref:
      'https://voltdeutschland.org/storage/assets-berlin/pdf/policy-wahlprogramm-2026/wahlprogramm-edited-20-7.pdf',
  },
}

const CMS: WahlprogrammContent = WAHLPROGRAMM_CMS

export const WAHLPROGRAMM: WahlprogrammContent = CMS.pillars.length ? CMS : FALLBACK

export const PROGRAM_PILLARS: ProgramPillarItem[] = WAHLPROGRAMM.pillars
