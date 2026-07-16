import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Fixed, full-viewport background that sits behind all page content
 * (z-0 — every section/page must render above it, typically via a
 * `relative z-10` wrapper, which App.tsx already provides).
 *
 * Two layers:
 *  1. Aurora — large blurred color fields that drift on their own timers
 *     AND roll vertically with scroll position, so the backdrop feels like
 *     it's slowly rolling past as you read down the page.
 *  2. Grain — a faint animated noise texture (SVG turbulence) blended over
 *     everything, which is what separates "flat dark background" from a
 *     considered, filmic one.
 */
export function AuroraBackground() {
  const { scrollYProgress } = useScroll()
  const rollA = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const rollB = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const rollC = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-ink" aria-hidden>
      <motion.div
        style={{ y: rollA }}
        animate={{ x: [0, 40, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[-10%] top-[-10%] h-[46rem] w-[46rem] rounded-full bg-primary/[0.16] blur-[140px]"
      />
      <motion.div
        style={{ y: rollB }}
        animate={{ x: [0, -50, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[-15%] top-[30%] h-[40rem] w-[40rem] rounded-full bg-gold/[0.07] blur-[140px]"
      />
      <motion.div
        style={{ y: rollC }}
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-15%] left-[15%] h-[42rem] w-[42rem] rounded-full bg-primary-light/[0.10] blur-[150px]"
      />

      <GrainLayer />

      {/* Vignette to keep edges/corners resolving to pure ink */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,transparent_40%,rgba(11,15,23,0.6)_100%)]" />
    </div>
  )
}

function GrainLayer() {
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])
  if (!ready) return null

  return (
    <svg className="absolute inset-0 h-full w-full opacity-[0.035] mix-blend-overlay">
      <filter id="t4s-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#t4s-grain)" />
    </svg>
  )
}
