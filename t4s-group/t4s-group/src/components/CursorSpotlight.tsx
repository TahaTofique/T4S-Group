import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CursorSpotlight({ color = 'rgba(212,175,55,0.12)' }: { color?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 80, damping: 24 })
  const sy = useSpring(y, { stiffness: 80, damping: 24 })

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
  }

  return (
    <div ref={ref} onPointerMove={handleMove} className="absolute inset-0 overflow-hidden">
      <motion.div
        style={{
          left: sx,
          top: sy,
          background: `radial-gradient(600px circle at center, ${color}, transparent 70%)`,
        }}
        className="pointer-events-none absolute h-0 w-0 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  )
}
