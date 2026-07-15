interface MarqueeStripProps {
  items: string[]
}

export function MarqueeStrip({ items }: MarqueeStripProps) {
  const loop = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-white/[0.07] bg-ink-raised/60 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-raised to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-raised to-transparent" />
      <div className="flex w-max animate-marquee gap-14">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-14 font-mono text-xs uppercase tracking-widest2 text-mist/70"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-gold/50" />
          </span>
        ))}
      </div>
    </div>
  )
}
