import type { ProgramPillarItem } from '../components/organisms/program-section'
import { PROGRAM_PILLARS as CMS_PILLARS } from './program.generated'

// Fallback, falls die generierte Datei (noch) leer ist. Der Regelfall sind die
// aus Sanity generierten Kapitel in program.generated.ts (via `npm run content`
// / prebuild). Bei erreichbarem Sanity gewinnt immer der CMS-Inhalt.
const FALLBACK_PILLARS: ProgramPillarItem[] = [
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
]

export const PROGRAM_PILLARS: ProgramPillarItem[] = CMS_PILLARS.length
  ? CMS_PILLARS
  : FALLBACK_PILLARS
