import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import type { StatItem } from '@/types'

export function AnimatedCounter({ label, value, suffix = '' }: StatItem) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState('0')

  const isPlaceholder = value === 'XX'
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { damping: 24, stiffness: 90 })

  useEffect(() => {
    if (isPlaceholder) return
    if (isInView) motionValue.set(value as number)
  }, [isInView, isPlaceholder, motionValue, value])

  useEffect(() => {
    if (isPlaceholder) return
    const unsub = spring.on('change', (v) => setDisplay(Math.floor(v).toString()))
    return unsub
  }, [spring, isPlaceholder])

  return (
    <div className="flex flex-col items-start">
      <span ref={ref} className="font-display text-4xl font-medium text-white sm:text-5xl">
        {isPlaceholder ? 'XX' : display}
        <span className="text-gold">{suffix}</span>
      </span>
      <span className="eyebrow mt-2 text-mist">{label}</span>
    </div>
  )
}
