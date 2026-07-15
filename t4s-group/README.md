# T4S Group — Website Template

A premium, production-ready corporate website template for **T4S Group**, parent
company of **T4S Security** and **T4S Enterprises**.

> ⚠️ **This is a template.** All company statistics, project names, client
> details, and photography are placeholders and are clearly marked
> `PLACEHOLDER` throughout the code and content. Replace them with real,
> verified information before presenting this site publicly.

---

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool & dev server
- **Tailwind CSS** — styling, using a custom T4S design-token palette
- **Framer Motion** — page transitions, scroll reveals, micro-interactions
- **React Router v6** — client-side routing (`/`, `/security`, `/enterprises`)
- **lucide-react** — icon set

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open the printed local URL (usually http://localhost:5173)
```

To build for production:

```bash
npm run build   # outputs to /dist
npm run preview # preview the production build locally
```

---

## Project Structure

```
src/
  components/       Reusable UI building blocks (cards, forms, nav, footer…)
  pages/            One file per route: Landing.tsx, Security.tsx, Enterprises.tsx
  data/
    companyData.ts  ⭐ ALL editable content lives here
  types/
    index.ts        TypeScript shape of companyData.ts — you shouldn't need
                     to touch this unless adding a new kind of content block
  lib/
    utils.ts         className merge helper
    icon-map.ts       maps icon names in companyData.ts to lucide components
  index.css          global styles, design tokens, the "corner-frame" motif
```

The site is intentionally **data-driven**: every page pulls its copy and
images from `src/data/companyData.ts`. You should rarely need to edit a
component file just to change text or a photo.

---

## Editing Content

Open **`src/data/companyData.ts`**. Everything is one typed object:

| What you want to change | Where |
|---|---|
| Group name, logo initials, founding year | top of the file |
| Phone, email, address, map | `contact` |
| Social links | `social` |
| About paragraphs & group timeline | `aboutText`, `timeline` |
| T4S Security content | `security` object |
| T4S Enterprises content | `enterprises` object |

Each sub-company (`security` / `enterprises`) has the same shape:
`heroHeadline`, `services`, `whyUs`, `gallery`, `stats`, plus
`industries` (Security only) and `projects` / `process` (Enterprises only).

### Replacing the logo

The navbar and footer currently render a text mark (`logoText`, default
`"T4S"`) inside a circular gold-outlined badge — no image file required.
To use a real logo image instead:

1. Add your logo file to `public/`, e.g. `public/logo.svg`.
2. In `src/components/Navbar.tsx` and `src/components/Footer.tsx`, replace
   the `<span>` badge markup with an `<img src="/logo.svg" ... />` tag.

### Replacing images

All images are currently sourced from **Unsplash's free placeholder
service** (`source.unsplash.com`) using descriptive search terms — no API
key required, but **not licensed for production use**. Before launch:

1. Source real, licensed photography (or your own).
2. Replace each `heroImage`, `gallery[].src`, `industries[].image`, and
   `projects[].image` value in `companyData.ts` with either:
   - a path into `public/images/...` (recommended for owned assets), or
   - a hosted URL you have rights to use.
3. Keep the existing `alt` text pattern (short, descriptive) for
   accessibility — update the copy, not just the source.

### Editing company information

Update the `contact`, `social`, and `aboutText` fields in
`companyData.ts`. The footer's map embed uses `contact.mapEmbedUrl` — get a
real one from Google Maps → **Share → Embed a map** and paste the `src`
URL from the generated `<iframe>`.

### Adding / editing projects (T4S Enterprises)

Add or edit entries in `enterprises.projects`:

```ts
{
  name: 'Riverside Commercial Tower',
  status: 'Completed', // 'Completed' | 'In Progress' | 'Upcoming'
  location: 'City, Country',
  year: '2024',
  image: '/images/projects/riverside.jpg',
  description: 'One or two sentences describing scope and outcome.',
}
```

### Adding services

Add or edit entries in `security.services` or `enterprises.services`. Each
service needs an `icon` name that exists in `src/lib/icon-map.ts` — either
reuse one of the existing icons or import a new one from `lucide-react` and
register it in that map.

### Stats / counters

Stat values default to the string `'XX'`, which renders as a static
placeholder rather than animating a fabricated number. Once you have a real,
verified figure, replace `'XX'` with a number (e.g. `24`) and it will
animate into view automatically.

---

## Design Tokens

Defined in `tailwind.config.ts` and used throughout the codebase:

| Token | Value | Usage |
|---|---|---|
| `ink` | `#0B0F17` | Page background |
| `ink-raised` | `#0E1420` | Alternate section background |
| `primary` | `#0F4C81` | Corporate blue accents |
| `gold` | `#D4AF37` | Primary accent, CTAs, eyebrow labels |
| `mist` | `#9AA5B1` | Muted body text on dark backgrounds |
| Display font | Fraunces | Headlines |
| Body font | Inter | Paragraph text |
| Mono font | IBM Plex Mono | Eyebrow labels, stats, timestamps |

The recurring gold **corner-bracket frame** (`.corner-frame` in
`index.css`) around images and cards is the site's signature visual motif —
a nod to both a security camera viewfinder and a blueprint registration
mark, tying the two divisions together visually.

---

## Security

This template ships with a baseline security layer — review and extend it
before handling real client data.

### Security headers

`vercel.json` sets a Content-Security-Policy, `X-Frame-Options: DENY`,
`X-Content-Type-Options: nosniff`, a restrictive `Permissions-Policy`, and
HSTS on every response. If you add new external resources (a new font host,
an embedded widget, a different image CDN), you'll need to extend the CSP's
`img-src` / `font-src` / `frame-src` allow-list accordingly, or those
resources will silently fail to load.

### Wiring up the contact form

The contact and quote-request forms submit to a serverless function at
`api/contact.ts` (deployed automatically by Vercel — no extra setup needed
for the endpoint itself). It currently:

- Rejects anything that isn't a POST request
- Silently discards spam caught by a honeypot field
- Validates name / email / message server-side (never trust client JS alone)
- Rate-limits by IP (see caveat below)
- Sends email via [Resend](https://resend.com) once configured

**To enable real email delivery:**

1. Create a free [Resend](https://resend.com) account and verify a sending
   domain (or use their test domain while developing)
2. In Vercel: **Project → Settings → Environment Variables**, add:
   - `RESEND_API_KEY` — from your Resend dashboard
   - `CONTACT_TO_EMAIL` — the inbox that should receive submissions
3. Redeploy

Until those variables are set, the form still works end-to-end (validates,
responds with success) but submissions are only logged server-side, not
emailed — useful for testing the UI without setting up email first.

> ⚠️ The in-memory rate limiter in `api/contact.ts` resets on every cold
> start and isn't shared across concurrent function instances — it stops
> casual/burst spam but isn't sufficient alone at real scale. For
> production-grade protection, add [Upstash Redis](https://upstash.com)
> (has a free tier, integrates directly with Vercel) or a captcha
> (hCaptcha / Cloudflare Turnstile) on top of the honeypot.

### Dependency scanning

`.github/dependabot.yml` opens weekly PRs for outdated/vulnerable npm
packages. Also turn on **Dependabot alerts** under your repo's
**Settings → Code security and analysis** for real-time notifications
between scheduled runs. Run `npm audit` locally any time for an on-demand
check.

---

## Deployment

This is a static Vite build — deploy the `/dist` folder to any static host:

- **Vercel / Netlify**: connect the repo, build command `npm run build`,
  output directory `dist`. Both auto-detect Vite.
- **Any static host** (S3, Cloudflare Pages, GitHub Pages, etc.): run
  `npm run build` locally or in CI, then upload the contents of `/dist`.

If deploying to a sub-path (not the domain root), set `base` in
`vite.config.ts` accordingly.

---

## Before Going Live — Checklist

- [ ] Replace all `PLACEHOLDER` text in `companyData.ts`
- [ ] Replace all placeholder Unsplash images with licensed photography
- [ ] Replace `'XX'` stat values with real, verified numbers
- [ ] Add a real Google Maps embed URL
- [ ] Wire the contact / quote forms (`ContactForm.tsx`) to a real backend
      or form service (e.g. Formspree, a serverless function)
- [ ] Add real social media URLs
- [ ] Add a real privacy policy & terms of service page (currently `#` links
      in the footer)
- [ ] Confirm the legal entity name in the footer copyright line
- [ ] Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` in Vercel and verify a
      real sending domain in Resend
- [ ] Enable Dependabot alerts in repo settings
- [ ] Consider adding a captcha or Upstash-backed rate limiting if you
      expect meaningful traffic
- [ ] Review the CSP allow-list in `vercel.json` against your final
      image/font/embed sources
