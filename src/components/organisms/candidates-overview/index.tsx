import type { HTMLAttributes, ReactNode } from 'react'
import { Text } from '../../atoms/text'
import { CandidateCard } from '../../molecules/candidate-card'
import type { Kandidat } from '../../../data/kandidaten'
import './styles.css'

export interface CandidatesOverviewProps extends HTMLAttributes<HTMLElement> {
  heading: string
  /** Intro copy. */
  children?: ReactNode
  candidates: Kandidat[]
}

export function CandidatesOverview({
  heading,
  children,
  candidates,
  className,
  ...rest
}: CandidatesOverviewProps) {
  const classes = ['kandidaten', className].filter(Boolean).join(' ')
  const sorted = [...candidates].sort((a, b) => a.listenplatz - b.listenplatz)
  return (
    <section className={classes} {...rest}>
      <div className="kandidaten__inner">
        <Text as="h1" variant="titel" color="purple" uppercase className="kandidaten__heading">
          {heading}
        </Text>

        {children ? <div className="kandidaten__intro">{children}</div> : null}

        <div className="kandidaten__grid">
          {sorted.map((candidate) => (
            <CandidateCard
              key={candidate.slug}
              name={candidate.name}
              image={candidate.image}
              listenplatz={candidate.listenplatz}
              bezirk={candidate.bezirk}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CandidatesOverview
