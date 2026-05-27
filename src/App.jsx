import { motion, useScroll, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  Monitor, Smartphone, Layers, LayoutGrid, Code2, Globe, Box, Cloud,
  Lightbulb, Server, AppWindow, Brain, Rocket, Sparkles, Zap, Shield,
  ArrowRight, ArrowUp, Menu, X, Mail, Clock, MapPin, ExternalLink,
  Check, Star, Quote, ChevronRight, Send,
} from 'lucide-react'

const T = {
  bg: '#f4f6fb',
  bgRgb: '244,246,251',
  surface: '#ffffff',
  ink: '#0b0f1a',
  onAccent: '#ffffff',
  accent: '#6366f1',
  accentDark: '#4f46e5',
  accentRgb: '99,102,241',
  accentDim: 'rgba(99,102,241,0.14)',
  goldLight: '#818cf8',
  gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
  gradientHover: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #0891b2 100%)',
  gradientSoft: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.08) 50%, rgba(6,182,212,0.1) 100%)',
  muted: '#5b6478',
  faint: '#7c8599',
  faintLow: '#9aa3b5',
  border: 'rgba(15,23,42,0.08)',
  borderHover: 'rgba(99,102,241,0.4)',
  text: '#0b0f1a',
  surfaceSubtle: '#eef1f8',
  surfaceHover: '#e4e9f4',
  radiusSm: 10,
  radiusMd: 14,
  radiusLg: 20,
  radiusPill: 9999,
  shadowSm: '0 2px 10px rgba(15,23,42,0.05)',
  shadowCard: '0 8px 32px -8px rgba(99,102,241,0.18), 0 4px 16px -4px rgba(15,23,42,0.06)',
  shadowGlow: '0 12px 40px -8px rgba(99,102,241,0.45)',
  fontDisplay: "'Space Grotesk', sans-serif",
  fontBody: "'Plus Jakarta Sans', sans-serif",
  fontMono: "'IBM Plex Mono', monospace",
}

const techPills = ['Web & Mobile', 'SaaS Products', 'Design Systems', 'AI & Automation']

