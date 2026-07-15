import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { companyData } from '@/data/companyData'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'T4S Security', to: '/security' },
  { label: 'T4S Enterprises', to: '/enterprises' },
  { label: 'Contact', to: '/#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled || open
          ? 'border-b border-white/[0.06] bg-ink/85 backdrop-blur-md py-3'
          : 'border-b border-transparent bg-transparent py-6'
      )}
    >
      <div className="container-max flex items-center justify-between px-6 sm:px-10 lg:px-16">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 font-display text-sm font-medium text-gold">
            {companyData.logoText}
          </span>
          <span className="font-display text-lg tracking-tight text-white">{companyData.groupName}</span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={cn(
                'text-sm font-medium tracking-wide text-white/80 transition-colors hover:text-gold',
                location.pathname === link.to && 'text-gold'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/#contact" className="btn-primary !px-6 !py-2.5 text-xs">
            Get in Touch
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/[0.06] md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-white/85 hover:bg-white/5 hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
