import { useLocation } from 'react-router'
import { PageLayout } from '../../components/templates/page-layout'
import { CandidatesOverview } from '../../components/organisms/candidates-overview'
import { Text } from '../../components/atoms/text'
import { KANDIDATEN } from '../../data/kandidaten'

export function Kandidaten() {
  const { pathname } = useLocation()
  return (
    <PageLayout activePath={pathname} variant="light" hideCalendar>
      <CandidatesOverview
        heading="Gemeinsam für ein besseres Berlin"
        candidates={KANDIDATEN}
      >
        <Text color="purple">
          Unsere Kandidierenden stehen für frische Ideen,
          lösungsorientierte Politik und den Mut, neue Wege zu gehen. Sie kommen
          aus unterschiedlichen Lebensbereichen, teilen aber ein gemeinsames
          Ziel:
          <br />
          Berlin nachhaltig, gerecht und zukunftsfähig zu gestalten. Lerne unser
          Team kennen und erfahre, welche Themen ihnen besonders am Herzen
          liegen. Gemeinsam arbeiten wir an einem Berlin, das für alle
          funktioniert.
        </Text>
      </CandidatesOverview>
    </PageLayout>
  )
}

export default Kandidaten
