import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Initializes Lenis smooth (inertia) scrolling for the whole document.
 * Mount once at the app root. This is what makes scrolling feel "expensive"
 * rather than the default abrupt native scroll — momentum carries slightly
 * past release, easing to a stop.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    let frame: number
    function raf(time: number) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])
}
