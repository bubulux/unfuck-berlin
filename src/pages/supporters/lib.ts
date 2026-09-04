import { useState } from 'react'
import { SUPPORTERS_CMS } from '../../data/supporters.generated'

/**
 * Ein Eintrag der Wall of Support. Bewusst explizit statt von SUPPORTERS_CMS
 * abgeleitet: solange keine supporter-Dokumente veroeffentlicht sind, ist das
 * generierte Array leer und TypeScript wuerde die Elemente als `never` typen.
 */
export interface Supporter {
  name: string
  linkedin: string
  foto_originalFilename: string
  image: string
  imageDetail: string
  imageWall: string
}

export const PLAKAT_CTA_HREF = 'https://voltberlin.fun/#plakat'

/**
 * Fisher-Yates-Shuffle, einmal pro Seitenaufruf (Anforderung VOLT-159:
 * "Bei jedem Seitenaufruf zufällige Reihenfolge"). useState-Initializer,
 * damit die Reihenfolge waehrend der Session stabil bleibt.
 */
export function useShuffledSupporters(): Supporter[] {
  const [shuffled] = useState(() => {
    const arr: Supporter[] = [...SUPPORTERS_CMS]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  })
  return shuffled
}
