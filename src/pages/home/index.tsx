import { useLocation } from 'react-router'
import { PageLayout } from '../../components/templates/page-layout'
import { HeroSection } from '../../components/organisms/hero-section'
import { CountdownSection } from '../../components/organisms/countdown-section'
import { CandidatesAndElectionProgamSection } from '../../components/organisms/candidates-section'
import { VIDEOS } from '../../data/videos'
import { CalendarSection } from '../../components/organisms/calendar-section'
import { useCalendar } from '../../context/calendar-context'

/** Election date: 20 September 2026 (month is 0-indexed). */
const ELECTION_DATE = new Date(2026, 8, 20)

export function Home() {
  const { pathname } = useLocation()
  const calendar = useCalendar()

  return (
    <PageLayout activePath={pathname}>
      <HeroSection
        videoSrc={VIDEOS.annaPaulIntro.src}
        videoPoster={VIDEOS.annaPaulIntro.poster}
        videoTitle="Anna und Paul"
        logoSrc="/logos/unfckBerlin.svg"
        logoAlt="unf*ck berlin"
        text={<>Berlin besser machen!<br /><br />Volt bringt nach Berlin, was woanders funktioniert. Egal, ob die Idee aus Berlin, Kopenhagen oder Warschau kommt. So einfach. So selten.</>}
        ctaLabel="Worum geht‘s?"
        ctaTo="/news/unfuck-berlin-reveal"
      />
      <CountdownSection target={ELECTION_DATE} ctaTo="/news/wahlsystem" />
      <CandidatesAndElectionProgamSection />
      <CalendarSection
        events={calendar.items.slice(0, 3)}
        status={calendar.status}
        viewAllTo="/termine"
      />

      <iframe src="https://www.juicer.io/api/feeds/volt_berlin-a7d9b9f9-b05f-49ef-9288-05b9dd2caa93/iframe" frameBorder="0" style={{
        display: 'block',
        margin: '0 auto',
        width: 'var(--content-max-wide)',
        maxWidth: '100%',
        height: '1000px',
        paddingInline: 'var(--content-pad-wide)',
        paddingBlock: '64px',
      }} title="volt_berlin - Juicer social media feed"></iframe>

      {/* <script type="text/javascript" src="https://www.juicer.io/embed/volt_berlin-a7d9b9f9-b05f-49ef-9288-05b9dd2caa93/embed-code.js" async defer /> */}

    </PageLayout>
  )
}

export default Home
