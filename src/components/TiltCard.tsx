import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import type { ReactNode } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Max rotation in degrees. Keep this restrained for a "premium" feel — big brief calls for trust, not a toy. */
  max?: number
  /** Adds a moving specular highlight that tracks the pointer. */
  glare?: boolean
  /** Elements lift toward the viewer (translateZ) in addition to rotating. */
  lift?: boolean
}

export function TiltCard({ children, className, max = 8, glare = true, lift = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const px = useMotionValue(0.5) // 0..1 pointer position within card
  const py = useMotionValue(0.5)

  const springCfg = { stiffness: 220, damping: 20, mass: 0.6 }
  const sx = useSpring(px, springCfg)
  const sy = useSpring(py, springCfg)

  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const glareX = useTransform(sx, [0, 1], ['0%', '100%'])
  const glareY = useTransform(sy, [0, 1], ['0%', '100%'])
  const translateZ = useSpring(0, springCfg)

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  function handleEnter() {
    setHovered(true)
    if (lift) translateZ.set(18)
  }

  function handleLeave() {
    setHovered(false)
    px.set(0.5)
    py.set(0.5)
    translateZ.set(0)
  }

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerEnter={handleEnter}
        onPointerLeave={handleLeave}
        style={{
          rotateX,
          rotateY,
          translateZ,
          transformStyle: 'preserve-3d',
        }}
        className="relative h-full will-change-transform"
      >
        {children}
        {glare && <Glare x={glareX} y={glareY} visible={hovered} />}
      </motion.div>
    </div>
  )
}

function Glare({ x, y, visible }: { x: MotionValue<string>; y: MotionValue<string>; visible: boolean }) {
  const background = useTransform([x, y], ([xv, yv]: string[]) =>
    `radial-gradient(420px circle at ${xv} ${yv}, rgba(255,255,255,0.14), transparent 55%)`
  )
  return (
    <motion.div
      aria-hidden
      style={{ background }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.25 }}
      className="pointer-events-none absolute inset-0 rounded-[inherit]"
    />
  )
}
