import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Send, AlertCircle, Loader2 } from 'lucide-react'
import { Reveal } from './Reveal'

interface ContactFormProps {
  title?: string
  description?: string
  serviceOptions?: string[]
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm({
  title = 'Request a Quote',
  description = 'Tell us about your requirements and a member of our team will be in touch.',
  serviceOptions,
}: ContactFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Something went wrong. Please try again.')
      }

      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="glass corner-frame relative rounded-xl2 p-8 sm:p-10">
      <span className="cf-tr" />
      <span className="cf-bl" />

      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <CheckCircle2 className="text-gold" size={40} strokeWidth={1.5} />
          <h3 className="mt-5 font-display text-xl text-white">Thank you</h3>
          <p className="mt-2 max-w-sm text-sm text-mist">
            Your request has been received. A member of our team will contact you shortly.
          </p>
        </motion.div>
      ) : (
        <>
          <Reveal>
            <h3 className="font-display text-2xl text-white">{title}</h3>
            <p className="mt-2 text-sm text-mist">{description}</p>
          </Reveal>

          <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Honeypot — hidden from real users via off-screen positioning
                (not display:none, which some bots detect and skip). Real
                visitors never see or fill this in; anything filled here is
                treated as spam by the API. */}
            <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="company_website">Leave this field empty</label>
              <input type="text" id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
            </div>

            <Field label="Full Name" name="name" required />
            <Field label="Company" name="company" />
            <Field label="Email" name="email" type="email" required />
            <Field label="Phone" name="phone" type="tel" />

            {serviceOptions && (
              <div className="sm:col-span-2">
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-mist">
                  Service of Interest
                </label>
                <select
                  name="service"
                  className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white focus:border-gold/50 focus:outline-none"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s} className="bg-ink">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-mist">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                required
                maxLength={5000}
                className="w-full resize-none rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-mist/50 focus:border-gold/50 focus:outline-none"
                placeholder="Tell us about your requirements..."
              />
            </div>

            {status === 'error' && (
              <div className="sm:col-span-2 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary shine w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {status === 'submitting' ? (
                  <>
                    Sending
                    <Loader2 size={15} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Submit Request
                    <Send size={15} />
                  </>
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-mist">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-mist/50 focus:border-gold/50 focus:outline-none"
      />
    </div>
  )
}
