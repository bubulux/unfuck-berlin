import { useLocation } from 'react-router'
import { PageLayout } from '../../components/templates/page-layout'
import { HeroSection } from '../../components/organisms/hero-section'
import { CountdownSection } from '../../components/organisms/countdown-section'
import { CandidatesSection } from '../../components/organisms/candidates-section'
import { UnfuckSection } from '../../components/organisms/unfuck-section'
import { SpitzenduoComposite } from '../../components/organisms/spitzenduo-composite'
import { VIDEOS } from '../../data/videos'

/** Election date: 20 September 2026 (month is 0-indexed). */
const ELECTION_DATE = new Date(2026, 8, 20)

export function Home() {
  const { pathname } = useLocation()
  return (
    <PageLayout activePath={pathname}>
      <HeroSection
        videoSrc={VIDEOS.annaPaulIntro.src}
        videoPoster={VIDEOS.annaPaulIntro.poster}
        videoTitle="Anna und Paul"
        logoSrc="/logos/unfckBerlin.svg"
        logoAlt="unf*ck berlin"
        text={<>Berlin besser machen!<br /><br />Volt bringt nach Berlin, was woanders funktioniert. Egal, ob die Idee aus Berlin, Kopenhagen oder Warschau kommt. So einfach. So selten.</>}
        ctaLabel="Wahlprogramm"
        ctaTo="/wahlprogramm"
      />
      <CountdownSection target={ELECTION_DATE} ctaTo="/wahlsystem" />
      <CandidatesSection lead={<SpitzenduoComposite />} ctaTo="/kandidierende" />
      <UnfuckSection
        logoSrc="/logos/unfckBerlin.svg"
        logoAlt="unf*ck berlin"
        videoSrc={VIDEOS.reveal.src}
        videoPoster={VIDEOS.reveal.poster}
        videoTitle="15. Juli 2026"
        text=""
        ctaLabel="Worum geht es?"
        ctaTo="/unfuck-berlin"
      />
    </PageLayout>
  )
}

export default Home
