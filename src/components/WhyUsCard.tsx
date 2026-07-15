import type { WhyUsItem } from '@/types'
import { Reveal } from './Reveal'

export function WhyUsCard({ title, description, index, delay = 0 }: WhyUsItem & { index: number; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="relative h-full rounded-xl2 border border-white/[0.08] bg-gradient-to-b from-primary/[0.12] to-transparent p-7">
        <span className="font-mono text-xs text-gold/70">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="mt-4 font-display text-lg text-white">{title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-mist">{description}</p>
      </div>
    </Reveal>
  )
}
