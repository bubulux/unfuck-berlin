import { useLocation } from 'react-router'
import { PageLayout } from '../../components/templates/page-layout'
import { HeroSection } from '../../components/organisms/hero-section'
import { CountdownSection } from '../../components/organisms/countdown-section'
import { CalendarSection } from '../../components/organisms/calendar-section'
import { CandidatesSection } from '../../components/organisms/candidates-section'
import { UnfuckSection } from '../../components/organisms/unfuck-section'
import { getUpcomingCalendarItems } from '../../data/events'

/** Election date: 20 September 2026 (month is 0-indexed). */
const ELECTION_DATE = new Date(2026, 8, 20)

export function Home() {
  const { pathname } = useLocation()
  return (
    <PageLayout activePath={pathname} hideCalendar>
      <HeroSection
        videoSrc="https://www.youtube-nocookie.com/embed/ub8UIZ0FvRs"
        videoTitle="Anna und Paul"
        text="Volt macht, was woanders funktioniert. Egal, ob die Idee aus Berlin, Kopenhagen oder Warschau kommt. So einfach. So selten."
        ctaLabel="Wahlprogramm kurz"
        ctaTo="/wahlprogramm"
      />
      <CountdownSection target={ELECTION_DATE} ctaTo="/wahlsystem" />
      <CalendarSection events={getUpcomingCalendarItems(3)} viewAllTo="/termine" />
      <CandidatesSection
        imageSrc="/pics/unsereKandidatenPortraitCluster.png"
        imageAlt="Die Kandidierenden von Volt Berlin"
        ctaTo="/kandidaten"
      />
      <UnfuckSection
        logoSrc="/logos/unfckBerlin.svg"
        logoAlt="unf*ck berlin"
        videoSrc="https://www.youtube-nocookie.com/embed/BwVBRkJxt-w"
        videoTitle="15. Juli 2026"
        text="Hinter unf*ck berlin steckt eine einfache Idee: Probleme verschwinden nicht, wenn man höflicher über sie spricht. Aber sie verschwinden auch nicht, wenn man nur über sie klagt."
        ctaLabel="Worum geht es?"
        ctaTo="/unfuck-berlin"
      />
    </PageLayout>
  )
}

export default Home