const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: ${T.fontBody}; background: ${T.bg}; color: ${T.text}; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
  ::selection { background: rgba(99,102,241,0.2); color: ${T.text}; }
  ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: ${T.bg}; } ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #6366f1, #8b5cf6); border-radius: 6px; }
  .gradient-text { background: ${T.gradient}; -webkit-background-clip: text; background-clip: text; color: transparent; }
  img { max-width: 100%; display: block; }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes slideX { 0%,100% { left:-100%; } 50% { left:100%; } }
  @keyframes pulse-dot { 0%,100% { opacity:0.4; transform:scale(1); } 50% { opacity:1; transform:scale(1.3); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
  .hide-mobile { display: flex; }
  .show-mobile { display: none; align-items: center; justify-content: center; }
  .section-pad { padding-left: 3rem; padding-right: 3rem; max-width: 1280px; margin-left: auto; margin-right: auto; width: 100%; }
  #root, .app-root { width: 100%; max-width: 100vw; overflow-x: hidden; color: ${T.text}; }
  input, select, textarea, button { max-width: 100%; color: ${T.text}; }
  input::placeholder, textarea::placeholder { color: ${T.faintLow}; opacity: 1; }
  a { color: inherit; }

  .nav-brand { font-family: ${T.fontDisplay}; font-size: 1.2rem; font-weight: 700; color: ${T.text}; letter-spacing: -0.02em; line-height: 1.15; }
  .nav-brand-accent { background: ${T.gradient}; -webkit-background-clip: text; background-clip: text; color: transparent; }

  .hero-section { min-height: 100vh; min-height: 100dvh; padding: 0 3rem; display: grid; grid-template-rows: auto 1fr auto; position: relative; overflow-x: hidden; overflow-y: visible; width: 100%; max-width: 100vw; }
  .hero-inner { display: flex; align-items: center; gap: 4rem; padding: 3rem 0; position: relative; z-index: 1; width: 100%; min-width: 0; min-height: 0; }
  .hero-copy { flex: 1; max-width: 720px; min-width: 0; }
  .hero-title { font-family: ${T.fontDisplay}; font-size: clamp(3.25rem, 6.5vw, 5.75rem); font-weight: 700; line-height: 1.02; letter-spacing: -0.04em; color: ${T.text}; margin-bottom: 1.5rem; }
  .hero-stats { flex-shrink: 0; display: flex; flex-direction: column; gap: 1rem; width: 260px; min-width: 0; }
  .hero-bg-orb { position: absolute; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(40px); }
  .hero-bg-orb-1 { top: -15%; left: 50%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 65%); }
  .hero-bg-orb-2 { top: 20%; left: -10%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 65%); }
  .hero-bg-orb-3 { bottom: 5%; right: 5%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%); }
  .hero-eyebrow { display: flex; align-items: center; flex-wrap: wrap; gap: 0.75rem; padding-top: 10rem; position: relative; z-index: 1; }
  .hero-eyebrow-pill { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.4rem 1rem 0.4rem 0.5rem; border-radius: ${T.radiusPill}px; background: ${T.surface}; border: 1px solid ${T.border}; box-shadow: ${T.shadowSm}; font-family: ${T.fontBody}; font-size: 0.8125rem; font-weight: 600; color: ${T.text}; }
  .hero-eyebrow-dot { width: 8px; height: 8px; border-radius: 50%; background: ${T.gradient}; animation: pulse-dot 2.4s ease-in-out infinite; flex-shrink: 0; }
  .hero-cta { display: flex; gap: 0.875rem; flex-wrap: wrap; width: 100%; }
  .hero-cta .hero-btn { flex: 1 1 auto; min-width: 0; justify-content: center; }
  .hero-desc { font-family: ${T.fontBody}; font-size: 1.125rem; font-weight: 400; line-height: 1.7; color: ${T.muted}; max-width: 520px; margin-bottom: 1.5rem; }
  .hero-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; }
  .hero-pill { padding: 0.4rem 0.9rem; border-radius: ${T.radiusPill}px; font-family: ${T.fontBody}; font-size: 0.75rem; font-weight: 600; color: ${T.muted}; background: ${T.surface}; border: 1px solid ${T.border}; box-shadow: ${T.shadowSm}; }
  .hero-stat-card { padding: 1.5rem 1.75rem; border-radius: ${T.radiusLg}px; background: ${T.surface}; border: 1px solid ${T.border}; box-shadow: ${T.shadowCard}; min-width: 0; position: relative; overflow: hidden; }
  .hero-stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: ${T.gradient}; }
  .hero-stat-value { font-family: ${T.fontDisplay}; font-size: 2.5rem; font-weight: 700; letter-spacing: -0.03em; color: ${T.text}; line-height: 1; margin-bottom: 0.375rem; }
  .hero-stat-label { font-family: ${T.fontBody}; font-size: 0.8125rem; font-weight: 600; color: ${T.faint}; }
  .hero-footer { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 0 2.5rem; border-top: 1px solid ${T.border}; position: relative; z-index: 1; width: 100%; gap: 1rem; flex-wrap: wrap; }
  .hero-footer-marquee { overflow: hidden; max-width: 360px; flex: 1; min-width: 0; }
  .page-section { padding: 7rem 3rem; max-width: 1280px; margin: 0 auto; width: 100%; }
  .footer-inner.page-section { padding: 2.5rem 3rem; }

  @media (max-width: 900px) {
    .hide-mobile { display: none !important; }
    .show-mobile { display: flex !important; }
    .show-mobile { flex-shrink: 0; }
    .nav-brand { font-size: 1rem; max-width: calc(100vw - 4.5rem); }
    .nav-brand-accent { font-size: 0.9em; }
    .hero-section { padding: 0 1.25rem 2.5rem; padding-bottom: calc(2.5rem + env(safe-area-inset-bottom, 0px)); min-height: auto; display: flex; flex-direction: column; overflow: visible; }
    .hero-bg-orb { display: none; }
    .hero-eyebrow { padding-top: max(5.75rem, calc(4.5rem + env(safe-area-inset-top, 0px))); gap: 0.5rem 0.75rem; flex-shrink: 0; }
    .hero-eyebrow-text { font-size: 0.625rem; letter-spacing: 0.14em; max-width: 100%; }
    .hero-inner { flex: none; flex-direction: column; align-items: stretch; gap: 2rem; padding: 1.5rem 0 1.5rem; min-height: 0; overflow: visible; }
    .hero-copy { max-width: 100%; flex: none; }
    .hero-title { font-size: clamp(2rem, 10vw, 3.25rem); line-height: 1.15; margin-bottom: 1.25rem; }
    .hero-desc { max-width: 100% !important; font-size: 1rem !important; margin-bottom: 1.75rem !important; }
    .hero-cta { flex-direction: column; }
    .hero-cta .hero-btn { width: 100%; flex: none; }
    .hero-stats { flex-direction: row; flex-wrap: wrap; width: 100%; gap: 0.75rem; }
    .hero-stat-card { flex: 1 1 calc(50% - 0.375rem); min-width: 0; padding: 1rem 1.125rem; }
    .hero-stat-value { font-size: 1.75rem; }
    .hero-desc { max-width: 100%; font-size: 1rem; margin-bottom: 1.75rem; }
    .hero-footer { flex: none; flex-direction: column; align-items: flex-start; padding: 1.25rem 0 0; margin-top: 0.5rem; overflow: visible; }
    .hero-footer-marquee { max-width: 100%; width: 100%; flex: none; min-height: 1.25rem; overflow: hidden; }
    .page-section, .section-pad { padding: 4rem 1.25rem; }
    .footer-inner.page-section { padding: 2rem 1.25rem; }
    .section-header-grid { grid-template-columns: 1fr !important; gap: 1.25rem !important; margin-bottom: 2.5rem !important; }
    .services-grid { grid-template-columns: 1fr !important; }
    .service-card { padding: 2rem 1.25rem !important; }
    .why-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; margin-top: 2.5rem !important; }
    .why-features-grid { grid-template-columns: 1fr !important; }
    .work-header { flex-direction: column !important; align-items: flex-start !important; gap: 1rem !important; margin-bottom: 2rem !important; }
    .work-grid { grid-template-columns: 1fr !important; gap: 1.25rem !important; }
    .process-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1rem !important; margin-top: 2rem !important; }
    .testimonials-grid { grid-template-columns: 1fr !important; }
    .contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; margin-top: 2.5rem !important; }
    .contact-aside { position: static !important; top: auto !important; }
    .form-row { grid-template-columns: 1fr !important; }
    .form-actions { flex-direction: column !important; align-items: stretch !important; gap: 0.75rem !important; }
    .form-actions button { width: 100%; justify-content: center; }
    .footer-inner { flex-direction: column !important; align-items: center !important; text-align: center !important; gap: 1.25rem !important; padding: 2rem 1.25rem !important; }
    .grid-2 { grid-template-columns: 1fr !important; }
    .hero-stats { width: 100% !important; }
    h1, h2, h3, p { overflow-wrap: break-word; word-wrap: break-word; }
  }

  @media (max-width: 480px) {
    .nav-brand { font-size: 0.9rem; }
    .hero-stat-card { flex: 1 1 100% !important; }
    .hero-title { font-size: clamp(1.85rem, 9vw, 2.75rem); line-height: 1.18; }
    .hero-cta .hero-btn { min-height: 48px; }
    .process-grid { grid-template-columns: 1fr !important; }
    .back-to-top { bottom: 1rem !important; right: 1rem !important; }
  }
