import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { companyData } from '@/data/companyData'

export function Preloader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Keep it brief — this is a polish moment, not a wait.
    const timer = setTimeout(() => setVisible(false), 1300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
        >
          <div className="flex flex-col items-center gap-5">
            <motion.span
              initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 font-display text-xl text-gold"
            >
              {companyData.logoText}
            </motion.span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-32 origin-center bg-gradient-to-r from-transparent via-gold/70 to-transparent"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="eyebrow"
            >
              {companyData.groupName}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
