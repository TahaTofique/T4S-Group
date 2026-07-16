import type { ProcessStep } from '@/types'
import { Reveal } from './Reveal'

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <Reveal key={step.title} delay={i * 0.08} className="relative">
          <div className="relative rounded-xl2 border border-white/[0.08] bg-white/[0.02] p-7">
            <span className="font-display text-3xl text-gold/70">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-4 font-display text-lg text-white">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">{step.description}</p>
          </div>
          {i < steps.length - 1 && (
            <div className="absolute right-[-14px] top-1/2 hidden h-px w-7 -translate-y-1/2 bg-gold/30 lg:block" />
          )}
        </Reveal>
      ))}
    </div>
  )
}
