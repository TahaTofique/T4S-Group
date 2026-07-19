import type { ProjectItem } from '@/types'
import { Reveal } from './Reveal'
import { TiltCard } from './TiltCard'
import { cn } from '@/lib/utils'
import { Img } from './Img'

const STATUS_STYLES: Record<ProjectItem['status'], string> = {
  Completed: 'bg-gold/15 text-gold border-gold/30',
  'In Progress': 'bg-primary-light/15 text-primary-light border-primary-light/30',
  Upcoming: 'bg-white/10 text-white/70 border-white/20',
}

export function ProjectCard({ project, delay = 0 }: { project: ProjectItem; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <TiltCard max={6} className="h-full">
        <div className="corner-frame group overflow-hidden rounded-xl2 border border-white/[0.08] bg-ink-raised">
          <span className="cf-tr" />
          <span className="cf-bl" />
          <div className="relative h-56 overflow-hidden" style={{ transform: 'translateZ(24px)' }}>
            <Img
              src={project.image}
              alt={project.name}
              loading="lazy"
              wrapperClassName="absolute inset-0"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span
              className={cn(
                'absolute right-4 top-4 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wide backdrop-blur-md',
                STATUS_STYLES[project.status]
              )}
            >
              {project.status}
            </span>
          </div>
          <div className="p-6" style={{ transform: 'translateZ(16px)' }}>
            <h3 className="font-display text-lg text-white">{project.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">{project.description}</p>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-mist">
              <span>{project.location}</span>
              <span className="font-mono text-gold/80">{project.year}</span>
            </div>
          </div>
        </div>
      </TiltCard>
    </Reveal>
  )
}
