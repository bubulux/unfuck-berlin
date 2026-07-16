import { useLocation } from 'react-router'
import { PageLayout } from '../../components/templates/page-layout'
import { ProgramIntro } from '../../components/organisms/program-intro'
import { ProgramSection } from '../../components/organisms/program-section'
import { Text } from '../../components/atoms/text'
import { PROGRAM_PILLARS } from '../../data/program'

export function Wahlprogramm() {
  const { pathname } = useLocation()
  return (
    <PageLayout activePath={pathname} variant="light">
      <ProgramIntro>
        <Text color="purple" weight="bold">
          Berlin ist pulsierend, aber sein Herzschlag erreicht die Politik nicht.
        </Text>
        <Text color="purple">
          Die Folgen spüren Berliner*innen täglich: Wohnungen, die unbezahlbar
          sind. Schulen, die marode sind. Eine Verwaltung, die auf einfache
          Anliegen monatelang nicht reagiert. Dazu kommt das Gefühl, dass es
          nicht besser wird, sondern schlechter.
        </Text>
        <Text color="purple">
          Mit unserem Wahlprogramm legen wir einen echten, konkreten Plan vor,
          wie diese Stadt wieder funktioniert:{' '}
          <strong>pragmatisch, evidenzbasiert und europäisch.</strong>
        </Text>
        <Text color="purple">
          In diesen Kapiteln zeigen wir, wie Berlin seine größten Probleme löst,
          von der Verwaltung über bezahlbares Wohnen bis zur Bildung.{' '}
          <strong>Denn Berlin braucht Politik, die Zukunft gestaltet.</strong>
        </Text>
      </ProgramIntro>
      <ProgramSection pillars={PROGRAM_PILLARS} />
    </PageLayout>
  )
}

export default Wahlprogramm
