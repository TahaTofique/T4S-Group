import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Send } from 'lucide-react'
import { Reveal } from './Reveal'

interface ContactFormProps {
  title?: string
  description?: string
  serviceOptions?: string[]
}

export function ContactForm({
  title = 'Request a Quote',
  description = 'Tell us about your requirements and a member of our team will be in touch.',
  serviceOptions,
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // PLACEHOLDER — wire this up to a real endpoint (e.g. Formspree, your
    // own API route, or a serverless function) before launch.
    setSubmitted(true)
  }

  return (
    <div className="glass corner-frame relative rounded-xl2 p-8 sm:p-10">
      <span className="cf-tr" />
      <span className="cf-bl" />

      {submitted ? (
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
                className="w-full resize-none rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-mist/50 focus:border-gold/50 focus:outline-none"
                placeholder="Tell us about your requirements..."
              />
            </div>

            <div className="sm:col-span-2">
              <button type="submit" className="btn-primary w-full sm:w-auto">
                Submit Request
                <Send size={15} />
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
