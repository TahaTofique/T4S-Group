import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function KineticHeadline({
  text,
  className = '',
  delay = 0,
  goldWords = [],
}: {
  text: string
  className?: string
  delay?: number
  /** Words (case-sensitive, punctuation included, e.g. "Trust.") rendered in gold foil instead of white. */
  goldWords?: string[]
}) {
  const words = text.split(' ')
  return (
    <span className={className} style={{ perspective: 800 }}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 pr-[0.3em] align-bottom">
          <motion.span
            initial={{ y: '110%', rotateX: 40, opacity: 0 }}
            animate={{ y: '0%', rotateX: 0, opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={cn('inline-block', goldWords.includes(word) && 'foil-text')}
            style={{ transformOrigin: '50% 100%' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
