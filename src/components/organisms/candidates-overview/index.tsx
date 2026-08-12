import type { HTMLAttributes, ReactNode } from 'react'
import { CandidateCard } from '../../molecules/candidate-card'
import type { Kandidat } from '../../../data/kandidaten'
import './styles.css'
import HighlightText from '../../atoms/highlight-text'

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
        <HighlightText
          as="h1"
          // autoBreakSize={autoBreakSize_cramped}
          lines={[heading]}
          variant="titel"
          color="purple"
          textColor="white"
          align="left"
          uppercase={false}
          className="kandidaten__heading"
          style={{ marginBlockEnd: '1rem' }}
        />

        {children ? <div className="kandidaten__intro">{children}</div> : null}

        <div className="kandidaten__grid">
          {sorted.map((candidate) => (
            <CandidateCard
              key={candidate.slug}
              name={candidate.name}
              image={candidate.image}
              listenplatz={candidate.listenplatz}
              bezirk={candidate.bezirk}
              to={`/kandidierende/${candidate.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CandidatesOverview
