import { useLocation } from 'react-router'
import { PageLayout } from '../../components/templates/page-layout'
import { HeroSection } from '../../components/organisms/hero-section'

export function Home() {
  const { pathname } = useLocation()
  return (
    <PageLayout activePath={pathname}>
      <HeroSection
        videoSrc="https://www.youtube-nocookie.com/embed/ub8UIZ0FvRs"
        videoTitle="Anna und Paul"
        logoSrc="/logos/dieErsteParteiDie.svg"
        logoAlt="Die erste Partei, die…"
        text="Volt macht, was woanders funktioniert. Egal, ob die Idee aus Berlin, Kopenhagen oder Warschau kommt. So einfach. So selten."
        ctaLabel="Wahlprogramm kurz"
        ctaTo="/wahlprogramm"
      />
    </PageLayout>
  )
}

export default Home
