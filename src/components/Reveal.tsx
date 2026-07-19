import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li'
}

/**
 * Fade + slide-up reveal, triggered once when the element enters the
 * viewport. Used for nearly every section on the site to keep motion
 * consistent and centrally tunable.
 */
export function Reveal({ children, delay = 0, y = 24, className, as = 'div' }: RevealProps) {
  const Component = motion[as]
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  )
}
