import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { companyData } from '@/data/companyData'
import type { SocialLink } from '@/types'

const ICONS: Record<SocialLink['icon'], typeof Linkedin> = {
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="border-t border-white/[0.06] bg-ink-raised">
      <div className="container-max px-6 py-20 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          {/* Brand + Newsletter */}
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 font-display text-sm text-gold">
                {companyData.logoText}
              </span>
              <span className="font-display text-lg text-white">{companyData.groupName}</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">
              PLACEHOLDER — Parent company of T4S Security and T4S Enterprises, operating since {companyData.founded}.
            </p>

            <div className="mt-8">
              <p className="eyebrow mb-3">Newsletter</p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex max-w-xs items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] p-1.5"
              >
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="w-full bg-transparent px-3 py-1.5 text-sm text-white placeholder:text-mist/70 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-ink transition-transform hover:scale-105"
                >
                  <ArrowRight size={15} />
                </button>
              </form>
              <p className="mt-2 text-[11px] text-mist/60">PLACEHOLDER — connect this form to a real mailing list provider.</p>
            </div>
          </div>

          {/* Companies */}
          <div>
            <p className="eyebrow mb-4">Companies</p>
            <ul className="space-y-3 text-sm text-white/80">
              <li><Link to="/security" className="transition-colors hover:text-gold">T4S Security</Link></li>
              <li><Link to="/enterprises" className="transition-colors hover:text-gold">T4S Enterprises</Link></li>
              <li><Link to="/#about" className="transition-colors hover:text-gold">About the Group</Link></li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <p className="eyebrow mb-4">Company</p>
            <ul className="space-y-3 text-sm text-white/80">
              <li><Link to="/security#careers" className="transition-colors hover:text-gold">Careers</Link></li>
              <li><Link to="/#contact" className="transition-colors hover:text-gold">Contact</Link></li>
              <li><a href="#" className="transition-colors hover:text-gold">Privacy Policy — PLACEHOLDER</a></li>
              <li><a href="#" className="transition-colors hover:text-gold">Terms of Service — PLACEHOLDER</a></li>
            </ul>
          </div>

          {/* Contact + Map */}
          <div>
            <p className="eyebrow mb-4">Contact</p>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <Phone size={15} className="mt-0.5 shrink-0 text-gold" /> {companyData.contact.phone}
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={15} className="mt-0.5 shrink-0 text-gold" /> {companyData.contact.email}
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-gold" /> {companyData.contact.address}
              </li>
            </ul>

            <div className="mt-5 overflow-hidden rounded-xl border border-white/10 opacity-90 grayscale">
              {/* PLACEHOLDER — replace mapEmbedUrl in companyData.ts with a real embed URL */}
              <iframe
                title="Location map"
                src={companyData.contact.mapEmbedUrl}
                className="h-32 w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-mist/70">{companyData.legalNote.replace('{year}', String(year))}</p>
          <div className="flex items-center gap-4">
            {companyData.social.map((s) => {
              const Icon = ICONS[s.icon]
              return (
                <a
                  key={s.label}
                  href={s.url}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-gold/50 hover:text-gold"
                >
                  <Icon size={15} />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
