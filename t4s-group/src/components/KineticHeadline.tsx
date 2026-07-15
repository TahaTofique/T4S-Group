import { motion } from 'framer-motion'

export function KineticHeadline({
  text,
  className = '',
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
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
            className="inline-block"
            style={{ transformOrigin: '50% 100%' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
