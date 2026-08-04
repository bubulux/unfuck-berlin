import { MEETS_CMS } from './meets.generated'

export interface MeetImage {
  src: string
  alt: string
}

/**
 * Lokale Kopien in public/pics/meets als Notnagel, falls der Sanity-Abruf beim
 * Build fehlschlaegt. Im Normalfall gewinnt das CMS-Karussell
 * (seiteMitmachen.carouselBilder).
 */
const FALLBACK: MeetImage[] = []

const CMS = MEETS_CMS as MeetImage[]

export const MEETS: MeetImage[] = CMS.length ? CMS : FALLBACK
