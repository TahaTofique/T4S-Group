import { Reveal } from './Reveal'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  light?: boolean
}

export function SectionHeading({ eyebrow, title, description, align = 'left', light }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      <Reveal>
        <p className={cn('eyebrow', light ? 'text-gold' : 'text-gold/80')}>{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-balance mt-4 font-display text-3xl font-medium leading-[1.15] text-white sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.15}>
          <p className="mt-5 text-balance text-base leading-relaxed text-mist">{description}</p>
        </Reveal>
      )}
    </div>
  )
}
