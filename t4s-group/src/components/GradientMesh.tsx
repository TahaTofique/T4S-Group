import { motion } from 'framer-motion'

/**
 * Two soft, slow-moving blurred orbs (brand blue + gold) that drift behind
 * content. Kept subtle and slow — this is ambient depth, not a hero effect.
 */
export function GradientMesh({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-primary/25 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-gold/[0.10] blur-[120px]"
      />
    </div>
  )
}
