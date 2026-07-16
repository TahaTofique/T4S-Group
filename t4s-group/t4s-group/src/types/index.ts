// ---------------------------------------------------------------------------
// Shared data model for T4S Group.
// Edit values in `src/data/companyData.ts` — you should not need to change
// these type definitions unless you are adding an entirely new data shape.
// ---------------------------------------------------------------------------

export interface SocialLink {
  label: string
  url: string
  icon: 'linkedin' | 'facebook' | 'instagram' | 'twitter' | 'youtube'
}

export interface ContactInfo {
  phone: string
  email: string
  address: string
  mapEmbedUrl: string // REPLACE with a real Google Maps embed URL
}

export interface TimelineEntry {
  year: string
  title: string
  description: string
}

export interface ServiceItem {
  icon: string // lucide-react icon name, see Navbar/ServiceCard for mapping
  title: string
  description: string
}

export interface IndustryItem {
  title: string
  image: string
}

export interface GalleryImage {
  src: string
  alt: string
  credit?: string // e.g. "Placeholder — Unsplash"
}

export interface ProjectItem {
  name: string
  status: 'Completed' | 'In Progress' | 'Upcoming'
  location: string
  year: string
  image: string
  description: string
}

export interface WhyUsItem {
  title: string
  description: string
}

export interface ProcessStep {
  title: string
  description: string
}

export interface StatItem {
  label: string
  // Use a real number once you have a verified figure. Until then, keep the
  // "XX" placeholder — the counter will render it statically rather than
  // animating a fabricated number.
  value: number | 'XX'
  suffix?: string
}

export interface SubCompany {
  slug: 'security' | 'enterprises'
  name: string
  tagline: string
  heroHeadline: string
  heroSubtext: string
  heroImage: string
  aboutText: string
  services: ServiceItem[]
  whyUs: WhyUsItem[]
  industries?: IndustryItem[]
  gallery: GalleryImage[]
  projects?: ProjectItem[]
  process?: ProcessStep[]
  stats: StatItem[]
}

export interface CompanyData {
  groupName: string
  legalNote: string
  logoText: string
  founded: string
  contact: ContactInfo
  social: SocialLink[]
  aboutText: string[]
  timeline: TimelineEntry[]
  groupStats: StatItem[]
  security: SubCompany
  enterprises: SubCompany
}
