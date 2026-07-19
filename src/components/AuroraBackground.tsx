import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Fixed, full-viewport background that sits behind all page content
 * (z-0 — every section/page must render above it, typically via a
 * `relative z-10` wrapper, which App.tsx already provides).
 *
 * PERFORMANCE NOTE: the earlier version drove the blob "drift" via Framer
 * Motion's `animate` prop, which re-runs a JS callback on every animation
 * frame on the main thread, forever, on every page — the single biggest
 * thing that made the site feel heavy. The drift now runs as a plain CSS
 * @keyframes animation instead, handled entirely by the compositor: it's
 * automatically paused when the tab isn't visible and respects
 * prefers-reduced-motion via the global rule in index.css.
 *
 * The horizontal drift (CSS) and the scroll-linked vertical "roll" (Framer
 * Motion) are deliberately applied to two nested elements rather than one —
 * both ultimately animate `transform`, and having a CSS animation and a
 * JS-driven inline style fight over the same property on the same element
 * causes flicker/contention. Outer div = CSS drift, inner = scroll roll.
 */
export function AuroraBackground() {
  const { scrollYProgress } = useScroll()
  const rollA = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])
  const rollB = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-ink" aria-hidden>
      <div className="animate-drift-a absolute left-[-10%] top-[-10%] h-[38rem] w-[38rem]">
        <motion.div
          style={{ y: rollA }}
          className="h-full w-full rounded-full bg-primary/[0.14] blur-[100px] will-change-transform"
        />
      </div>
      <div className="animate-drift-b absolute right-[-15%] top-[30%] h-[34rem] w-[34rem]">
        <motion.div
          style={{ y: rollB }}
          className="h-full w-full rounded-full bg-gold/[0.06] blur-[100px] will-change-transform"
        />
      </div>

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
    <svg className="absolute inset-0 h-full w-full opacity-[0.03] mix-blend-overlay">
      <filter id="t4s-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#t4s-grain)" />
    </svg>
  )
}
