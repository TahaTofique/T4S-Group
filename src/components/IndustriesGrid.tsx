import type { IndustryItem } from '@/types'
import { Reveal } from './Reveal'
import { Img } from './Img'

export function IndustriesGrid({ industries }: { industries: IndustryItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
      {industries.map((industry, i) => (
        <Reveal key={industry.title} delay={i * 0.06}>
          <div className="corner-frame group relative h-40 overflow-hidden rounded-xl2 sm:h-48">
            <span className="cf-tr" />
            <span className="cf-bl" />
            <Img
              src={industry.image}
              alt={industry.title}
              loading="lazy"
              wrapperClassName="absolute inset-0"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <span className="absolute bottom-4 left-4 font-display text-base text-white sm:text-lg">
              {industry.title}
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
