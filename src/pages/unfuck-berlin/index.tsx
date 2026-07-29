import { useLocation } from 'react-router'
import { PageLayout } from '../../components/templates/page-layout'
import { UnfuckIntro } from '../../components/organisms/unfuck-intro'
import { VideoSection } from '../../components/organisms/video-section'
import { ImageStack } from '../../components/organisms/image-stack'
import { Text } from '../../components/atoms/text'
import { VIDEOS } from '../../data/videos'
import { UNFCK_COLLAGE } from '../../data/unfck'

export function UnfuckBerlin() {
  const { pathname } = useLocation()
  return (
    <PageLayout activePath={pathname}>
      <UnfuckIntro
        logoSrc="/logos/unfckBerlin.svg"
        logoAlt="unf*ck berlin"
        headline="Eine Politik, die unsere Zukunft gestaltet, statt die Gegenwart zu verwalten."
        ctaLabel="Sticker abgreifen"
        ctaTo="/sticker"
      >
        <Text color="white">
          Hinter unf*ck berlin steckt eine einfache Idee: Probleme verschwinden
          nicht, wenn man höflicher über sie spricht. Aber sie verschwinden auch
          nicht, wenn man nur über sie klagt.
        </Text>
        <Text color="white">
          Es ist eine Einladung, wieder Erwartungen an diese Stadt zu haben. Wir
          bringen eine mutige Vision mit: faktenbasiert, lernfähig und
          europäisch. Wir entscheiden nicht nach Lagern oder Ideologien, sondern
          danach, was wirkt.
        </Text>
        <Text color="white">
          Andere Metropolen haben viele unserer Herausforderungen längst gelöst.
          Wir bringen die besten Ideen aus ganz Europa auf Berlins Straßen.
        </Text>
        <Text color="white">
          Wenn du das auch willst, mach mit! Sei ein Teil der Bewegung und hilf
          uns, diese Stadt neu zu denken.
        </Text>
      </UnfuckIntro>

      <VideoSection
        videoSrc={VIDEOS.reveal.src}
        videoPoster={VIDEOS.reveal.poster}
        videoTitle="15. Juli 2026"
        videoAspect="9 / 16"
      />

      <UnfuckIntro
        headline="Die Kraft, Visionen umzusetzen."
        ctaLabel="Wahlprogramm"
        ctaTo="/wahlprogramm"
      >
        <Text color="white">
          Berlin ist großartig, aber müde von einer Politik, die sich im
          Klein-Klein verliert, statt mutig in die Zukunft zu denken.
          <br />
          Berlin ist vielfältig, aber blockiert von einer Verwaltung, die zu oft
          nicht liefert.
          <br />
          Berlin ist pulsierend, aber sein Herzschlag erreicht die Politik nicht.
        </Text>
        <Text color="white">
          Wir glauben: Das muss nicht so bleiben.
          <br />
          Berlin unf*ckt sich nicht von allein.
        </Text>
        <Text color="white">
          Die Stadt braucht mehr als kleine Korrekturen am Status quo. Sie
          braucht deinen Mut zur Veränderung. Wir arbeiten für eine
          selbstbewusste Metropolregion, die zur treibenden Kraft für eine
          innovative, gerechte und nachhaltige Gesellschaft wird.{' '}
          <strong>Denn was f*cked ist, lässt sich auch unf*cken.</strong>
        </Text>
      </UnfuckIntro>

      <ImageStack images={UNFCK_COLLAGE} gap />

      <UnfuckIntro
        headline="Berlin ist eine der aufregendsten Städte der Welt!"
        ctaLabel="Erste & Zweite Stimme: Volt"
        ctaTo="/news/wahlsystem"
      >
        <Text color="white">
          Und trotzdem warten wir monatelang auf Briefe vom Amt. Auf Busse, die
          nicht kommen. Auf Wohnungen, die wir uns leisten können. Auf Schulen,
          die marode sind. Berlin ist nicht kaputt.
        </Text>
        <Text color="white">
          Aber gelähmt von der gepflegten Unzuständigkeit seiner Politik und
          Verwaltung. Die Stadt bleibt weit unter ihren Möglichkeiten – und das
          Gefühl wächst, dass es nicht besser wird, sondern schlechter. Und
          genau deshalb steht plötzlich überall in dieser Stadt: unf*ck berlin.
          <br />
          Wir glauben: Das muss nicht so bleiben.
        </Text>
      </UnfuckIntro>
    </PageLayout>
  )
}

export default UnfuckBerlin
