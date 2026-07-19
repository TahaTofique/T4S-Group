import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ImgProps {
  src: string
  alt: string
  loading?: 'lazy' | 'eager'
  className?: string
  wrapperClassName?: string
}

/**
 * Drop-in replacement for <img> that shows a pulsing skeleton shimmer behind
 * the image until it finishes loading, then cross-fades the photo in.
 * Prevents the hard "pop-in" of images on slower connections.
 *
 * Deliberately accepts a narrow, explicit prop list (rather than spreading
 * the full native <img> attribute set) — motion.img redefines several event
 * handlers (onAnimationStart, onDrag, etc.) with its own incompatible types,
 * so passing arbitrary native props through causes a type collision. Add a
 * prop here explicitly if you need it rather than widening this to `...rest`.
 */
export function Img({ src, alt, loading = 'lazy', className, wrapperClassName }: ImgProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <span className={cn('relative block overflow-hidden', wrapperClassName)}>
      {!loaded && (
        <span className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/[0.04] via-white/[0.08] to-white/[0.04] bg-[length:200%_100%]" />
      )}
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={className}
      />
    </span>
  )
}
