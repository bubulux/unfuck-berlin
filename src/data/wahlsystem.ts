import { WAHLSYSTEM_CMS } from './wahlsystem.generated'

export interface VotingBlock {
  title: string
  paragraphs: string[]
}

export interface WahlsystemContent {
  heading: string[]
  first: VotingBlock
  second: VotingBlock
  /** Beschriftung des (im Code hinterlegten) Spitzenduo-Bildes. */
  mediaCaption: string
  mit16: {
    heading: string
    lead: string
    paragraphs: string[]
    ctaLabel: string
  }
}

// Fallback mit dem bisherigen fest verdrahteten Inhalt. Der Regelfall sind die
// aus Sanity generierten Texte (via `npm run content` / prebuild); bei
// erreichbarem Sanity gewinnt immer der CMS-Inhalt. Das Bild bleibt im Code.
const FALLBACK: WahlsystemContent = {
  heading: [],
  first: {
    title: '',
    paragraphs: [],
  },
  second: {
    title: '',
    paragraphs: [],
  },
  mediaCaption: '',
  mit16: {
    heading: '',
    lead: '',
    paragraphs: [],
    ctaLabel: '',
  },
}

const CMS: WahlsystemContent = WAHLSYSTEM_CMS

export const WAHLSYSTEM: WahlsystemContent = CMS.heading.length ? CMS : FALLBACK
