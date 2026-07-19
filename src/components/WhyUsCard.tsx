import type { WhyUsItem } from '@/types'
import { Reveal } from './Reveal'
import { TiltCard } from './TiltCard'

export function WhyUsCard({ title, description, index, delay = 0 }: WhyUsItem & { index: number; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <TiltCard max={6} className="h-full">
        <div className="relative h-full overflow-hidden rounded-xl2 border border-white/[0.08] bg-gradient-to-b from-primary/[0.12] to-transparent p-7">
          <span style={{ transform: 'translateZ(24px)' }} className="block font-mono text-xs text-gold/70">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 style={{ transform: 'translateZ(18px)' }} className="mt-4 font-display text-lg text-white">
            {title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-mist">{description}</p>
        </div>
      </TiltCard>
    </Reveal>
  )
}
