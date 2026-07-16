import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { SubCompany } from '@/types'
import { Reveal } from './Reveal'
import { TiltCard } from './TiltCard'
import { Magnetic } from './Magnetic'

export function CompanyCard({ company, delay = 0 }: { company: SubCompany; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <TiltCard max={6} className="h-full">
        <motion.div
          whileHover="hover"
          className="corner-frame glass group relative h-full overflow-hidden rounded-xl2"
        >
          <span className="cf-tr" />
          <span className="cf-bl" />
          <div className="relative h-72 overflow-hidden sm:h-80" style={{ transform: 'translateZ(30px)' }}>
            <motion.img
              variants={{ hover: { scale: 1.08 } }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              src={company.heroImage}
              alt={company.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
          </div>

          <div className="relative -mt-16 p-8" style={{ transform: 'translateZ(50px)' }}>
            <p className="eyebrow">{company.tagline}</p>
            <h3 className="mt-3 font-display text-2xl text-white sm:text-3xl">{company.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-mist">{company.heroSubtext}</p>

            <Magnetic strength={0.25}>
              <Link
                to={`/${company.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold"
              >
                Learn More
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>
          </div>
        </motion.div>
      </TiltCard>
    </Reveal>
  )
}
