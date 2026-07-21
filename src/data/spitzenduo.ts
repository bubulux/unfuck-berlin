import { SPITZENDUO_CMS } from './spitzenduo.generated'

export interface SpitzenPerson {
  vorname: string
  nachname: string
  /** Kleine Unterzeile unter dem Namen, z. B. "Volt Spitzenkandidatin". */
  role: string
  image: string
  alt: string
  /** Link zur Detailseite der Person (Kandidierenden-Pool). */
  to: string
}

/**
 * Notnagel, falls der Sanity-Abruf beim Build fehlschlaegt. Im Normalfall
 * gewinnen die aus dem spitzenduo-CMS geholten Personen (Foto/Name), verlinkt
 * auf die jeweilige Detailseite im Kandidierenden-Pool.
 */
const FALLBACK: SpitzenPerson[] = [
  {
    vorname: 'Anna',
    nachname: 'Auerbach',
    role: 'Volt Spitzenkandidatin',
    image: '/pics/spitzen/annaMain.png',
    alt: 'Anna Auerbach',
    to: '/kandidierende/anna-auerbach',
  },
  {
    vorname: 'Paul',
    nachname: 'Löper',
    role: 'Volt Spitzenkandidat',
    image: '/pics/spitzen/paulMain.png',
    alt: 'Paul Löper',
    to: '/kandidierende/paul-loeper',
  },
]

const CMS = SPITZENDUO_CMS as SpitzenPerson[]

export const SPITZENDUO: SpitzenPerson[] = CMS.length ? CMS : FALLBACK
