import { useLocation } from 'react-router'
import { PageLayout } from '../../components/templates/page-layout'
import { EventsSection } from '../../components/organisms/events-section'
import { Text } from '../../components/atoms/text'
import { getAllCalendarItems } from '../../data/events'

export function Termine() {
  const { pathname } = useLocation()
  return (
    <PageLayout activePath={pathname} hideCalendar>
      <EventsSection
        headingLines={['Termine', '& Treffen']}
        intro={[
          'Lern unsere AGH und BVV Kandidierenden kennen oder mach direkt bei Volt mit!',
          'Wir freuen uns auf Dich auf Podien, Meet&Greets, und anderen Veranstaltungen zu begrüßen.',
        ]}
        events={getAllCalendarItems()}
      >
        <Text as="p" variant="body" color="white">
          Du vermisst hier ein Event, oder würdest uns gerne auf einem Panel
          begrüßen? <strong>Dann lad' uns ein!</strong>
        </Text>
        <Text as="p" variant="body" color="white">
          Schreib dazu eine Mail an{' '}
          <a href="mailto:presse@voltberlin.org" style={{ color: 'inherit' }}>
            presse@voltberlin.org
          </a>
        </Text>
      </EventsSection>
    </PageLayout>
  )
}

export default Termine
