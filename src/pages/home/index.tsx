import { useLocation } from 'react-router'
import { PageLayout } from '../../components/templates/page-layout'
import { HeroSection } from '../../components/organisms/hero-section'
import { CountdownSection } from '../../components/organisms/countdown-section'
import { CandidatesSection } from '../../components/organisms/candidates-section'
import { UnfuckSection } from '../../components/organisms/unfuck-section'

/** Election date: 20 September 2026 (month is 0-indexed). */
const ELECTION_DATE = new Date(2026, 8, 20)

export function Home() {
  const { pathname } = useLocation()
  return (
    <PageLayout activePath={pathname}>
      <HeroSection
        videoSrc="/vids/anna_paul_intro.mp4"
        videoPoster="/vids/anna_paul_intro_poster.jpg"
        videoTitle="Anna und Paul"
        logoSrc="/logos/unfckBerlin.svg"
        logoAlt="unf*ck berlin"
        text="Berlin besser machen!\n\nVolt bringt nach Berlin, was woanders funktioniert. Egal, ob die Idee aus Berlin, Kopenhagen oder Warschau kommt. So einfach. So selten."
        ctaLabel="Wahlprogramm kurz"
        ctaTo="/wahlprogramm"
      />
      <CountdownSection target={ELECTION_DATE} ctaTo="/wahlsystem" />
      <CandidatesSection
        leadImageSrc="/pics/wahlsystem/paul-anna-portrait.png"
        leadImageAlt="Paul Löper und Anna Auerbach"
        leadCaptionLabel="Spitzenduo Volt kennenlernen"
        leadCaptionTo="/spitzenkandidaten"
        imageSrc="/pics/unsereKandidatenPortraitCluster.png"
        imageAlt="Die Kandidierenden von Volt Berlin"
        ctaTo="/kandidierende"
      />
      <UnfuckSection
        logoSrc="/logos/unfckBerlin.svg"
        logoAlt="unf*ck berlin"
        videoSrc="/vids/20260715_VOLT_UNFCK_REVEAL_LONG_VERSION_FINAL_XtraSmall.mp4"
        videoPoster="/vids/unfck_reveal_poster.jpg"
        videoTitle="15. Juli 2026"
        text="Hinter unf*ck berlin steckt eine einfache Idee: Probleme verschwinden nicht, wenn man höflicher über sie spricht. Aber sie verschwinden auch nicht, wenn man nur über sie klagt."
        ctaLabel="Worum geht es?"
        ctaTo="/unfuck-berlin"
      />
    </PageLayout>
  )
}

export default Home
