import { useLocation } from 'react-router'
import { PageLayout } from '../../components/templates/page-layout'
import { CandidateDetail } from '../../components/organisms/candidate-detail'
import { Divider } from '../../components/atoms/divider'
import { CalendarSection } from '../../components/organisms/calendar-section'
import { ANNA, PAUL, type Candidate } from '../../data/candidates'
import { getUpcomingCalendarItems } from '../../data/events'

function CandidateSection({ data }: { data: Candidate }) {
  return (
    <CandidateDetail
      variant="light"
      name={data.name}
      image={data.image}
      imageAlt={data.imageAlt}
      subtitle={data.subtitle}
      meta={data.meta}
      blocks={data.blocks}
      followLabel={data.followLabel}
      socials={data.socials}
    />
  )
}

export function Spitzenkandidaten() {
  const { pathname } = useLocation()
  return (
    <PageLayout activePath={pathname} variant="light">
      <CandidateSection data={ANNA} />
      <Divider color="neon" />
      <CandidateSection data={PAUL} />
      <CalendarSection events={getUpcomingCalendarItems(3)} viewAllTo="/termine" />
    </PageLayout>
  )
}

export default Spitzenkandidaten
