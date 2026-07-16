import { useLocation } from 'react-router'
import { PageLayout } from '../../components/templates/page-layout'
import { CandidateDetail } from '../../components/organisms/candidate-detail'
import { SPITZENKANDIDATEN } from '../../data/candidates'

export function Spitzenkandidaten() {
  const { pathname } = useLocation()
  return (
    <PageLayout activePath={pathname} variant="light">
      {SPITZENKANDIDATEN.map((candidate) => (
        <CandidateDetail
          key={candidate.slug}
          variant="light"
          name={candidate.name}
          image={candidate.image}
          imageAlt={candidate.imageAlt}
          subtitle={candidate.subtitle}
          meta={candidate.meta}
          blocks={candidate.blocks}
          followLabel={candidate.followLabel}
          socials={candidate.socials}
        />
      ))}
    </PageLayout>
  )
}

export default Spitzenkandidaten
