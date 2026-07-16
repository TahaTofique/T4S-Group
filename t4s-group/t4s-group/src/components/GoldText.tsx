import type { ReactNode } from 'react'

/**
 * Wraps text in a slowly animating gold-foil gradient (see `.foil-text`
 * keyframes in index.css). Use sparingly — one or two words per page, not
 * entire paragraphs, or the effect stops reading as premium and starts
 * reading as noisy.
 */
export function GoldText({ children }: { children: ReactNode }) {
  return <span className="foil-text">{children}</span>
}
