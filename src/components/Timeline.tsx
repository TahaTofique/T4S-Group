import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { TimelineEntry } from '@/types'
import { Reveal } from './Reveal'

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 60%'],
  })
  // The line draws itself in sync with scroll position through this section,
  // rather than just fading in — it visually "catches up" to wherever you are.
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={containerRef} className="relative mt-8">
      {/* Track (always visible, faint) */}
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/[0.07] sm:left-1/2 sm:-translate-x-1/2" />
      {/* Scroll-scrubbed fill */}
      <motion.div
        style={{ height: lineHeight }}
        className="absolute left-[7px] top-2 w-px bg-gradient-to-b from-gold via-gold/70 to-gold/20 sm:left-1/2 sm:-translate-x-1/2"
      />

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
