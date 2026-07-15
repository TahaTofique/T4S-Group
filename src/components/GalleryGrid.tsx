import type { GalleryImage } from '@/types'
import { Reveal } from './Reveal'
import { cn } from '@/lib/utils'

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
      {images.map((image, i) => (
        <Reveal
          key={image.src}
          delay={(i % 3) * 0.08}
          className={cn(i === 0 || i === 5 ? 'sm:col-span-2 sm:row-span-1' : '', 'group')}
        >
          <div className="corner-frame relative overflow-hidden rounded-xl2">
            <span className="cf-tr" />
            <span className="cf-bl" />
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className={cn(
                'w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105',
                i === 0 || i === 5 ? 'h-56 sm:h-72' : 'h-56'
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <p className="absolute bottom-3 left-4 text-xs text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {image.alt}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
