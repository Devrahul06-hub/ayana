import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const T = {
  accent: '#22D3EE',
  muted: '#8892A8',
  text: '#EDF0FF',
  border: 'rgba(255,255,255,0.07)',
  gradient: 'linear-gradient(135deg, #22D3EE 0%, #818CF8 100%)',
  onAccent: '#08091A',
  shadowCard: '0 8px 32px -8px rgba(34,211,238,0.15), 0 4px 16px -4px rgba(0,0,0,0.5)',
  shadowSm: '0 2px 10px rgba(0,0,0,0.3)',
  shadowGlow: '0 12px 40px -8px rgba(34,211,238,0.4)',
  bgRgb: '8,9,26',
  fontBody: "'Plus Jakarta Sans', sans-serif",
  fontDisplay: "'Space Grotesk', sans-serif",
  fontMono: "'IBM Plex Mono', monospace",
  radiusPill: 9999,
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Studio', href: '#studio' },
    { label: 'Process', href: '#process' },
  ]

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')
    const fn = () => setIsMobile(mq.matches)
    fn()
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: scrolled ? 12 : 20,
          left: 0, right: 0,
          marginLeft: 'auto', marginRight: 'auto',
          zIndex: 90,
          width: 'min(1120px, calc(100% - 2.5rem))',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: scrolled ? '0.75rem 1.5rem' : '0.875rem 1.75rem',
          borderRadius: T.radiusPill,
          border: `1px solid ${scrolled ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.05)'}`,
          backdropFilter: 'blur(20px) saturate(1.4)',
          background: scrolled ? `rgba(${T.bgRgb},0.92)` : `rgba(${T.bgRgb},0.5)`,
          boxShadow: scrolled ? T.shadowCard : T.shadowSm,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <a href="/" style={{ textDecoration: 'none', minWidth: 0, flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <img src="/ayana_logo.png" alt="Ayana logo" width={32} height={32} style={{ flexShrink: 0, objectFit: 'contain' }} />
          <span className="nav-brand">
            Ayana<span className="nav-brand-accent"> Technologies LLP</span>
          </span>
        </a>

        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          {links.map(l => (
            <a key={l.label} href={l.href}
              style={{ fontFamily: T.fontBody, fontSize: '0.9rem', fontWeight: 500, color: T.muted, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.target as HTMLAnchorElement).style.color = T.accent}
              onMouseLeave={e => (e.target as HTMLAnchorElement).style.color = T.muted}
            >{l.label}</a>
          ))}
          <a href="#contact" style={{
            fontFamily: T.fontBody, fontSize: '0.875rem', fontWeight: 700,
            padding: '0.65rem 1.35rem',
            background: T.gradient, color: T.onAccent,
            textDecoration: 'none', borderRadius: T.radiusPill,
            boxShadow: '0 4px 16px rgba(34,211,238,0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { const el = e.target as HTMLAnchorElement; el.style.transform = 'translateY(-1px)'; el.style.boxShadow = T.shadowGlow }}
            onMouseLeave={e => { const el = e.target as HTMLAnchorElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 4px 16px rgba(34,211,238,0.3)' }}
          >Book a call</a>
        </div>

        <button
          type="button"
          className="show-mobile"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{ background: 'none', border: 'none', color: T.text, cursor: 'pointer', padding: 4, flexShrink: 0 }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 85,
              paddingTop: '5.5rem',
              background: `rgba(${T.bgRgb},0.98)`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem',
            }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{ fontFamily: T.fontDisplay, fontSize: '1.75rem', color: T.text, textDecoration: 'none' }}
              >
                {l.label}
              </motion.a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              style={{ padding: '0.875rem 2rem', border: `1px solid rgba(34,211,238,0.4)`, color: T.accent, textDecoration: 'none', fontFamily: T.fontBody, fontSize: '0.8125rem', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: T.radiusPill }}
            >Book a call</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
