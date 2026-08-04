import { SPITZENDUO_CMS } from './spitzenduo.generated'

export interface SpitzenPerson {
  vorname: string
  nachname: string
  /** Kleine Unterzeile unter dem Namen, z. B. "Volt Spitzenkandidatin". */
  role: string
  image: string
  alt: string
  /** Kartenhintergrund/Verlaufsfarbe, passend zum Foto (vom Kunden gepickt). */
  bg: string
  /** Link zur Detailseite der Person (Kandidierenden-Pool). */
  to: string
}

/**
 * Notnagel, falls der Sanity-Abruf beim Build fehlschlaegt. Im Normalfall
 * gewinnen die aus dem spitzenduo-CMS geholten Personen (Foto/Name), verlinkt
 * auf die jeweilige Detailseite im Kandidierenden-Pool.
 */
const FALLBACK: SpitzenPerson[] = []

const CMS = SPITZENDUO_CMS as SpitzenPerson[]

export const SPITZENDUO: SpitzenPerson[] = CMS.length ? CMS : FALLBACK
