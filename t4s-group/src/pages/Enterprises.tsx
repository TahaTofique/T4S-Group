import { HardHat, ArrowRight } from 'lucide-react'
import { companyData } from '@/data/companyData'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { ServiceCard } from '@/components/ServiceCard'
import { ProjectCard } from '@/components/ProjectCard'
import { GalleryGrid } from '@/components/GalleryGrid'
import { ProcessSteps } from '@/components/ProcessSteps'
import { ContactForm } from '@/components/ContactForm'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { CursorSpotlight } from '@/components/CursorSpotlight'
import { Magnetic } from '@/components/Magnetic'

export default function Enterprises() {
  const data = companyData.enterprises

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-24">
        <div className="absolute inset-0">
          <img src={data.heroImage} alt={data.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-ink/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/40" />
          <div className="absolute inset-0 bg-grid opacity-20" />
        </div>

        <CursorSpotlight />

        <div className="container-max relative px-6 sm:px-10 lg:px-16">
          <Reveal>
            <div className="flex items-center gap-2 text-gold">
              <HardHat size={18} />
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
              <Magnetic>
                <a href="#contact" className="btn-primary shine">
                  Start a Project
                  <ArrowRight size={15} />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#projects" className="btn-outline shine">
                  View Projects
                </a>
              </Magnetic>
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
      <section className="section-pad bg-ink">
        <div className="container-max">
          <SectionHeading
            eyebrow="What We Do"
            title="Full-lifecycle construction & development."
            description={data.aboutText}
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.services.map((s, i) => (
              <ServiceCard key={s.title} {...s} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section id="projects" className="section-pad bg-ink-raised">
        <div className="container-max">
          <SectionHeading eyebrow="Featured Projects" title="A sample of work in progress and completed." />
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.projects?.map((p, i) => (
              <ProjectCard key={p.name} project={p} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section-pad bg-ink">
        <div className="container-max">
          <SectionHeading eyebrow="Gallery" title="From blueprint to build." />
          <div className="mt-12">
            <GalleryGrid images={data.gallery} />
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-pad bg-ink-raised">
        <div className="container-max">
          <SectionHeading eyebrow="Our Process" title="Four stages. One accountable team." align="center" />
          <div className="mt-14">{data.process && <ProcessSteps steps={data.process} />}</div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contact" className="section-pad bg-ink">
        <div className="container-max grid grid-cols-1 gap-16 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Start a Project"
            title="Tell us what you're building."
            description="Share your project scope and our team will follow up to discuss timelines, budget, and next steps."
          />
          <ContactForm
            title="Start a Project"
            description="Our team typically responds within one business day."
            serviceOptions={data.services.map((s) => s.title)}
          />
        </div>
      </section>
    </>
  )
}
