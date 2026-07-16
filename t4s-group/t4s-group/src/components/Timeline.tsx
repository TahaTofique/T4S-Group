import type { TimelineEntry } from '@/types'
import { Reveal } from './Reveal'

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="relative mt-8">
      {/* Vertical survey line */}
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/60 via-gold/20 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

      <ol className="space-y-14">
        {entries.map((entry, i) => (
          <li key={entry.title} className="relative sm:grid sm:grid-cols-2 sm:gap-10">
            <div className="sm:contents">
              <div className={`pl-8 sm:pl-0 ${i % 2 === 0 ? 'sm:order-1 sm:text-right sm:pr-10' : 'sm:order-2 sm:col-start-2 sm:pl-10'}`}>
                <Reveal delay={i * 0.05}>
                  <span className="eyebrow text-gold">N&nbsp;{entry.year}</span>
                  <h3 className="mt-2 font-display text-xl text-white">{entry.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{entry.description}</p>
                </Reveal>
              </div>
              {i % 2 === 0 && <div className="hidden sm:block sm:order-2" />}
              {i % 2 !== 0 && <div className="hidden sm:block sm:order-1" />}
            </div>

            <span className="absolute left-0 top-1 h-3.5 w-3.5 rounded-full border-2 border-gold bg-ink sm:left-1/2 sm:-translate-x-1/2" />
          </li>
        ))}
      </ol>
    </div>
  )
}
