import { KANDIDATEN_CMS } from './kandidaten.generated'

export interface Kandidat {
  name: string
  /** Slug from the source href (/kandidierende/<slug>). */
  slug: string
  listenplatz: number
  bezirk: string
  /** Portrait image (Sanity CDN URL, oder lokaler Fallback /public/pics/kandis). */
  image: string
  /** Detail-/Bio-Felder aus dem CMS (nur bei CMS-Quelle vorhanden). */
  alter?: number | null
  wahlkreis?: string
  /** Groesserer Portrait-Crop fuer die Bio-Seite. */
  imageDetail?: string
  foto_originalFilename?: string
  imageDetail_2?: string
  foto_originalFilename_2?: string
  herzensthema?: string
  ueberMich?: string
  socials?: { ctaLabel: string, ctaHref: string }[]
}

/**
 * Fallback-Liste (Landesliste Volt Berlin, AGH-Wahl 2026) mit lokalen Portraits.
 * Der Regelfall sind die aus Sanity generierten Kandidierenden in
 * kandidaten.generated.ts (via `npm run content` / prebuild); bei erreichbarem
 * Sanity gewinnt immer der CMS-Inhalt.
 */
const FALLBACK_KANDIDATEN: Kandidat[] = []

const CMS: Kandidat[] = KANDIDATEN_CMS

export const KANDIDATEN: Kandidat[] = CMS.length ? CMS : FALLBACK_KANDIDATEN
