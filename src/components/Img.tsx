import { useState } from 'react'
import type { ImgHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Framer Motion's motion.img redefines a handful of event handlers
// (drag/animation events) with its own incompatible types, so those need to
// be excluded from the native attribute set we accept and spread through.
type NativeImgProps = Omit
  ImgHTMLAttributes<HTMLImageElement>,
  'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd'
>

interface ImgProps extends NativeImgProps {
  wrapperClassName?: string
}

/**
 * Drop-in replacement for <img> that shows a pulsing skeleton shimmer behind
 * the image until it finishes loading, then cross-fades the photo in.
 * Prevents the hard "pop-in" of images on slower connections.
 */
export function Img({ className, wrapperClassName, alt, ...props }: ImgProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <span className={cn('relative block overflow-hidden', wrapperClassName)}>
      {!loaded && (
        <span className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/[0.04] via-white/[0.08] to-white/[0.04] bg-[length:200%_100%]" />
      )}
      <motion.img
        {...props}
        alt={alt}
        onLoad={() => setLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={className}
      />
    </span>
  )
}