`

function InjectStyles() {
  useEffect(() => {
    const el = document.createElement('style')
    el.textContent = globalCss
    document.head.appendChild(el)
    return () => document.head.removeChild(el)
  }, [])
  return null
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const fn = () => setMatches(mq.matches)
    fn()
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [query])
  return matches
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const ICON_SIZE = 36
const iconProps = { size: ICON_SIZE, strokeWidth: 1.2, color: T.accent }

function ServiceIcon({ name }) {
  const map = {
    'Website Design': Monitor,
    'Mobile Applications': Smartphone,
    'Custom Product Design': Layers,
    'SaaS Product Design': LayoutGrid,
    'SaaS Development': Code2,
    'iOS Development': Smartphone,
    'Web Development': Globe,
    'Custom Software Development': Box,
    'Cloud Application Development': Cloud,
    'IT Consulting': Lightbulb,
    'Cloud Management': Server,
    'Mobile Application Development': Smartphone,
    'Application Development': AppWindow,
    'AI Development': Brain,
  }
  const Icon = map[name] || Sparkles
  return <Icon {...iconProps} />
}

function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

function GradientAccent({ children, onClick, style }) {
  return (
    <em onClick={onClick} style={{ fontStyle: 'normal', background: T.gradient, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', ...style }}>
      {children}
    </em>
  )
}

function SectionLabel({ text }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.4rem 1rem', borderRadius: T.radiusPill,
        background: T.gradientSoft, border: `1px solid ${T.border}`,
        fontFamily: T.fontMono, fontSize: '0.6875rem', fontWeight: 500,
        letterSpacing: '0.12em', textTransform: 'uppercase', color: T.accentDark,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.gradient }} />
        {text}
      </span>
    </div>
  )
}

const services = [
  { num: '01', title: 'AI Development', desc: 'Intelligent AI-powered solutions that automate workflows, personalize experiences, and drive business growth.' },
  { num: '02', title: 'Custom Software Development', desc: 'Tailored software solutions precisely aligned to your workflows, goals, and operational needs.' },
  { num: '03', title: 'SaaS Development', desc: 'Robust SaaS platforms engineered for scale, speed, and long-term product growth.' },
  { num: '04', title: 'Mobile Applications', desc: 'Fast, intuitive iOS & Android experiences tailored for real user behaviour and delight.' },
  { num: '05', title: 'Cloud Application Development', desc: 'Cloud-native apps designed for resilience, seamless scaling, and reliable deployment.' },
]

const stats = [
  { value: '10+', label: 'Projects Delivered' },
  { value: '1', label: 'Global Clients' },
  { value: '100%', label: 'Satisfaction Rate' },
]

const projects = [
  { title: 'Nexus Shubh Services', category: 'SaaS Product Dev', result: 'Mobile-friendly HRMS built on Next.js — streamlines HR ops end-to-end', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80', grad: 'linear-gradient(135deg, rgba(99,102,241,0.88) 0%, rgba(139,92,246,0.78) 55%, rgba(6,182,212,0.72) 100%)' },
  { title: 'Global CCTV Solutions', category: 'Website', result: 'Full-service CCTV provider — React web presence that drives enquiries', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80', grad: 'linear-gradient(135deg, rgba(15,23,60,0.9) 0%, rgba(30,58,138,0.82) 55%, rgba(14,116,144,0.75) 100%)' },
  { title: 'Chandramukhi Sales', category: 'Website', result: 'Civil construction brand taken fully digital — built with Vite', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80', grad: 'linear-gradient(135deg, rgba(120,53,15,0.88) 0%, rgba(180,83,9,0.78) 55%, rgba(99,102,241,0.65) 100%)' },
]

const clients = ['Stripe', 'Notion', 'Figma', 'Linear', 'Vercel', 'Shopify', 'Airbnb', 'Spotify']

const processSteps = [
  { num: '01', title: 'Discovery', desc: 'We map goals, users, and constraints in a focused kickoff workshop.', icon: Lightbulb },
  { num: '02', title: 'Design', desc: 'Wireframes evolve into polished UI with motion prototypes you can feel.', icon: Layers },
  { num: '03', title: 'Build', desc: 'Engineers ship production code with clean architecture and fast iteration.', icon: Code2 },
  { num: '04', title: 'Launch', desc: 'We deploy, measure, and refine until metrics move in the right direction.', icon: Rocket },
]

const testimonials = [
  { quote: 'Ayana Technologies built our HRMS from the ground up — clean, mobile-friendly, and exactly what our team needed. Exceptional work from start to finish.', name: 'Shubham Adhude', role: 'Founder, Nexus Shubh Services', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&q=80' },
  { quote: 'They understood our security business instantly and delivered a professional web presence that brings in real enquiries every week.', name: 'Rajiv Menon', role: 'Director, Global CCTV Solutions', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80' },
  { quote: 'Our construction business finally looks as strong online as it does on-site. The team was responsive, fast, and detail-oriented.', name: 'Arvind Patil', role: 'Owner, Chandramukhi Sales', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80' },
]

const whyPoints = [
  { title: 'Modern UI systems with pixel-perfect execution', desc: 'Every component is built with precision: spacing, typography, and interaction all harmonised.', icon: Sparkles },
  { title: 'Fast communication & transparent milestones', desc: 'Weekly check-ins, clear deliverables, and no surprises — your roadmap is always visible.', icon: Zap },
  { title: 'Design + development in one unified team', desc: 'No handoff friction. Designers and developers work together from day one to launch.', icon: Shield },
]

const whyFeatures = [
  { icon: Rocket, title: 'Launch-ready', text: 'Products designed with a strategy-led process ready for real users from day one.' },
  { icon: Sparkles, title: 'Motion design', text: 'Smooth, purposeful animation that adds delight and clarity — never just decoration.' },
  { icon: Layers, title: 'Scalable systems', text: 'Design language and component libraries built for long-term product growth.', wide: true },
]

/* ─── NAV ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 900px)')
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
          /* KEY FIX: use left+right auto margins instead of left:50%+translateX */
          left: 0,
          right: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
          zIndex: 90,
          width: 'min(1120px, calc(100% - 2.5rem))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: scrolled ? '0.75rem 1.5rem' : '0.875rem 1.75rem',
          borderRadius: T.radiusPill,
          border: `1px solid ${scrolled ? T.border : 'transparent'}`,
          backdropFilter: 'blur(20px) saturate(1.4)',
          background: scrolled ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.55)',
          boxShadow: scrolled ? T.shadowCard : T.shadowSm,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ textDecoration: 'none', minWidth: 0, flex: '0 0 auto' }}>
          <span className="nav-brand">
            Ayana<span className="nav-brand-accent"> Technologies LLP</span>
          </span>
        </a>

        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          {links.map(l => (
            <a key={l.label} href={l.href}
              style={{ fontFamily: T.fontBody, fontSize: '0.9rem', fontWeight: 500, color: T.muted, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = T.accent}
              onMouseLeave={e => e.target.style.color = T.muted}
            >{l.label}</a>
          ))}
          <a href="#contact" style={{
            fontFamily: T.fontBody, fontSize: '0.875rem', fontWeight: 600,
            padding: '0.65rem 1.35rem',
            background: T.gradient, color: T.onAccent,
            textDecoration: 'none', borderRadius: T.radiusPill,
            boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = T.shadowGlow }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 16px rgba(99,102,241,0.35)' }}
          >Get in Touch</a>
        </div>

        <button type="button" className="show-mobile" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{ background: 'none', border: 'none', color: T.text, cursor: 'pointer', padding: 4, flexShrink: 0 }}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            style={{ position: 'fixed', inset: 0, zIndex: 85, paddingTop: '5.5rem', background: `rgba(${T.bgRgb},0.98)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            {links.map((l, i) => (
              <motion.a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                style={{ fontFamily: T.fontDisplay, fontSize: '1.75rem', color: T.text, textDecoration: 'none' }}>{l.label}</motion.a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} style={{ padding: '0.875rem 2rem', border: `1px solid ${T.accent}`, color: T.accent, textDecoration: 'none', fontFamily: T.fontBody, fontSize: '0.8125rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Get in Touch</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── HERO ─── */
function Hero() {
  const { scrollYProgress } = useScroll()
  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 28, mass: 0.2 })
  const orbY = useTransform(smoothY, [0, 1], [0, -160])
  const orbY2 = useTransform(smoothY, [0, 1], [0, 120])
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 20 })

  return (
    <section className="hero-section">
      <motion.div style={{ scaleX, transformOrigin: '0%', position: 'fixed', top: 0, left: 0, right: 0, height: 3, background: T.gradient, zIndex: 999 }} />
      <motion.div className="hero-bg-orb hero-bg-orb-1" style={{ y: orbY }} />
      <motion.div className="hero-bg-orb hero-bg-orb-2" style={{ y: orbY2 }} />
      <motion.div className="hero-bg-orb hero-bg-orb-3" style={{ y: orbY }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(15,23,42,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,0.06) 1px,transparent 1px)', backgroundSize: '80px 80px', WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 100%)', maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 100%)' }} />
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="hero-eyebrow">
        <span className="hero-eyebrow-pill"><span className="hero-eyebrow-dot" /></span>
      </motion.div>
      <motion.div className="hero-inner">
        <div className="hero-copy">
          <motion.h1 className="hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            We Help Businesses <GradientAccent>Scale</GradientAccent><br />To New Heights
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.45 }} className="hero-desc">
            From standout websites and mobile apps to custom and SaaS product design — we craft premium experiences with modern UI and intentional motion.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.52 }} className="hero-pills">
            {techPills.map(p => <span key={p} className="hero-pill">{p}</span>)}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.58 }} className="hero-cta">
            <HoverButton className="hero-btn" primary onClick={() => scrollTo('contact')}>Start Your Project<ArrowRight size={16} /></HoverButton>
            <HoverButton className="hero-btn" onClick={() => scrollTo('work')}>View Our Work</HoverButton>
          </motion.div>
        </div>
        <div className="hero-stats">
          {stats.map((s, i) => (
            <motion.div className="hero-stat-card" key={s.label} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.5 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}>
              <p className="hero-stat-value">{s.value}</p>
              <p className="hero-stat-label">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div className="hero-footer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 32, height: 1, background: T.border, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, width: '100%', background: T.accent, animation: 'slideX 2.4s ease-in-out infinite', left: '-100%' }} />
          </div>
          <span style={{ fontFamily: T.fontMono, fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: T.faint }}>Scroll to explore</span>
        </div>
        <div className="hero-footer-marquee">
          <div style={{ display: 'flex', gap: '2.5rem', animation: 'marquee 20s linear infinite', fontFamily: T.fontMono, fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: T.faintLow, whiteSpace: 'nowrap' }}>
            {['Website Design', '·', 'Mobile Apps', '·', 'SaaS Design', '·', 'Custom Products', '·', 'Website Design', '·', 'Mobile Apps', '·', 'SaaS Design', '·', 'Custom Products'].map((t, i) => (
              <span key={i} style={t === '·' ? { color: T.accent } : {}}>{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function HoverButton({ children, primary = false, onClick, type = 'button', className = '', disabled = false }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.button type={type} className={className} whileTap={disabled ? {} : { scale: 0.97 }} disabled={disabled}
      onMouseEnter={() => !disabled && setHov(true)} onMouseLeave={() => setHov(false)} onClick={onClick}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.9375rem 2rem', background: primary ? (hov ? T.gradientHover : T.gradient) : (hov ? T.surfaceHover : T.surface), color: primary ? T.onAccent : T.text, fontFamily: T.fontBody, fontSize: '0.9375rem', fontWeight: 600, letterSpacing: '-0.01em', border: primary ? 'none' : `1px solid ${T.border}`, borderRadius: T.radiusPill, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.72 : 1, boxShadow: primary ? (hov ? T.shadowGlow : '0 4px 20px rgba(99,102,241,0.35)') : T.shadowSm, transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }}
    >{children}</motion.button>
  )
}

function MarqueeBand() {
  const items = ['Website Design', '·', 'Mobile Apps', '·', 'SaaS Interfaces', '·', 'Custom Products', '·', 'Motion Design', '·', 'UX Research', '·']
  const doubled = [...items, ...items]
  return (
    <div style={{ overflow: 'hidden', borderTop: T.border, borderBottom: T.border, padding: '1rem 0', background: T.gradientSoft }}>
      <div style={{ display: 'flex', gap: '2.5rem', animation: 'marquee 28s linear infinite', fontFamily: T.fontMono, fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.faintLow, whiteSpace: 'nowrap' }}>
        {doubled.map((t, i) => <span key={i} style={t === '·' ? { color: T.accent, opacity: 0.5 } : {}}>{t}</span>)}
      </div>
    </div>
  )
}

function Services() {
  return (
    <section id="services" className="section-pad page-section">
      <div className="section-header-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-end', marginBottom: '4rem' }}>
        <FadeUp><SectionLabel text="Our Services" /><h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(2rem,4vw,3.25rem)', fontWeight: 600, lineHeight: 1.12, color: T.text, letterSpacing: '-0.02em' }}>Core <GradientAccent style={{ cursor: 'pointer' }} onClick={() => scrollTo('contact')}>disciplines</GradientAccent></h2></FadeUp>
        <FadeUp delay={0.15}><p style={{ fontFamily: T.fontBody, fontSize: '1rem', fontWeight: 300, color: T.muted, lineHeight: 1.75, maxWidth: 400 }}>Premium design and development services built for modern brands and fast-growing startups that demand quality.</p></FadeUp>
      </div>
      <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.25rem' }}>
        {services.map((svc, i) => <ServiceCard key={svc.num} svc={svc} delay={i * 0.1} />)}
      </div>
    </section>
  )
}

function ServiceCard({ svc, delay }) {
  const [hov, setHov] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  return (
    <motion.article className="service-card" ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding: '2.75rem 2.5rem', background: T.surface, transition: 'all 0.3s', position: 'relative', cursor: 'default', borderRadius: T.radiusLg, border: `1px solid ${hov ? T.borderHover : T.border}`, boxShadow: hov ? T.shadowCard : T.shadowSm, transform: hov ? 'translateY(-4px)' : 'translateY(0)' }}>
      <div style={{ fontFamily: T.fontMono, fontSize: '0.6875rem', color: T.accentDark, letterSpacing: '0.15em', marginBottom: '2rem' }}>{svc.num}</div>
      <div style={{ marginBottom: '1.25rem', opacity: hov ? 1 : 0.65, transition: 'opacity 0.3s' }}><ServiceIcon name={svc.title} /></div>
      <h3 style={{ fontFamily: T.fontDisplay, fontSize: '1.375rem', fontWeight: 600, color: T.text, marginBottom: '0.875rem', lineHeight: 1.2 }}>{svc.title}</h3>
      <p style={{ fontFamily: T.fontBody, fontSize: '0.9rem', fontWeight: 300, color: T.muted, lineHeight: 1.7 }}>{svc.desc}</p>
      <motion.div animate={{ rotate: hov ? 45 : 0 }} transition={{ duration: 0.25 }} style={{ position: 'absolute', bottom: '2.25rem', right: '2.25rem', width: 36, height: 36, background: hov ? T.gradient : T.surfaceSubtle, border: `1px solid ${hov ? 'transparent' : T.border}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: hov ? T.onAccent : T.accent, fontSize: '0.875rem', transition: 'all 0.3s', boxShadow: hov ? T.shadowGlow : T.shadowSm }}><ArrowRight size={14} /></motion.div>
    </motion.article>
  )
}

function Why() {
  return (
    <section id="studio" className="section-pad page-section" style={{ borderTop: T.border, borderBottom: T.border, background: T.gradientSoft }}>
      <FadeUp>
        <SectionLabel text="Why Choose Us" />
        <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(2rem,4vw,3.25rem)', fontWeight: 600, lineHeight: 1.12, color: T.text, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Design quality that feels <GradientAccent>premium</GradientAccent></h2>
        <p style={{ fontFamily: T.fontBody, fontSize: '1rem', fontWeight: 300, color: T.muted, lineHeight: 1.75, maxWidth: 480 }}>at every single touchpoint, from first impression to final delivery.</p>
      </FadeUp>
      <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', marginTop: '4rem', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {whyPoints.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.12}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', paddingBottom: i < whyPoints.length - 1 ? '2rem' : 0, borderBottom: i < whyPoints.length - 1 ? T.border : 'none' }}>
                <div style={{ flexShrink: 0, width: 40, height: 40, background: T.gradient, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.onAccent, marginTop: 2, boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}>{(() => { const PointIcon = p.icon; return <PointIcon size={14} strokeWidth={1.5} /> })()}</div>
                <div>
                  <p style={{ fontFamily: T.fontBody, fontSize: '1rem', fontWeight: 500, color: T.text, marginBottom: '0.375rem' }}>{p.title}</p>
                  <p style={{ fontFamily: T.fontBody, fontSize: '0.875rem', fontWeight: 300, color: T.muted, lineHeight: 1.65 }}>{p.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
        <div className="why-features-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {whyFeatures.map((f, i) => (
            <FadeUp key={f.title} delay={0.2 + i * 0.1} style={{ gridColumn: f.wide ? '1/-1' : undefined }}>
              <WhyFeat {...f} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyFeat({ icon: Icon, title, text }) {
  const [hov, setHov] = useState(false)
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding: '2rem', border: `1px solid ${hov ? T.borderHover : T.border}`, borderRadius: T.radiusLg, background: T.surface, transition: 'all 0.3s', cursor: 'default', boxShadow: hov ? T.shadowCard : T.shadowSm, transform: hov ? 'translateY(-3px)' : 'none' }}>
      <motion.div style={{ marginBottom: '1rem', color: T.accent }}><Icon size={24} strokeWidth={1.2} /></motion.div>
      <p style={{ fontFamily: T.fontBody, fontSize: '0.875rem', fontWeight: 500, color: T.text, marginBottom: '0.5rem' }}>{title}</p>
      <p style={{ fontFamily: T.fontBody, fontSize: '0.8125rem', fontWeight: 300, color: T.muted, lineHeight: 1.65 }}>{text}</p>
    </div>
  )
}

function Work() {
  return (
    <section id="work" className="section-pad page-section" style={{ borderTop: T.border }}>
      <div className="work-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3.5rem' }}>
        <FadeUp><SectionLabel text="Portfolio" /><h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(2rem,4vw,3.25rem)', fontWeight: 600, lineHeight: 1.12, color: T.text, letterSpacing: '-0.02em' }}>Featured <GradientAccent>projects</GradientAccent></h2></FadeUp>
        <ExploreLink />
      </div>
      <div className="work-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.5rem' }}>
        {projects.map((p, i) => <ProjectCard key={p.title} project={p} delay={i * 0.1} />)}
      </div>
    </section>
  )
}

function ExploreLink() {
  const [hov, setHov] = useState(false)
  return (
    <a href="#" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: T.fontMono, fontSize: '0.75rem', fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', color: hov ? T.accent : T.faint, textDecoration: 'none', transition: 'color 0.2s' }}>
      All case studies
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
    </a>
  )
}

function ProjectCard({ project, delay }) {
  const [hov, setHov] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  return (
    <motion.article ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ border: `1px solid ${hov ? 'rgba(99,102,241,0.3)' : T.border}`, borderRadius: 8, overflow: 'hidden', background: T.surface, cursor: 'pointer', transition: 'border-color 0.3s, transform 0.35s, box-shadow 0.35s', transform: hov ? 'translateY(-3px)' : 'translateY(0)', boxShadow: hov ? '0 12px 32px rgba(15,23,42,0.1)' : '0 2px 8px rgba(15,23,42,0.05)' }}>
      <div style={{ height: 210, overflow: 'hidden', position: 'relative' }}>
        <motion.div animate={{ scale: hov ? 1.045 : 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ position: 'absolute', inset: 0 }}>
          <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: project.grad, opacity: 0.72 }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.08) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
          <div style={{ position: 'absolute', bottom: 16, left: 16, fontFamily: T.fontMono, fontSize: '0.6875rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', background: 'rgba(0,0,0,0.45)', padding: '0.375rem 0.75rem', borderRadius: 2 }}>{project.category}</div>
        </motion.div>
      </div>
      <div style={{ padding: '1.5rem 1.875rem 2rem' }}>
        <p style={{ fontFamily: T.fontMono, fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: T.accentDark, marginBottom: '0.5rem' }}>{project.category}</p>
        <h3 style={{ fontFamily: T.fontDisplay, fontSize: '1.25rem', fontWeight: 600, color: T.text, marginBottom: '0.625rem' }}>{project.title}</h3>
        <p style={{ fontFamily: T.fontBody, fontSize: '0.8125rem', fontWeight: 300, color: T.muted }}><span style={{ color: T.accentDark, fontWeight: 500 }}>Result: </span>{project.result}</p>
      </div>
    </motion.article>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.'
    if (!form.service) e.service = 'Select a service.'
    if (form.message.trim().length < 20) e.message = 'At least 20 characters required.'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    setSubmitError('')
    if (Object.keys(errs).length) return

    try {
      setIsSubmitting(true)
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        service: form.service,
        message: form.message.trim(),
        submittedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
        website: window.location.origin,
        _subject: `New Website Enquiry: ${form.service} - ${form.name.trim()}`,
        _template: 'table',
        _captcha: 'false',
      }

      const res = await fetch('https://formsubmit.co/ajax/support@ayanatechnologies.in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Failed to submit enquiry')

      setSuccess(true)
      setForm({ name: '', email: '', service: '', message: '' })
    } catch {
      setSubmitError('Unable to send your enquiry right now. Please try again in a moment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-pad page-section" style={{ borderTop: T.border }}>
      <FadeUp><SectionLabel text="Contact Us" /><h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(2rem,4vw,3.25rem)', fontWeight: 600, lineHeight: 1.12, color: T.text, letterSpacing: '-0.02em' }}>Let's build your <GradientAccent>next product</GradientAccent></h2></FadeUp>
      <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '5rem', marginTop: '4rem', alignItems: 'start' }}>
        <FadeUp delay={0.1}>
          <div className="contact-aside" style={{ position: 'sticky', top: '7rem' }}>
            <p style={{ fontFamily: T.fontBody, fontSize: '1rem', fontWeight: 300, color: T.muted, lineHeight: 1.75, marginBottom: '2.5rem' }}>Tell us what you're building and we'll schedule a free 30-minute discovery call to explore the scope together.</p>
            {[{ label: 'Email', val: 'support@ayanatechnologies.in' }, { label: 'Response time', val: 'Within 24 hours' }, { label: 'Based in', val: 'Global · Remote-first' }].map(item => (
              <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingLeft: '1rem', borderLeft: `2px solid rgba(99,102,241,0.3)`, marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: T.fontMono, fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: T.accentDark }}>{item.label}</span>
                <span style={{ fontFamily: T.fontBody, fontSize: '0.9375rem', fontWeight: 300, color: T.muted }}>{item.val}</span>
              </div>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={0.2}>
          {success ? (
            <div style={{ padding: '1.5rem', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 4, background: 'rgba(99,102,241,0.08)', color: T.accentDark, fontFamily: T.fontMono, fontSize: '0.875rem', letterSpacing: '0.04em' }}>
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
                <select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} style={{ width: '100%', background: T.surface, border: `1px solid ${errors.service ? 'rgba(220,100,100,0.5)' : T.border}`, borderRadius: 2, padding: '0.875rem 1.125rem', color: form.service ? T.text : T.faintLow, fontFamily: T.fontBody, fontSize: '0.9375rem', fontWeight: 300, outline: 'none', cursor: 'pointer', transition: 'border-color 0.2s' }} onFocus={e => e.target.style.borderColor = T.accent} onBlur={e => e.target.style.borderColor = errors.service ? 'rgba(220,100,100,0.5)' : T.border}>
                  <option value="" style={{ background: T.surface }}>Select a service</option>
                  {['Website Design', 'Mobile Application', 'Custom Product Design', 'SaaS Product Design'].map(o => <option key={o} value={o} style={{ background: T.surface }}>{o}</option>)}
                </select>
                {errors.service && <p style={{ fontFamily: T.fontMono, fontSize: '0.75rem', color: '#e07070', marginTop: '0.375rem' }}>{errors.service}</p>}
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: T.fontMono, fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: T.faint, marginBottom: '0.5rem' }}>Project Brief</label>
                <textarea rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell us about your idea, timeline, and goals?" style={{ width: '100%', background: T.surface, border: `1px solid ${errors.message ? 'rgba(220,100,100,0.5)' : T.border}`, borderRadius: 2, padding: '0.875rem 1.125rem', color: T.text, fontFamily: T.fontBody, fontSize: '0.9375rem', fontWeight: 300, outline: 'none', resize: 'vertical', minHeight: 130, transition: 'border-color 0.2s' }} onFocus={e => e.target.style.borderColor = T.accent} onBlur={e => e.target.style.borderColor = errors.message ? 'rgba(220,100,100,0.5)' : T.border} />
                {errors.message && <p style={{ fontFamily: T.fontMono, fontSize: '0.75rem', color: '#e07070', marginTop: '0.375rem' }}>{errors.message}</p>}
              </div>
              <div className="form-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.25rem' }}>
                <HoverButton primary type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send Inquiry'}<Send size={16} /></HoverButton>
                <span style={{ fontFamily: T.fontMono, fontSize: '0.6875rem', color: T.faintLow }}>We reply within 24h</span>
              </div>
              {submitError && (
                <p style={{ fontFamily: T.fontMono, fontSize: '0.75rem', color: '#e07070' }}>{submitError}</p>
              )}
            </form>
          )}
        </FadeUp>
      </div>
    </section>
  )
}

function FormField({ label, id, type = 'text', value, onChange, placeholder, error }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label htmlFor={id} style={{ display: 'block', fontFamily: T.fontMono, fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: T.faint, marginBottom: '0.5rem' }}>{label}</label>
      <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={{ width: '100%', background: focused ? 'rgba(99,102,241,0.06)' : T.surface, border: `1px solid ${error ? 'rgba(220,100,100,0.5)' : focused ? T.accent : T.border}`, borderRadius: 2, padding: '0.875rem 1.125rem', color: T.text, fontFamily: T.fontBody, fontSize: '0.9375rem', fontWeight: 300, outline: 'none', transition: 'all 0.2s' }} />
      {error && <p style={{ fontFamily: T.fontMono, fontSize: '0.75rem', color: '#e07070', marginTop: '0.375rem' }}>{error}</p>}
    </div>
  )
}

function ClientLogos() {
  const doubled = [...clients, ...clients]
  return (
    <section style={{ padding: '3rem 0', borderBottom: T.border, overflow: 'hidden' }}>
      <p style={{ textAlign: 'center', fontFamily: T.fontMono, fontSize: '0.6875rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: T.faintLow, marginBottom: '1.5rem' }}>Trusted by innovative teams</p>
      <div style={{ display: 'flex', gap: '4rem', animation: 'marquee 35s linear infinite', whiteSpace: 'nowrap' }}>
        {doubled.map((c, i) => <span key={i} style={{ fontFamily: T.fontDisplay, fontSize: '1.25rem', fontWeight: 600, color: T.faint, letterSpacing: '0.04em' }}>{c}</span>)}
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="process" className="section-pad page-section" style={{ borderTop: T.border }}>
      <FadeUp><SectionLabel text="How We Work" /><h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(2rem,4vw,3.25rem)', fontWeight: 600, lineHeight: 1.12, color: T.text, letterSpacing: '-0.02em' }}>A proven <GradientAccent>process</GradientAccent></h2></FadeUp>
      <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem', marginTop: '3.5rem' }}>
        {processSteps.map((step, i) => {
          const Icon = step.icon
          return (
            <FadeUp key={step.num} delay={i * 0.1}>
              <div style={{ padding: '2rem', border: T.border, borderRadius: 8, background: T.surface, height: '100%', boxShadow: '0 1px 3px rgba(15,23,42,0.05)' }}>
                <Icon size={28} color={T.accent} strokeWidth={1.2} style={{ marginBottom: '1.25rem' }} />
                <p style={{ fontFamily: T.fontMono, fontSize: '0.6875rem', color: T.accentDark, marginBottom: '0.75rem' }}>{step.num}</p>
                <h3 style={{ fontFamily: T.fontDisplay, fontSize: '1.125rem', fontWeight: 600, color: T.text, marginBottom: '0.5rem' }}>{step.title}</h3>
                <p style={{ fontFamily: T.fontBody, fontSize: '0.875rem', fontWeight: 300, color: T.muted, lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            </FadeUp>
          )
        })}
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="section-pad page-section" style={{ borderTop: T.border, background: T.surfaceSubtle }}>
      <FadeUp><SectionLabel text="Testimonials" /><h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(2rem,4vw,3.25rem)', fontWeight: 600, lineHeight: 1.12, color: T.text, letterSpacing: '-0.02em', marginBottom: '3rem' }}>What clients <GradientAccent>say</GradientAccent></h2></FadeUp>
      <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
        {testimonials.map((t, i) => (
          <FadeUp key={t.name} delay={i * 0.1}>
            <div style={{ padding: '2rem', border: T.border, borderRadius: 8, background: T.surface, height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(15,23,42,0.05)' }}>
              <Quote size={24} color={T.accent} style={{ opacity: 0.4, marginBottom: '1rem' }} />
              <p style={{ fontFamily: T.fontBody, fontSize: '0.9375rem', fontWeight: 300, color: T.muted, lineHeight: 1.7, flex: 1, marginBottom: '1.5rem' }}>&ldquo;{t.quote}&rdquo;</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <img src={t.avatar} alt={t.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: T.border }} />
                <div>
                  <p style={{ fontFamily: T.fontBody, fontSize: '0.875rem', fontWeight: 500, color: T.text }}>{t.name}</p>
                  <p style={{ fontFamily: T.fontMono, fontSize: '0.625rem', color: T.accentDark, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t.role}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4, marginTop: '1rem' }}>
                {[1,2,3,4,5].map(n => <Star key={n} size={12} fill={T.accent} color={T.accent} />)}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="back-to-top" aria-label="Back to top"
          style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 80, width: 44, height: 44, borderRadius: '50%', border: `1px solid ${T.border}`, background: T.surface, color: T.accent, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(15,23,42,0.1)' }}>
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

function Footer() {
  return (
    <footer className="footer-inner section-pad page-section" style={{ borderTop: T.border, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontFamily: T.fontDisplay, fontSize: '1rem', fontWeight: 600, color: T.muted }}>Ayana<span style={{ color: T.accent, fontStyle: 'italic' }}> Technologies LLP</span></span>
      <span style={{ fontFamily: T.fontMono, fontSize: '0.6875rem', fontWeight: 300, color: T.faintLow, letterSpacing: '0.06em' }}>© 2025 Ayana Technologies LLP. All rights reserved.</span>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {[{ Icon: X, href: 'https://x.com', label: 'X' }, { Icon: Globe, href: 'https://ayanatechnologies.in', label: 'Website' }, { Icon: ExternalLink, href: 'mailto:support@ayanatechnologies.in', label: 'Email' }].map(({ Icon, href, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{ color: T.faintLow, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = T.accent} onMouseLeave={e => e.currentTarget.style.color = T.faintLow}><Icon size={18} /></a>
        ))}
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="app-root" style={{ background: `${T.gradientSoft}, radial-gradient(ellipse 90% 60% at 100% 0%, rgba(99,102,241,0.12) 0%, transparent 55%), ${T.bg}`, color: T.text, minHeight: '100vh' }}>
      <InjectStyles />
      <Nav />
      <Hero />
      <MarqueeBand />
      <ClientLogos />
      <Services />
      <Why />
      <Process />
      <Work />
      <Testimonials />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  )
}