import type { VercelRequest, VercelResponse } from '@vercel/node'

// ---------------------------------------------------------------------------
// POST /api/contact
//
// Handles submissions from every form on the site (general contact, T4S
// Security quote requests, T4S Enterprises project inquiries).
//
// SECURITY MEASURES:
//  1. Method + Content-Type enforcement
//  2. Honeypot field ("company_website") — real users never fill it in;
//     bots that auto-fill every field do, so a filled honeypot is silently
//     rejected without revealing that a check occurred.
//  3. Server-side field validation (never trust client-side validation alone)
//  4. Basic in-memory rate limiting per IP
//  5. Email delivery via Resend, config via environment variable — no
//     secrets are ever hardcoded or shipped to the client
//
// SETUP REQUIRED — see README.md "Wiring Up the Contact Form":
//   1. Create a free account at https://resend.com
//   2. Add RESEND_API_KEY and CONTACT_TO_EMAIL as environment variables
//      in your Vercel project settings (Settings → Environment Variables)
//   3. Redeploy
//
// Until those env vars are set, submissions are validated and logged
// server-side but no email is sent — the API responds successfully so the
// UI can be tested end-to-end before email delivery is configured.
// ---------------------------------------------------------------------------

const RATE_LIMIT_WINDOW_MS = 60_000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5

// NOTE: this in-memory store resets whenever the serverless function cold-starts,
// and is NOT shared across concurrent instances. It stops naive/burst spam
// but is not a substitute for a real rate limiter at scale. For production-grade
// protection, replace this with Upstash Redis (https://upstash.com) or
// Vercel's own rate limiting / firewall rules.
const requestLog = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  timestamps.push(now)
  requestLog.set(ip, timestamps)
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

interface ContactPayload {
  name?: string
  email?: string
  phone?: string
  company?: string
  service?: string
  message?: string
  company_website?: string // honeypot — should always be empty
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown'

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again in a minute.' })
  }

  const body = req.body as ContactPayload

  // Honeypot check — bots fill every field; real users never see this one.
  if (body.company_website) {
    // Respond as if successful so the bot doesn't learn the check failed.
    return res.status(200).json({ ok: true })
  }

  const name = (body.name ?? '').trim()
  const email = (body.email ?? '').trim()
  const message = (body.message ?? '').trim()

  if (!name || name.length > 200) {
    return res.status(400).json({ error: 'Please provide a valid name.' })
  }
  if (!email || !isValidEmail(email) || email.length > 320) {
    return res.status(400).json({ error: 'Please provide a valid email address.' })
  }
  if (!message || message.length > 5000) {
    return res.status(400).json({ error: 'Please provide a message (under 5000 characters).' })
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL

  if (!resendApiKey || !toEmail) {
    // Not configured yet — log server-side so submissions aren't silently lost,
    // and let the frontend show a success state during development/testing.
    console.log('[contact] RESEND_API_KEY / CONTACT_TO_EMAIL not set. Submission:', {
      name,
      email,
      phone: body.phone,
      company: body.company,
      service: body.service,
      message,
    })
    return res.status(200).json({ ok: true, delivered: false })
  }

  try {
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // PLACEHOLDER — use a domain you've verified with Resend
        from: 'T4S Group Website <website@t4sgroup.example>',
        to: [toEmail],
        reply_to: email,
        subject: `New inquiry from ${name}${body.service ? ` — ${body.service}` : ''}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          body.phone ? `Phone: ${body.phone}` : null,
          body.company ? `Company: ${body.company}` : null,
          body.service ? `Service: ${body.service}` : null,
          '',
          message,
        ]
          .filter(Boolean)
          .join('\n'),
      }),
    })

    if (!emailResponse.ok) {
      console.error('[contact] Resend API error:', await emailResponse.text())
      return res.status(502).json({ error: 'Unable to send your message right now. Please try again shortly.' })
    }

    return res.status(200).json({ ok: true, delivered: true })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return res.status(500).json({ error: 'Something went wrong. Please try again shortly.' })
  }
}
