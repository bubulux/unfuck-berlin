import type { HTMLAttributes } from 'react'
import { ProgramPillar } from '../../molecules/program-pillar'
import './styles.css'

export interface ProgramPillarItem {
  title: string
  tags: string[]
  body: string
}

export interface ProgramSectionProps extends HTMLAttributes<HTMLElement> {
  pillars: ProgramPillarItem[]
}

export function ProgramSection({
  pillars,
  className,
  ...rest
}: ProgramSectionProps) {
  const classes = ['program', className].filter(Boolean).join(' ')
  return (
    <section className={classes} {...rest}>
      <div className="program__inner">
        {pillars.map((pillar) => (
          <ProgramPillar
            key={pillar.title}
            title={pillar.title}
            tags={pillar.tags}
            body={pillar.body}
          />
        ))}
      </div>
    </section>
  )
}

export default ProgramSection
