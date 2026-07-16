import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { ReactNode } from 'react'

export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 16, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 200, damping: 16, mass: 0.4 })

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="inline-block will-change-transform"
    >
      {children}
    </motion.div>
  )
}
