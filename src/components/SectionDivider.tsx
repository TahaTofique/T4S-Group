import { motion } from 'framer-motion'

export function SectionDivider() {
  return (
    <div className="relative h-px w-full overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="h-full w-full origin-center bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
    </div>
  )
}
