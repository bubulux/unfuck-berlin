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
  // Auf dem Desktop zwei Spalten: erste Haelfte links, Rest rechts (wie 18).
  const half = Math.ceil(pillars.length / 2)
  const columns = [pillars.slice(0, half), pillars.slice(half)]
  return (
    <section className={classes} {...rest}>
      <div className="program__inner">
        {columns.map((column, i) => (
          <div className="program__col" key={i}>
            {column.map((pillar) => (
              <ProgramPillar
                key={pillar.title}
                title={pillar.title}
                tags={pillar.tags}
                body={pillar.body}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProgramSection
