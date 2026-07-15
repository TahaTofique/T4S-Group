import { motion } from 'framer-motion'
import { ShieldCheck, ArrowRight } from 'lucide-react'
import { companyData } from '@/data/companyData'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { ServiceCard } from '@/components/ServiceCard'
import { WhyUsCard } from '@/components/WhyUsCard'
import { IndustriesGrid } from '@/components/IndustriesGrid'
import { GalleryGrid } from '@/components/GalleryGrid'
import { ContactForm } from '@/components/ContactForm'
import { AnimatedCounter } from '@/components/AnimatedCounter'

export default function Security() {
  const data = companyData.security

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-24">
        <div className="absolute inset-0">
          <img src={data.heroImage} alt={data.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-ink/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/40" />
        </div>

        <div className="container-max relative px-6 sm:px-10 lg:px-16">
          <Reveal>
            <div className="flex items-center gap-2 text-gold">
              <ShieldCheck size={18} />
              <span className="eyebrow">{data.name}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-balance mt-6 max-w-2xl font-display text-5xl font-medium leading-[1.08] text-white sm:text-6xl">
              {data.heroHeadline}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-balance mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
              {data.heroSubtext}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#quote" className="btn-primary">
                Request a Quote
                <ArrowRight size={15} />
              </a>
              <a href="#services" className="btn-outline">
                View Services
              </a>
            </div>
          </Reveal>

          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-8 sm:max-w-lg">
            {data.stats.map((stat) => (
              <AnimatedCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section-pad bg-ink">
        <div className="container-max">
          <SectionHeading
            eyebrow="What We Do"
            title="Security services built around your site."
            description={data.aboutText}
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.services.map((s, i) => (
              <ServiceCard key={s.title} {...s} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-pad bg-ink-raised">
        <div className="container-max">
          <SectionHeading eyebrow="Why T4S Security" title="Discipline you can verify." align="center" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.whyUs.map((w, i) => (
              <WhyUsCard key={w.title} {...w} index={i} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section-pad bg-ink">
        <div className="container-max">
          <SectionHeading eyebrow="Industries Served" title="Programs designed for your sector." />
          <div className="mt-12">{data.industries && <IndustriesGrid industries={data.industries} />}</div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section-pad bg-ink-raised">
        <div className="container-max">
          <SectionHeading eyebrow="Gallery" title="Personnel and operations in the field." />
          <div className="mt-12">
            <GalleryGrid images={data.gallery} />
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section id="careers" className="section-pad bg-ink">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="corner-frame relative overflow-hidden rounded-xl2 bg-gradient-to-br from-primary/25 via-primary/10 to-transparent p-10 sm:p-16"
          >
            <span className="cf-tr" />
            <span className="cf-bl" />
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.4fr_0.6fr]">
              <div>
                <p className="eyebrow">Careers</p>
                <h2 className="mt-4 font-display text-3xl text-white sm:text-4xl">
                  Join the T4S Security team.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-mist sm:text-base">
                  PLACEHOLDER — We're always looking for disciplined, reliable personnel. Submit an application and
                  our recruitment team will be in touch about current openings.
                </p>
              </div>
              <a href="#quote" className="btn-primary w-full sm:w-auto">
                Apply Now
                <ArrowRight size={15} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUOTE FORM */}
      <section id="quote" className="section-pad bg-ink-raised">
        <div className="container-max grid grid-cols-1 gap-16 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Request a Quote"
            title="Tell us about your site."
            description="Share a few details and our team will prepare a tailored proposal for your security needs."
          />
          <ContactForm
            title="Request a Quote"
            description="Our team typically responds within one business day."
            serviceOptions={data.services.map((s) => s.title)}
          />
        </div>
      </section>
    </>
  )
}
