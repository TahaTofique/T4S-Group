import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { companyData } from '@/data/companyData'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Timeline } from '@/components/Timeline'
import { CompanyCard } from '@/components/CompanyCard'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { ContactForm } from '@/components/ContactForm'
import { CursorSpotlight } from '@/components/CursorSpotlight'
import { GradientMesh } from '@/components/GradientMesh'
import { KineticHeadline } from '@/components/KineticHeadline'
import { MarqueeStrip } from '@/components/MarqueeStrip'
import { Magnetic } from '@/components/Magnetic'

const SECTORS = ['Corporate', 'Industrial', 'Residential', 'Healthcare', 'Education', 'Retail', 'Commercial']

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* HERO — fullscreen, parallax + cursor spotlight + kinetic type    */}
      {/* ---------------------------------------------------------------- */}
      <section ref={heroRef} className="relative flex h-screen min-h-[720px] items-center overflow-hidden">
        <motion.div style={{ y, scale }} className="absolute inset-0">
          {/* PLACEHOLDER — replace with a real architectural / group photo */}
          <img
            src="https://source.unsplash.com/1920x1080/?architecture,skyscraper&sig=hero-landing"
            alt="PLACEHOLDER — T4S Group headquarters"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />
          <div className="absolute inset-0 bg-grid opacity-40" />
        </motion.div>

        <CursorSpotlight />

        <motion.div style={{ opacity }} className="container-max relative px-6 sm:px-10 lg:px-16">
          <Reveal>
            <p className="eyebrow flex items-center gap-2">
              <span className="h-1 w-1 animate-pulse rounded-full bg-gold" />
              T4S Group · Est. {companyData.founded}
            </p>
          </Reveal>

          <h1 className="text-balance mt-6 max-w-3xl font-display text-5xl font-medium leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            <KineticHeadline text="Building Trust." delay={0.1} />
            <br />
            <KineticHeadline text="Protecting Futures." delay={0.35} />
          </h1>

          <Reveal delay={0.75}>
            <p className="text-balance mt-7 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
              PLACEHOLDER — T4S Group has been delivering professional services since {companyData.founded}, operating
              through its two specialist divisions.
            </p>
          </Reveal>
          <Reveal delay={0.85}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Magnetic>
                <a href="/security" className="btn-primary shine">
                  Explore T4S Security
                </a>
              </Magnetic>
              <Magnetic>
                <a href="/enterprises" className="btn-outline shine">
                  Explore T4S Enterprises
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        >
          <ChevronDown size={22} />
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* SECTOR MARQUEE                                                    */}
      {/* ---------------------------------------------------------------- */}
      <MarqueeStrip items={SECTORS} />

      {/* ---------------------------------------------------------------- */}
      {/* ABOUT + TIMELINE                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section id="about" className="section-pad relative overflow-hidden bg-ink">
        <GradientMesh />
        <div className="container-max relative">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                eyebrow="About T4S Group"
                title="Two specialist companies. One standard of trust."
              />
              <div className="mt-8 space-y-5">
                {companyData.aboutText.map((p, i) => (
                  <Reveal key={i} delay={0.1 + i * 0.05}>
                    <p className="text-sm leading-relaxed text-mist sm:text-base">{p}</p>
                  </Reveal>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                {companyData.groupStats.map((stat) => (
                  <AnimatedCounter key={stat.label} {...stat} />
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow mb-2">Group Timeline</p>
              <Timeline entries={companyData.timeline} />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* COMPANY CARDS                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="section-pad relative overflow-hidden bg-ink-raised">
        <div className="container-max relative">
          <SectionHeading
            eyebrow="Our Companies"
            title="Two divisions, purpose-built for their fields."
            description="Each company operates independently, with its own specialists and standards, under the shared discipline of T4S Group."
            align="center"
          />

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <CompanyCard company={companyData.security} delay={0.05} />
            <CompanyCard company={companyData.enterprises} delay={0.15} />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CONTACT CTA                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="section-pad bg-ink">
        <div className="container-max grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Get in Touch"
              title="Talk to T4S Group about your requirements."
              description="Whether your inquiry concerns security services, construction, or a general partnership question, our team will route it to the right division."
            />
          </div>
          <ContactForm
            title="Send a Message"
            description="We'll connect you with the right division of T4S Group."
          />
        </div>
      </section>
    </>
  )
}
