import { motion, useScroll, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  Monitor, Smartphone, Layers, LayoutGrid, Code2, Globe, Box, Cloud,
  Lightbulb, Server, AppWindow, Brain, Rocket, Sparkles, Zap, Shield,
  ArrowRight, ArrowUp, Menu, X, Mail, Clock, MapPin, ExternalLink,
  Check, Star, Quote, ChevronRight, Send,
} from 'lucide-react'

/* ?????????????????????????????????????????
   DESIGN TOKENS
????????????????????????????????????????? */
const T = {
  ink: '#0a0a0f',
  paper: '#f5f3ee',
  accent: '#c8a96e',
  accentDim: 'rgba(200,169,110,0.4)',
  goldLight: '#f0d89a',
  muted: 'rgba(232,228,220,0.55)',
  border: 'rgba(255,255,255,0.07)',
  borderHover: 'rgba(200,169,110,0.3)',
  text: '#f0ece3',
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontBody: "'DM Sans', sans-serif",
  fontMono: "'DM Mono', monospace",
}

/* ?????????????????????????????????????????
   GLOBAL STYLES (injected once)
????????????????????????????????????????? */
const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: #0a0a0f; color: #e8e4dc; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
  ::selection { background: rgba(200,169,110,0.35); color: #f0ece3; }
  ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0a0a0f; } ::-webkit-scrollbar-thumb { background: #c8a96e44; border-radius: 2px; }
  img { max-width: 100%; display: block; }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes slideX { 0%,100% { left:-100%; } 50% { left:100%; } }
  @keyframes pulse-dot { 0%,100% { opacity:0.4; transform:scale(1); } 50% { opacity:1; transform:scale(1.3); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
  .hide-mobile { display: flex; }
  .show-mobile { display: none; }
  @media (max-width: 900px) {
    .hide-mobile { display: none !important; }
    .show-mobile { display: flex !important; }
    .grid-2 { grid-template-columns: 1fr !important; }
    .grid-hero { grid-template-columns: 1fr !important; }
    .grid-contact { grid-template-columns: 1fr !important; }
    .section-pad { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
    .nav-pad { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
    .hero-stats { display: none !important; }
    .hero-visual { display: none !important; }
    .services-grid { grid-template-columns: 1fr !important; }
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
const iconProps = { size: ICON_SIZE, strokeWidth: 1.2, color: '#c8a96e' }

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

/* ?????????????????????????????????????????
   REUSABLE: FadeUp
????????????????????????????????????????? */
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

/* ?????????????????????????????????????????
   SECTION LABEL
????????????????????????????????????????? */
function SectionLabel({ text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.25rem' }}>
      <div style={{ width: 36, height: 1, background: T.accent }} />
      <span style={{ fontFamily: T.fontMono, fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: T.accent }}>
        {text}
      </span>
    </div>
  )
}

/* ?????????????????????????????????????????
   DATA
????????????????????????????????????????? */
const services = [
  { num: '01', title: 'Website Design', desc: 'High-converting websites crafted with strategy, premium visuals, and polished micro-interactions.' },
  { num: '02', title: 'Mobile Applications', desc: 'Fast, intuitive iOS & Android experiences tailored for real user behavior and delight.' },
  { num: '03', title: 'Custom Product Design', desc: 'End-to-end product design: research, UX flows, to production-ready UI systems.' },
  { num: '04', title: 'SaaS Product Design', desc: 'Scalable SaaS interfaces with clean information architecture and frictionless onboarding.' },
  { num: '05', title: 'SaaS Development', desc: 'Robust SaaS platforms engineered for scale, speed, and long-term product growth.' },
  { num: '06', title: 'iOS Development', desc: 'Native and cross-platform iOS apps built for performance, usability, and reliability.' },
  { num: '07', title: 'Web Development', desc: 'Conversion-focused web experiences with clean code, responsive layouts, and modern tooling.' },
  { num: '08', title: 'Custom Software Development', desc: 'Tailored software solutions aligned to your workflows, goals, and operational needs.' },
  { num: '09', title: 'Cloud Application Development', desc: 'Cloud-native apps designed for resilience, seamless scaling, and reliable deployment.' },
  { num: '10', title: 'IT Consulting', desc: 'Strategic technology consulting to help you make confident architecture and scaling decisions.' },
  { num: '11', title: 'Cloud Management', desc: 'End-to-end cloud operations management focused on uptime, cost efficiency, and security.' },
  { num: '12', title: 'Mobile Application Development', desc: 'Full-cycle mobile app development from product strategy and UX to launch and iteration.' },
  { num: '13', title: 'Application Development', desc: 'Custom application development for web, mobile, and cloud-first business products.' },
  { num: '14', title: 'AI Development', desc: 'Intelligent AI-powered solutions that automate workflows, personalize experiences, and drive growth.' },
]

const stats = [
  { value: '120+', label: 'Projects Delivered' },
  { value: '50+', label: 'Global Clients' },
  { value: '98%', label: 'Satisfaction Rate' },
]

const projects = [
  { title: 'NeonPay SaaS Dashboard', category: 'SaaS Product Design', result: '+38% trial-to-paid conversion', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80', grad: 'linear-gradient(135deg,#1a1030 0%,#2d1060 55%,#0d2050 100%)' },
  { title: 'Luna Commerce Website', category: 'Website Design', result: '+52% engagement on landing pages', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80', grad: 'linear-gradient(135deg,#0a2010 0%,#0f4020 55%,#182a10 100%)' },
  { title: 'PulseFit Mobile App', category: 'Mobile Application', result: '4.8★ app rating after redesign', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80', grad: 'linear-gradient(135deg,#200a10 0%,#401020 55%,#200a30 100%)' },
  { title: 'WorkflowOS Internal Tool', category: 'Custom Product Design', result: 'Reduced task time by 41%', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80', grad: 'linear-gradient(135deg,#0a1020 0%,#102030 55%,#1a1510 100%)' },
]

const clients = ['Stripe', 'Notion', 'Figma', 'Linear', 'Vercel', 'Shopify', 'Airbnb', 'Spotify']

const processSteps = [
  { num: '01', title: 'Discovery', desc: 'We map goals, users, and constraints in a focused kickoff workshop.', icon: Lightbulb },
  { num: '02', title: 'Design', desc: 'Wireframes evolve into polished UI with motion prototypes you can feel.', icon: Layers },
  { num: '03', title: 'Build', desc: 'Engineers ship production code with clean architecture and fast iteration.', icon: Code2 },
  { num: '04', title: 'Launch', desc: 'We deploy, measure, and refine until metrics move in the right direction.', icon: Rocket },
]

const testimonials = [
  { quote: 'Forma transformed our SaaS onboarding. Conversion jumped 38% in the first month.', name: 'Sarah Chen', role: 'CEO, NeonPay', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80' },
  { quote: 'The team delivered a stunning mobile experience. Our App Store rating went from 3.2 to 4.8.', name: 'Marcus Webb', role: 'Founder, PulseFit', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80' },
  { quote: 'Finally, a studio that speaks both design and engineering. Zero handoff friction.', name: 'Elena Rossi', role: 'Product Lead, WorkflowOS', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80' },
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

/* ?????????????????????????????????????????
   NAV
????????????????????????????????????????? */
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
        className="nav-pad"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 90,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: scrolled ? '0.875rem 3rem' : '1.375rem 3rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(24px)',
          background: scrolled ? 'rgba(10,10,15,0.92)' : 'rgba(10,10,15,0.6)',
          transition: 'padding 0.4s ease, background 0.4s ease',
        }}
      >
        <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: T.fontDisplay, fontSize: '1.25rem', fontWeight: 600, color: T.text, letterSpacing: '0.04em' }}>
            Forma<span style={{ color: T.accent, fontStyle: 'italic' }}>.</span>
          </span>
        </a>

        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          {links.map(l => (
            <a key={l.label} href={l.href}
              style={{ fontFamily: T.fontBody, fontSize: '0.8rem', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = T.accent}
              onMouseLeave={e => e.target.style.color = 'rgba(232,228,220,0.55)'}
            >{l.label}</a>
          ))}
          <a href="#contact" style={{
            fontFamily: T.fontBody, fontSize: '0.75rem', fontWeight: 500,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '0.6rem 1.5rem',
            border: `1px solid ${T.accent}`, color: T.accent,
            textDecoration: 'none', borderRadius: 2, transition: 'all 0.25s',
          }}
            onMouseEnter={e => { e.target.style.background = T.accent; e.target.style.color = T.ink }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = T.accent }}
          >Get in Touch</a>
        </div>

        <button type="button" className="show-mobile" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{ background: 'none', border: 'none', color: T.text, cursor: 'pointer', padding: 4 }}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            style={{ position: 'fixed', inset: 0, zIndex: 85, paddingTop: '5.5rem', background: 'rgba(10,10,15,0.98)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
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

/* ?????????????????????????????????????????
   HERO
????????????????????????????????????????? */
function Hero() {
  const { scrollYProgress } = useScroll()
  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 28, mass: 0.2 })
  const orbY = useTransform(smoothY, [0, 1], [0, -160])
  const orbY2 = useTransform(smoothY, [0, 1], [0, 120])
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 20 })

  return (
    <section style={{ minHeight: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr auto', padding: '0 3rem', position: 'relative', overflow: 'hidden' }}>
      {/* Progress */}
      <motion.div style={{ scaleX, transformOrigin: '0%', position: 'fixed', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${T.accent}, ${T.goldLight})`, zIndex: 999 }} />

      {/* Bg orbs */}
      <motion.div style={{ y: orbY, position: 'absolute', top: '-10%', left: '55%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,169,110,0.07) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <motion.div style={{ y: orbY2, position: 'absolute', top: '30%', left: '-5%', width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(100,80,200,0.05) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Grid lines */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)',
        backgroundSize: '80px 80px',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 100%)',
        maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 100%)',
      }} />

      {/* Eyebrow */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
        style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '9rem', position: 'relative', zIndex: 1 }}
      >
        <div style={{ width: 36, height: 1, background: T.accent }} />
        <span style={{ fontFamily: T.fontMono, fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: T.accent }}>
          Premium Digital Design Studio
        </span>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.accent, animation: 'pulse-dot 2.4s ease-in-out infinite' }} />
      </motion.div>

      {/* Main content */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4rem', padding: '3rem 0', position: 'relative', zIndex: 1 }}>
        <div style={{ flex: 1, maxWidth: 700 }}>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(3.5rem,7vw,6.5rem)', fontWeight: 600, lineHeight: 1.06, letterSpacing: '-0.02em', color: T.text, marginBottom: '2rem' }}
          >
            We Build <em style={{ fontStyle: 'italic', color: T.accent }}>Modern</em><br />Digital Products
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.45 }}
            style={{ fontFamily: T.fontBody, fontSize: '1.0625rem', fontWeight: 300, lineHeight: 1.75, color: T.muted, maxWidth: 460, marginBottom: '2.75rem' }}
          >
            From standout websites and mobile apps to custom and SaaS product design — we craft premium experiences with modern UI and intentional motion.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.58 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <HoverButton primary onClick={() => scrollTo('contact')}>
              Start Your Project
              <ArrowRight size={16} />
            </HoverButton>
            <HoverButton onClick={() => scrollTo('work')}>View Our Work</HoverButton>
          </motion.div>
        </div>

        {/* Stats aside */}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem', width: 240 }}>
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.5 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{ padding: '1.5rem 1.75rem', border: T.border, borderLeft: `2px solid ${T.accent}`, borderRadius: 2, background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}
            >
              <p style={{ fontFamily: T.fontDisplay, fontSize: '2.5rem', fontWeight: 600, color: T.text, lineHeight: 1, marginBottom: '0.375rem' }}>{s.value}</p>
              <p style={{ fontFamily: T.fontMono, fontSize: '0.6875rem', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.55)' }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hero footer */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 0 2.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', zIndex: 1 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 32, height: 1, background: 'rgba(232,228,220,0.15)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, width: '100%', background: T.accent, animation: 'slideX 2.4s ease-in-out infinite', left: '-100%' }} />
          </div>
          <span style={{ fontFamily: T.fontMono, fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.3)' }}>Scroll to explore</span>
        </div>
        <div style={{ overflow: 'hidden', maxWidth: 360 }}>
          <div style={{ display: 'flex', gap: '2.5rem', animation: 'marquee 20s linear infinite', fontFamily: T.fontMono, fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.22)', whiteSpace: 'nowrap' }}>
            {['Website Design', '·', 'Mobile Apps', '·', 'SaaS Design', '·', 'Custom Products', '·', 'Website Design', '·', 'Mobile Apps', '·', 'SaaS Design', '·', 'Custom Products'].map((t, i) => (
              <span key={i} style={t === '·' ? { color: T.accent } : {}}>{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/* ?????????????????????????????????????????
   HOVER BUTTON
????????????????????????????????????????? */
function HoverButton({ children, primary = false, onClick, type = 'button' }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
        padding: '0.9375rem 2rem',
        background: primary ? (hov ? T.goldLight : T.accent) : 'transparent',
        color: primary ? T.ink : hov ? T.text : 'rgba(232,228,220,0.65)',
        fontFamily: T.fontBody,
        fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
        border: primary ? 'none' : `1px solid ${hov ? 'rgba(232,228,220,0.45)' : 'rgba(232,228,220,0.18)'}`,
        borderRadius: 2, cursor: 'pointer',
        transition: 'all 0.25s',
      }}
    >{children}</motion.button>
  )
}

/* ?????????????????????????????????????????
   MARQUEE BAND
????????????????????????????????????????? */
function MarqueeBand() {
  const items = ['Website Design', '·', 'Mobile Apps', '·', 'SaaS Interfaces', '·', 'Custom Products', '·', 'Motion Design', '·', 'UX Research', '·']
  const doubled = [...items, ...items]
  return (
    <div style={{ overflow: 'hidden', borderTop: T.border, borderBottom: T.border, padding: '0.9rem 0', background: 'rgba(255,255,255,0.018)' }}>
      <div style={{ display: 'flex', gap: '2.5rem', animation: 'marquee 28s linear infinite', fontFamily: T.fontMono, fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.18)', whiteSpace: 'nowrap' }}>
        {doubled.map((t, i) => (
          <span key={i} style={t === '·' ? { color: T.accent, opacity: 0.5 } : {}}>{t}</span>
        ))}
      </div>
    </div>
  )
}

/* ?????????????????????????????????????????
   SERVICES
????????????????????????????????????????? */
function Services() {
  return (
    <section id="services" style={{ padding: '7rem 3rem', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-end', marginBottom: '4rem' }}>
        <FadeUp>
          <SectionLabel text="Our Services" />
          <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(2rem,4vw,3.25rem)', fontWeight: 600, lineHeight: 1.12, color: T.text, letterSpacing: '-0.02em' }}>
            Four core <em style={{ fontStyle: 'italic', color: T.accent }}>disciplines</em>
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p style={{ fontFamily: T.fontBody, fontSize: '1rem', fontWeight: 300, color: T.muted, lineHeight: 1.75, maxWidth: 400 }}>
            Premium design and development services built for modern brands and fast-growing startups that demand quality.
          </p>
        </FadeUp>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 1, border: T.border, borderRadius: 4, overflow: 'hidden', background: 'rgba(255,255,255,0.04)' }}>
        {services.map((svc, i) => (
          <ServiceCard key={svc.num} svc={svc} delay={i * 0.1} />
        ))}
      </div>
    </section>
  )
}

function ServiceCard({ svc, delay }) {
  const [hov, setHov] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: '2.75rem 2.5rem', background: hov ? 'rgba(255,255,255,0.055)' : 'rgba(255,255,255,0.02)',
        transition: 'background 0.3s', position: 'relative', cursor: 'default',
        borderLeft: hov ? `2px solid ${T.accent}` : '2px solid transparent',
      }}
    >
      <div style={{ fontFamily: T.fontMono, fontSize: '0.6875rem', color: 'rgba(200,169,110,0.45)', letterSpacing: '0.15em', marginBottom: '2rem' }}>{svc.num}</div>
      <div style={{ marginBottom: '1.25rem', opacity: hov ? 1 : 0.65, transition: 'opacity 0.3s' }}><ServiceIcon name={svc.title} /></div>
      <h3 style={{ fontFamily: T.fontDisplay, fontSize: '1.375rem', fontWeight: 600, color: T.text, marginBottom: '0.875rem', lineHeight: 1.2 }}>{svc.title}</h3>
      <p style={{ fontFamily: T.fontBody, fontSize: '0.9rem', fontWeight: 300, color: T.muted, lineHeight: 1.7 }}>{svc.desc}</p>

      <motion.div animate={{ rotate: hov ? 45 : 0 }} transition={{ duration: 0.25 }}
        style={{ position: 'absolute', bottom: '2.25rem', right: '2.25rem', width: 30, height: 30, border: `1px solid ${hov ? T.accent : 'rgba(200,169,110,0.2)'}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: hov ? T.accent : 'rgba(200,169,110,0.3)', fontSize: '0.875rem', transition: 'border-color 0.3s, color 0.3s' }}
      ><ArrowRight size={14} /></motion.div>
    </motion.article>
  )
}

/* ?????????????????????????????????????????
   WHY CHOOSE
????????????????????????????????????????? */
function Why() {
  return (
    <section id="studio" style={{ padding: '7rem 3rem', maxWidth: 1280, margin: '0 auto', borderTop: T.border, borderBottom: T.border }}>
      <FadeUp>
        <SectionLabel text="Why Choose Us" />
        <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(2rem,4vw,3.25rem)', fontWeight: 600, lineHeight: 1.12, color: T.text, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          Design quality that feels <em style={{ fontStyle: 'italic', color: T.accent }}>premium</em>
        </h2>
        <p style={{ fontFamily: T.fontBody, fontSize: '1rem', fontWeight: 300, color: T.muted, lineHeight: 1.75, maxWidth: 480 }}>
          at every single touchpoint, from first impression to final delivery.
        </p>
      </FadeUp>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', marginTop: '4rem', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {whyPoints.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.12}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', paddingBottom: i < whyPoints.length - 1 ? '2rem' : 0, borderBottom: i < whyPoints.length - 1 ? T.border : 'none' }}>
                <div style={{ flexShrink: 0, width: 32, height: 32, border: `1px solid ${T.accent}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.accent, fontSize: '0.875rem', marginTop: 2 }}>?</div>
                <div>
                  <p style={{ fontFamily: T.fontBody, fontSize: '1rem', fontWeight: 500, color: T.text, marginBottom: '0.375rem' }}>{p.title}</p>
                  <p style={{ fontFamily: T.fontBody, fontSize: '0.875rem', fontWeight: 300, color: T.muted, lineHeight: 1.65 }}>{p.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding: '2rem', border: `1px solid ${hov ? 'rgba(200,169,110,0.3)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 4, background: hov ? 'rgba(200,169,110,0.04)' : 'rgba(255,255,255,0.02)', transition: 'all 0.3s', cursor: 'default' }}
    >
      <motion.div style={{ marginBottom: '1rem', color: T.accent }}><Icon size={24} strokeWidth={1.2} /></motion.div>
      <p style={{ fontFamily: T.fontBody, fontSize: '0.875rem', fontWeight: 500, color: T.text, marginBottom: '0.5rem' }}>{title}</p>
      <p style={{ fontFamily: T.fontBody, fontSize: '0.8125rem', fontWeight: 300, color: T.muted, lineHeight: 1.65 }}>{text}</p>
    </div>
  )
}

/* ?????????????????????????????????????????
   WORK / PORTFOLIO
????????????????????????????????????????? */
function Work() {
  return (
    <section id="work" style={{ padding: '7rem 3rem', maxWidth: 1280, margin: '0 auto', borderTop: T.border }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3.5rem' }}>
        <FadeUp>
          <SectionLabel text="Portfolio" />
          <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(2rem,4vw,3.25rem)', fontWeight: 600, lineHeight: 1.12, color: T.text, letterSpacing: '-0.02em' }}>
            Featured <em style={{ fontStyle: 'italic', color: T.accent }}>projects</em>
          </h2>
        </FadeUp>
        <ExploreLink />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.5rem' }}>
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} delay={i * 0.1} />
        ))}
      </div>
    </section>
  )
}

function ExploreLink() {
  const [hov, setHov] = useState(false)
  return (
    <a href="#" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: T.fontMono, fontSize: '0.75rem', fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', color: hov ? T.accent : 'rgba(232,228,220,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
    >
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
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ border: `1px solid ${hov ? 'rgba(200,169,110,0.3)' : T.border}`, borderRadius: 4, overflow: 'hidden', background: 'rgba(255,255,255,0.02)', cursor: 'pointer', transition: 'border-color 0.3s, transform 0.35s', transform: hov ? 'translateY(-3px)' : 'translateY(0)' }}
    >
      {/* Thumbnail */}
      <div style={{ height: 210, overflow: 'hidden', position: 'relative' }}>
        <motion.div
          animate={{ scale: hov ? 1.045 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: project.grad, opacity: 0.72 }} />
          {/* decorative grid */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
          <div style={{ position: 'absolute', bottom: 16, left: 16, fontFamily: T.fontMono, fontSize: '0.6875rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', background: 'rgba(0,0,0,0.45)', padding: '0.375rem 0.75rem', borderRadius: 2 }}>
            {project.category}
          </div>
        </motion.div>
      </div>

      {/* Info */}
      <div style={{ padding: '1.5rem 1.875rem 2rem' }}>
        <p style={{ fontFamily: T.fontMono, fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.6)', marginBottom: '0.5rem' }}>{project.category}</p>
        <h3 style={{ fontFamily: T.fontDisplay, fontSize: '1.25rem', fontWeight: 600, color: T.text, marginBottom: '0.625rem' }}>{project.title}</h3>
        <p style={{ fontFamily: T.fontBody, fontSize: '0.8125rem', fontWeight: 300, color: T.muted }}>
          <span style={{ color: 'rgba(200,169,110,0.75)', fontWeight: 500 }}>Result: </span>{project.result}
        </p>
      </div>
    </motion.article>
  )
}

/* ?????????????????????????????????????????
   CONTACT
????????????????????????????????????????? */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.'
    if (!form.service) e.service = 'Select a service.'
    if (form.message.trim().length < 20) e.message = 'At least 20 characters required.'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (!Object.keys(errs).length) {
      setSuccess(true)
      setForm({ name: '', email: '', service: '', message: '' })
    }
  }

  return (
    <section id="contact" style={{ padding: '7rem 3rem', maxWidth: 1280, margin: '0 auto', borderTop: T.border }}>
      <FadeUp>
        <SectionLabel text="Contact Us" />
        <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(2rem,4vw,3.25rem)', fontWeight: 600, lineHeight: 1.12, color: T.text, letterSpacing: '-0.02em' }}>
          Let's build your <em style={{ fontStyle: 'italic', color: T.accent }}>next product</em>
        </h2>
      </FadeUp>

      <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '5rem', marginTop: '4rem', alignItems: 'start' }}>
        {/* Aside */}
        <FadeUp delay={0.1}>
          <div style={{ position: 'sticky', top: '7rem' }}>
            <p style={{ fontFamily: T.fontBody, fontSize: '1rem', fontWeight: 300, color: T.muted, lineHeight: 1.75, marginBottom: '2.5rem' }}>
              Tell us what you're building and we'll schedule a free 30-minute discovery call to explore the scope together.
            </p>
            {[
              { label: 'Email', val: 'hello@formastudio.io' },
              { label: 'Response time', val: 'Within 24 hours' },
              { label: 'Based in', val: 'Global · Remote-first' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingLeft: '1rem', borderLeft: `2px solid rgba(200,169,110,0.3)`, marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: T.fontMono, fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.6)' }}>{item.label}</span>
                <span style={{ fontFamily: T.fontBody, fontSize: '0.9375rem', fontWeight: 300, color: 'rgba(232,228,220,0.75)' }}>{item.val}</span>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Form */}
        <FadeUp delay={0.2}>
          {success ? (
            <div style={{ padding: '1.5rem', border: '1px solid rgba(100,200,120,0.25)', borderRadius: 4, background: 'rgba(100,200,120,0.05)', color: '#8dd9a0', fontFamily: T.fontMono, fontSize: '0.875rem', letterSpacing: '0.04em' }}>
              <Check size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} /> Thank you! We'll be in touch within 24 hours.
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormField label="Name" id="name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Your full name" error={errors.name} />
                <FormField label="Email" id="email" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} placeholder="you@example.com" error={errors.email} />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: T.fontMono, fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.4)', marginBottom: '0.5rem' }}>Service Needed</label>
                <select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: `1px solid ${errors.service ? 'rgba(220,100,100,0.5)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 2, padding: '0.875rem 1.125rem', color: form.service ? T.text : 'rgba(232,228,220,0.25)', fontFamily: T.fontBody, fontSize: '0.9375rem', fontWeight: 300, outline: 'none', cursor: 'pointer', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = T.accent} onBlur={e => e.target.style.borderColor = errors.service ? 'rgba(220,100,100,0.5)' : 'rgba(255,255,255,0.1)'}
                >
                  <option value="" style={{ background: '#0a0a0f' }}>Select a service</option>
                  {['Website Design', 'Mobile Application', 'Custom Product Design', 'SaaS Product Design'].map(o => (
                    <option key={o} value={o} style={{ background: '#0a0a0f' }}>{o}</option>
                  ))}
                </select>
                {errors.service && <p style={{ fontFamily: T.fontMono, fontSize: '0.75rem', color: '#e07070', marginTop: '0.375rem' }}>{errors.service}</p>}
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: T.fontMono, fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.4)', marginBottom: '0.5rem' }}>Project Brief</label>
                <textarea rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell us about your idea, timeline, and goals?"
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: `1px solid ${errors.message ? 'rgba(220,100,100,0.5)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 2, padding: '0.875rem 1.125rem', color: T.text, fontFamily: T.fontBody, fontSize: '0.9375rem', fontWeight: 300, outline: 'none', resize: 'vertical', minHeight: 130, transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = T.accent} onBlur={e => e.target.style.borderColor = errors.message ? 'rgba(220,100,100,0.5)' : 'rgba(255,255,255,0.1)'}
                />
                {errors.message && <p style={{ fontFamily: T.fontMono, fontSize: '0.75rem', color: '#e07070', marginTop: '0.375rem' }}>{errors.message}</p>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.25rem' }}>
                <HoverButton primary type="submit">
                  Send Inquiry
                  <Send size={16} />
                </HoverButton>
                <span style={{ fontFamily: T.fontMono, fontSize: '0.6875rem', color: 'rgba(232,228,220,0.25)' }}>We reply within 24h</span>
              </div>
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
      <label htmlFor={id} style={{ display: 'block', fontFamily: T.fontMono, fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.4)', marginBottom: '0.5rem' }}>{label}</label>
      <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: '100%', background: focused ? 'rgba(200,169,110,0.04)' : 'rgba(255,255,255,0.04)', border: `1px solid ${error ? 'rgba(220,100,100,0.5)' : focused ? T.accent : 'rgba(255,255,255,0.1)'}`, borderRadius: 2, padding: '0.875rem 1.125rem', color: T.text, fontFamily: T.fontBody, fontSize: '0.9375rem', fontWeight: 300, outline: 'none', transition: 'all 0.2s' }}
      />
      {error && <p style={{ fontFamily: T.fontMono, fontSize: '0.75rem', color: '#e07070', marginTop: '0.375rem' }}>{error}</p>}
    </div>
  )
}

/* CLIENT LOGOS */
function ClientLogos() {
  const doubled = [...clients, ...clients]
  return (
    <section style={{ padding: '3rem 0', borderBottom: T.border, overflow: 'hidden' }}>
      <p style={{ textAlign: 'center', fontFamily: T.fontMono, fontSize: '0.6875rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.25)', marginBottom: '1.5rem' }}>Trusted by innovative teams</p>
      <div style={{ display: 'flex', gap: '4rem', animation: 'marquee 35s linear infinite', whiteSpace: 'nowrap' }}>
        {doubled.map((c, i) => (
          <span key={i} style={{ fontFamily: T.fontDisplay, fontSize: '1.25rem', fontWeight: 600, color: 'rgba(232,228,220,0.12)', letterSpacing: '0.04em' }}>{c}</span>
        ))}
      </div>
    </section>
  )
}

/* PROCESS */
function Process() {
  return (
    <section id="process" className="section-pad" style={{ padding: '7rem 3rem', maxWidth: 1280, margin: '0 auto', borderTop: T.border }}>
      <FadeUp>
        <SectionLabel text="How We Work" />
        <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(2rem,4vw,3.25rem)', fontWeight: 600, lineHeight: 1.12, color: T.text, letterSpacing: '-0.02em' }}>
          A proven <em style={{ fontStyle: 'italic', color: T.accent }}>process</em>
        </h2>
      </FadeUp>
      <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem', marginTop: '3.5rem' }}>
        {processSteps.map((step, i) => {
          const Icon = step.icon
          return (
            <FadeUp key={step.num} delay={i * 0.1}>
              <div style={{ padding: '2rem', border: T.border, borderRadius: 4, background: 'rgba(255,255,255,0.02)', height: '100%' }}>
                <Icon size={28} color={T.accent} strokeWidth={1.2} style={{ marginBottom: '1.25rem' }} />
                <p style={{ fontFamily: T.fontMono, fontSize: '0.6875rem', color: 'rgba(200,169,110,0.5)', marginBottom: '0.75rem' }}>{step.num}</p>
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

/* TESTIMONIALS */
function Testimonials() {
  return (
    <section className="section-pad" style={{ padding: '7rem 3rem', maxWidth: 1280, margin: '0 auto', borderTop: T.border, background: 'rgba(255,255,255,0.015)' }}>
      <FadeUp>
        <SectionLabel text="Testimonials" />
        <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(2rem,4vw,3.25rem)', fontWeight: 600, lineHeight: 1.12, color: T.text, letterSpacing: '-0.02em', marginBottom: '3rem' }}>
          What clients <em style={{ fontStyle: 'italic', color: T.accent }}>say</em>
        </h2>
      </FadeUp>
      <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
        {testimonials.map((t, i) => (
          <FadeUp key={t.name} delay={i * 0.1}>
            <div style={{ padding: '2rem', border: T.border, borderRadius: 4, background: 'rgba(255,255,255,0.02)', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Quote size={24} color={T.accent} style={{ opacity: 0.4, marginBottom: '1rem' }} />
              <p style={{ fontFamily: T.fontBody, fontSize: '0.9375rem', fontWeight: 300, color: T.muted, lineHeight: 1.7, flex: 1, marginBottom: '1.5rem' }}>&ldquo;{t.quote}&rdquo;</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <img src={t.avatar} alt={t.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: T.border }} />
                <div>
                  <p style={{ fontFamily: T.fontBody, fontSize: '0.875rem', fontWeight: 500, color: T.text }}>{t.name}</p>
                  <p style={{ fontFamily: T.fontMono, fontSize: '0.625rem', color: 'rgba(200,169,110,0.55)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t.role}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4, marginTop: '1rem' }}>
                {[1, 2, 3, 4, 5].map(n => <Star key={n} size={12} fill={T.accent} color={T.accent} />)}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

/* BACK TO TOP */
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
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 80, width: 44, height: 44, borderRadius: '50%', border: `1px solid ${T.accent}`, background: 'rgba(10,10,15,0.9)', color: T.accent, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(12px)' }}
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

/* ?????????????????????????????????????????
   FOOTER
????????????????????????????????????????? */
function Footer() {
  return (
    <footer style={{ borderTop: T.border, padding: '2.5rem 3rem', maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontFamily: T.fontDisplay, fontSize: '1rem', fontWeight: 600, color: 'rgba(240,236,227,0.45)' }}>
        Forma<span style={{ color: T.accent, fontStyle: 'italic' }}>.</span>
      </span>
      <span style={{ fontFamily: T.fontMono, fontSize: '0.6875rem', fontWeight: 300, color: 'rgba(232,228,220,0.2)', letterSpacing: '0.06em' }}>
        © 2025 Forma Studio. All rights reserved.
      </span>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {[
          { Icon: X, href: 'https://x.com', label: 'X' },
          { Icon: Globe, href: 'https://formastudio.io', label: 'Website' },
          { Icon: ExternalLink, href: 'mailto:hello@formastudio.io', label: 'Email' },
        ].map(({ Icon, href, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
            style={{ color: 'rgba(232,228,220,0.25)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = T.accent}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(232,228,220,0.25)'}
          ><Icon size={18} /></a>
        ))}
      </div>
    </footer>
  )
}

/* ?????????????????????????????????????????
   APP
????????????????????????????????????????? */
export default function App() {
  return (
    <div style={{ background: T.ink, minHeight: '100vh' }}>
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