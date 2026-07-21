import { useState } from 'react'
import { Check, Send } from 'lucide-react'

const T = {
  surface: '#0F1629',
  accent: '#22D3EE',
  accentDark: '#0EA5C9',
  gradient: 'linear-gradient(135deg, #22D3EE 0%, #818CF8 100%)',
  gradientHover: 'linear-gradient(135deg, #0EA5C9 0%, #6366F1 100%)',
  gradientSoft: 'linear-gradient(135deg, rgba(34,211,238,0.12) 0%, rgba(129,140,248,0.08) 100%)',
  muted: '#8892A8',
  faint: '#505A72',
  faintLow: '#3D4560',
  border: 'rgba(255,255,255,0.07)',
  text: '#EDF0FF',
  onAccent: '#08091A',
  surfaceHover: '#1A2040',
  shadowSm: '0 2px 10px rgba(0,0,0,0.3)',
  shadowGlow: '0 12px 40px -8px rgba(34,211,238,0.4)',
  radiusPill: 9999,
  fontDisplay: "'Space Grotesk', sans-serif",
  fontBody: "'Plus Jakarta Sans', sans-serif",
  fontMono: "'IBM Plex Mono', monospace",
}

type FormState = { name: string; email: string; service: string; message: string }
type Errors = Partial<FormState>

function FormField({ label, id, type = 'text', value, onChange, placeholder, error }: {
  label: string; id: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder: string; error?: string
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label htmlFor={id} style={{ display: 'block', fontFamily: T.fontMono, fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: T.faint, marginBottom: '0.5rem' }}>{label}</label>
      <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: '100%', background: focused ? 'rgba(34,211,238,0.06)' : T.surface, border: `1px solid ${error ? 'rgba(220,100,100,0.5)' : focused ? T.accent : T.border}`, borderRadius: 2, padding: '0.875rem 1.125rem', color: T.text, fontFamily: T.fontBody, fontSize: '0.9375rem', fontWeight: 300, outline: 'none', transition: 'all 0.2s' }}
      />
      {error && <p style={{ fontFamily: T.fontMono, fontSize: '0.75rem', color: '#e07070', marginTop: '0.375rem' }}>{error}</p>}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', service: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validate = (): Errors => {
    const e: Errors = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.'
    if (!form.service) e.service = 'Select a service.'
    if (form.message.trim().length < 20) e.message = 'At least 20 characters required.'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    setSubmitError('')
    if (Object.keys(errs).length) return

    try {
      setIsSubmitting(true)
      const res = await fetch('https://formsubmit.co/ajax/support@ayanatechnologies.in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          service: form.service,
          message: form.message.trim(),
          submittedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
          website: window.location.origin,
          _subject: `New Website Enquiry: ${form.service} - ${form.name.trim()}`,
          _template: 'table',
          _captcha: 'false',
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setSuccess(true)
      setForm({ name: '', email: '', service: '', message: '' })
    } catch {
      setSubmitError('Unable to send your enquiry right now. Please try again in a moment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-pad page-section" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="fade-up">
        <div style={{ marginBottom: '1.25rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: T.radiusPill, background: T.gradientSoft, border: '1px solid rgba(34,211,238,0.2)', fontFamily: T.fontMono, fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.accentDark }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.gradient }} />
            Contact Us
          </span>
        </div>
        <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(2rem,4vw,3.25rem)', fontWeight: 600, lineHeight: 1.12, color: T.text, letterSpacing: '-0.02em' }}>
          Let&apos;s build your <em style={{ fontStyle: 'normal', background: T.gradient, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>next AI product</em>
        </h2>
      </div>

      <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '5rem', marginTop: '4rem', alignItems: 'start' }}>
        <div className="contact-aside fade-up" style={{ position: 'sticky', top: '7rem' }}>
          <p style={{ fontFamily: T.fontBody, fontSize: '1rem', fontWeight: 300, color: T.muted, lineHeight: 1.75, marginBottom: '2.5rem' }}>Tell us what you're building and we'll schedule a free 30-minute AI strategy call to explore the scope together.</p>
          {[
            { label: 'Email', val: 'support@ayanatechnologies.in' },
            { label: 'Response time', val: 'Within 48 hours' },
            { label: 'Headquarters', val: 'Pune, India' },
            { label: 'Reach', val: 'Global · Remote-first' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingLeft: '1rem', borderLeft: '2px solid rgba(34,211,238,0.3)', marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: T.fontMono, fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: T.accentDark }}>{item.label}</span>
              <span style={{ fontFamily: T.fontBody, fontSize: '0.9375rem', fontWeight: 300, color: T.muted }}>{item.val}</span>
            </div>
          ))}
        </div>

        <div className="fade-up delay-1">
          {success ? (
            <div style={{ padding: '1.5rem', border: '1px solid rgba(34,211,238,0.25)', borderRadius: 4, background: 'rgba(34,211,238,0.08)', color: T.accent, fontFamily: T.fontMono, fontSize: '0.875rem', letterSpacing: '0.04em' }}>
              <Check size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} /> Thank you! Your enquiry has been sent to our support team.
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormField label="Name" id="name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Your full name" error={errors.name} />
                <FormField label="Email" id="email" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} placeholder="you@example.com" error={errors.email} />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: T.fontMono, fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: T.faint, marginBottom: '0.5rem' }}>Service Needed</label>
                <select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                  style={{ width: '100%', background: T.surface, border: `1px solid ${errors.service ? 'rgba(220,100,100,0.5)' : T.border}`, borderRadius: 2, padding: '0.875rem 1.125rem', color: form.service ? T.text : T.faintLow, fontFamily: T.fontBody, fontSize: '0.9375rem', fontWeight: 300, outline: 'none', cursor: 'pointer', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = T.accent}
                  onBlur={e => e.target.style.borderColor = errors.service ? 'rgba(220,100,100,0.5)' : T.border}
                >
                  <option value="">Select a service</option>
                  {['AI Development', 'Custom Software', 'SaaS Product', 'Mobile Application', 'Cloud Infrastructure'].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                {errors.service && <p style={{ fontFamily: T.fontMono, fontSize: '0.75rem', color: '#e07070', marginTop: '0.375rem' }}>{errors.service}</p>}
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: T.fontMono, fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: T.faint, marginBottom: '0.5rem' }}>Project Brief</label>
                <textarea rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell us about your idea, the problem you're solving, and your timeline."
                  style={{ width: '100%', background: T.surface, border: `1px solid ${errors.message ? 'rgba(220,100,100,0.5)' : T.border}`, borderRadius: 2, padding: '0.875rem 1.125rem', color: T.text, fontFamily: T.fontBody, fontSize: '0.9375rem', fontWeight: 300, outline: 'none', resize: 'vertical', minHeight: 130, transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = T.accent}
                  onBlur={e => e.target.style.borderColor = errors.message ? 'rgba(220,100,100,0.5)' : T.border}
                />
                {errors.message && <p style={{ fontFamily: T.fontMono, fontSize: '0.75rem', color: '#e07070', marginTop: '0.375rem' }}>{errors.message}</p>}
              </div>
              <div className="form-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.25rem' }}>
                <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ border: 'none' }}>
                  {isSubmitting ? 'Sending...' : 'Send Enquiry'}<Send size={16} />
                </button>
                <span style={{ fontFamily: T.fontMono, fontSize: '0.6875rem', color: T.faintLow }}>We reply within 48h</span>
              </div>
              {submitError && <p style={{ fontFamily: T.fontMono, fontSize: '0.75rem', color: '#e07070' }}>{submitError}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
