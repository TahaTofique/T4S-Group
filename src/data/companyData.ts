import type { CompanyData } from '@/types'

// ---------------------------------------------------------------------------
// T4S GROUP — EDITABLE CONTENT FILE
// ---------------------------------------------------------------------------
// Every string and image reference on the website is sourced from this file.
// Replace the PLACEHOLDER values below with real company information.
// See README.md → "Editing Content" for a full walkthrough.
//
// Images: all image URLs currently point to unsplash.com/source, a free
// placeholder image service. Search terms are visible in the URL — swap
// each one for a real, licensed photo before launch (see README → "Images").
// ---------------------------------------------------------------------------

const img = (query: string, seed: string) =>
  `https://source.unsplash.com/1600x900/?${query}&sig=${seed}`

export const companyData: CompanyData = {
  groupName: 'T4S Group',
  legalNote: '© {year} T4S Group. All rights reserved. — PLACEHOLDER: confirm exact legal entity name.',
  logoText: 'T4S',
  founded: '2008',

  // PLACEHOLDER — replace with real contact details
  contact: {
    phone: '+1 (000) 000-0000',
    email: 'info@t4sgroup.example',
    address: '000 Placeholder Avenue, Suite 000, Your City, Country',
    // PLACEHOLDER — paste a real Google Maps "Embed a map" iframe src here
    mapEmbedUrl: 'https://www.google.com/maps?q=&output=embed',
  },

  // PLACEHOLDER — replace with real social profile URLs
  social: [
    { label: 'LinkedIn', url: '#', icon: 'linkedin' },
    { label: 'Facebook', url: '#', icon: 'facebook' },
    { label: 'Instagram', url: '#', icon: 'instagram' },
    { label: 'Twitter / X', url: '#', icon: 'twitter' },
  ],

  aboutText: [
    'PLACEHOLDER — T4S Group was founded in 2008 with a single premise: that trust is built, not claimed. What began as a focused security practice has grown into a group of specialist companies operating across security services and construction & development.',
    'PLACEHOLDER — Today, T4S Group operates through two dedicated divisions — T4S Security and T4S Enterprises — each led by its own specialists, and each held to the same standard of discretion, precision, and accountability.',
  ],

  groupStats: [
    { label: 'Years of Operation', value: 'XX' },
    { label: 'Team Members', value: 'XX', suffix: '+' },
    { label: 'Companies', value: 2 },
  ],

  timeline: [
    {
      year: '2008',
      title: 'Founded',
      description: 'PLACEHOLDER — T4S is established, laying the groundwork for a group built on trust and long-term relationships.',
    },
    {
      year: 'Expansion',
      title: 'Second Division Opens',
      description: 'PLACEHOLDER — The group expands its capabilities, opening a second specialist division to serve a broader range of clients.',
    },
    {
      year: 'Growth',
      title: 'Regional Growth',
      description: 'PLACEHOLDER — Operations scale across new regions and sectors, supported by an expanding team of specialists.',
    },
    {
      year: 'Today',
      title: 'T4S Group',
      description: 'PLACEHOLDER — T4S Group continues to operate with the same founding principles: discretion, precision, and accountability.',
    },
  ],

  // -------------------------------------------------------------------------
  // T4S SECURITY
  // -------------------------------------------------------------------------
  security: {
    slug: 'security',
    name: 'T4S Security',
    tagline: 'Professional Security Solutions',
    heroHeadline: 'Professional Security Solutions',
    heroSubtext:
      'PLACEHOLDER — T4S Security provides trained personnel and structured protocols for corporate, residential, industrial, and event environments.',
    heroImage: img('security,guard,night', 'sec-hero'),
    aboutText:
      'PLACEHOLDER — T4S Security designs and delivers manned-guarding and protective programs built around each site\'s specific risk profile, backed by clear reporting and accountable supervision.',
    services: [
      { icon: 'ShieldCheck', title: 'Security Guards', description: 'PLACEHOLDER — Trained, uniformed guarding personnel for a range of site types.' },
      { icon: 'Building2', title: 'Corporate Security', description: 'PLACEHOLDER — Access control and front-of-house security for corporate premises.' },
      { icon: 'Home', title: 'Residential Security', description: 'PLACEHOLDER — Discreet protection for residential communities and private estates.' },
      { icon: 'Factory', title: 'Industrial Security', description: 'PLACEHOLDER — Site security programs for industrial and logistics facilities.' },
      { icon: 'PartyPopper', title: 'Event Security', description: 'PLACEHOLDER — Crowd management and access control for events of all sizes.' },
      { icon: 'UserCheck', title: 'VIP Security', description: 'PLACEHOLDER — Close-protection services for individuals and executive travel.' },
    ],
    whyUs: [
      { title: 'Vetted Personnel', description: 'PLACEHOLDER — Every guard completes a structured screening and training process before deployment.' },
      { title: 'Clear Reporting', description: 'PLACEHOLDER — Site activity is logged and reported on a schedule agreed with each client.' },
      { title: 'Responsive Supervision', description: 'PLACEHOLDER — Field supervisors are reachable and accountable throughout every shift.' },
      { title: 'Tailored Protocols', description: 'PLACEHOLDER — Every engagement begins with a site-specific risk assessment.' },
    ],
    industries: [
      { title: 'Corporate', image: img('office,building', 'ind-corp') },
      { title: 'Industrial', image: img('warehouse,industrial', 'ind-ind') },
      { title: 'Residential', image: img('residential,building', 'ind-res') },
      { title: 'Healthcare', image: img('hospital,clinic', 'ind-health') },
      { title: 'Education', image: img('university,campus', 'ind-edu') },
      { title: 'Retail', image: img('retail,mall', 'ind-retail') },
    ],
    gallery: [
      { src: img('security,officer', 'gal-sec-1'), alt: 'PLACEHOLDER — security personnel on site' },
      { src: img('cctv,camera', 'gal-sec-2'), alt: 'PLACEHOLDER — surveillance equipment' },
      { src: img('security,gate', 'gal-sec-3'), alt: 'PLACEHOLDER — controlled access point' },
      { src: img('security,patrol', 'gal-sec-4'), alt: 'PLACEHOLDER — patrol in progress' },
      { src: img('security,uniform', 'gal-sec-5'), alt: 'PLACEHOLDER — uniformed guard' },
      { src: img('lobby,building', 'gal-sec-6'), alt: 'PLACEHOLDER — corporate lobby security desk' },
    ],
    stats: [
      { label: 'Years of Operation', value: 'XX' },
      { label: 'Trained Personnel', value: 'XX', suffix: '+' },
      { label: 'Sites Covered', value: 'XX', suffix: '+' },
    ],
  },

  // -------------------------------------------------------------------------
  // T4S ENTERPRISES
  // -------------------------------------------------------------------------
  enterprises: {
    slug: 'enterprises',
    name: 'T4S Enterprises',
    tagline: 'Construction & Development',
    heroHeadline: 'Building Better Tomorrow',
    heroSubtext:
      'PLACEHOLDER — T4S Enterprises delivers construction, renovation, and turnkey project management for commercial and residential clients.',
    heroImage: img('construction,architecture', 'ent-hero'),
    aboutText:
      'PLACEHOLDER — T4S Enterprises manages projects from initial planning through final delivery, coordinating design, engineering, and on-site execution under a single accountable team.',
    services: [
      { icon: 'HardHat', title: 'Construction', description: 'PLACEHOLDER — Ground-up construction for commercial and residential projects.' },
      { icon: 'Hammer', title: 'Renovation', description: 'PLACEHOLDER — Refurbishment and renovation of existing structures.' },
      { icon: 'ClipboardList', title: 'Project Management', description: 'PLACEHOLDER — End-to-end coordination of contractors, timelines, and budgets.' },
      { icon: 'KeyRound', title: 'Turnkey Solutions', description: 'PLACEHOLDER — Fully managed delivery from design through handover.' },
      { icon: 'Building2', title: 'Commercial', description: 'PLACEHOLDER — Office, retail, and industrial construction projects.' },
      { icon: 'Home', title: 'Residential', description: 'PLACEHOLDER — Private homes and residential developments.' },
    ],
    whyUs: [
      { title: 'Single Point of Accountability', description: 'PLACEHOLDER — One project team is responsible from planning through delivery.' },
      { title: 'Transparent Budgeting', description: 'PLACEHOLDER — Clear cost breakdowns are shared before work begins.' },
      { title: 'Qualified Trades', description: 'PLACEHOLDER — Work is carried out by vetted, experienced trade partners.' },
      { title: 'On-Schedule Delivery', description: 'PLACEHOLDER — Projects are tracked against an agreed delivery timeline.' },
    ],
    projects: [
      {
        name: 'PLACEHOLDER — Project Name One',
        status: 'Completed',
        location: 'PLACEHOLDER — City, Country',
        year: '20XX',
        image: img('modern,building', 'proj-1'),
        description: 'PLACEHOLDER — Short description of the project scope and outcome.',
      },
      {
        name: 'PLACEHOLDER — Project Name Two',
        status: 'In Progress',
        location: 'PLACEHOLDER — City, Country',
        year: '20XX',
        image: img('construction,site', 'proj-2'),
        description: 'PLACEHOLDER — Short description of the project scope and outcome.',
      },
      {
        name: 'PLACEHOLDER — Project Name Three',
        status: 'Upcoming',
        location: 'PLACEHOLDER — City, Country',
        year: '20XX',
        image: img('architecture,blueprint', 'proj-3'),
        description: 'PLACEHOLDER — Short description of the project scope and outcome.',
      },
    ],
    gallery: [
      { src: img('construction,crane', 'gal-ent-1'), alt: 'PLACEHOLDER — construction site' },
      { src: img('architecture,facade', 'gal-ent-2'), alt: 'PLACEHOLDER — building facade' },
      { src: img('interior,modern', 'gal-ent-3'), alt: 'PLACEHOLDER — interior finish' },
      { src: img('blueprint,plan', 'gal-ent-4'), alt: 'PLACEHOLDER — project blueprint' },
      { src: img('construction,worker', 'gal-ent-5'), alt: 'PLACEHOLDER — site team at work' },
      { src: img('skyline,building', 'gal-ent-6'), alt: 'PLACEHOLDER — completed structure' },
    ],
    process: [
      { title: 'Planning', description: 'PLACEHOLDER — Scope, budget, and timeline are defined with the client.' },
      { title: 'Design', description: 'PLACEHOLDER — Architectural and engineering plans are developed and approved.' },
      { title: 'Execution', description: 'PLACEHOLDER — Construction proceeds under continuous site supervision.' },
      { title: 'Delivery', description: 'PLACEHOLDER — The finished project is inspected and formally handed over.' },
    ],
    stats: [
      { label: 'Years of Operation', value: 'XX' },
      { label: 'Projects Delivered', value: 'XX', suffix: '+' },
      { label: 'Regions Served', value: 'XX', suffix: '+' },
    ],
  },
}

export default companyData
