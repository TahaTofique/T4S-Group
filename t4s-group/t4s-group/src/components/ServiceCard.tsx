import { motion } from 'framer-motion'
import type { ServiceItem } from '@/types'
import { iconMap } from '@/lib/icon-map'
import { Reveal } from './Reveal'
import { TiltCard } from './TiltCard'

export function ServiceCard({ icon, title, description, delay = 0 }: ServiceItem & { delay?: number }) {
  const Icon = iconMap[icon]
  return (
    <Reveal delay={delay} className="h-full">
      <TiltCard max={7} className="h-full">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="glass group h-full rounded-xl2 p-7 transition-colors duration-300 hover:border-gold/30"
        >
          <div
            style={{ transform: 'translateZ(28px)' }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/[0.06] text-gold transition-all duration-300 group-hover:bg-gold/15 group-hover:shadow-gold"
          >
            {Icon && <Icon size={20} strokeWidth={1.75} />}
          </div>
          <h3 style={{ transform: 'translateZ(20px)' }} className="mt-5 font-display text-lg text-white">
            {title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-mist">{description}</p>
        </motion.div>
      </TiltCard>
    </Reveal>
  )
}
