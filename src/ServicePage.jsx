import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

const T = {
  bg: '#f4f6fb',
  surface: '#ffffff',
  ink: '#0b0f1a',
  onAccent: '#ffffff',
  accent: '#6366f1',
  accentDark: '#4f46e5',
  accentDim: 'rgba(99,102,241,0.14)',
  gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
  gradientSoft: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.08) 50%, rgba(6,182,212,0.1) 100%)',
  muted: '#5b6478',
  faint: '#7c8599',
  border: 'rgba(15,23,42,0.08)',
  borderHover: 'rgba(99,102,241,0.4)',
  text: '#0b0f1a',
  surfaceSubtle: '#eef1f8',
  shadowCard: '0 8px 32px -8px rgba(99,102,241,0.18), 0 4px 16px -4px rgba(15,23,42,0.06)',
  shadowGlow: '0 12px 40px -8px rgba(99,102,241,0.45)',
  shadowSm: '0 2px 10px rgba(15,23,42,0.05)',
  fontDisplay: "'Space Grotesk', sans-serif",
  fontBody: "'Plus Jakarta Sans', sans-serif",
  fontMono: "'IBM Plex Mono', monospace",
  radiusPill: 9999,
  radiusLg: 20,
}

const serviceData = {
  'ai-development': {
    title: 'AI Development',
    tagline: 'Intelligent automation and AI-powered products that give your business a compounding edge.',
    description: 'We design and build AI solutions that fit into real workflows — not demos that never ship. From custom ML models to LLM-powered features and AI-augmented SaaS, we take AI from proof-of-concept to production.',
    metaTitle: 'AI Development Services — Ayana Technologies',
    metaDescription: 'Custom AI development services: ML models, LLM integrations, AI-powered SaaS features, and intelligent automation. Global delivery, based in Pune, India.',
    deliverables: [
      'Custom ML model design & training',
      'LLM integration and fine-tuning',
      'AI-powered product features',
      'Intelligent workflow automation',
      'Data pipeline architecture',
      'AI API development & deployment',
    ],
    useCases: [
      { title: 'SaaS Feature Intelligence', desc: 'Embed smart recommendations, predictive inputs, and anomaly detection directly into your product.' },
      { title: 'Process Automation', desc: 'Replace manual, repetitive tasks with AI agents that run 24/7 without error.' },
      { title: 'Data-Driven Decisions', desc: 'Build dashboards and pipelines that turn raw data into actionable insight in real time.' },
    ],
  },
  'custom-software-development': {
    title: 'Custom Software Development',
    tagline: 'Software built to your exact workflows — not a generic template stretched to fit.',
    description: 'Off-the-shelf tools create workarounds. Custom software removes them. We build web and desktop applications, internal tools, and complex business platforms that work precisely the way your team needs them to.',
    metaTitle: 'Custom Software Development — Ayana Technologies',
    metaDescription: 'Bespoke software development for web apps, internal tools, and business platforms. Pune-based, globally delivered. Clean architecture, fast iteration.',
    deliverables: [
      'Web application development',
      'Internal tooling & admin systems',
      'Business process platforms',
      'API design & third-party integrations',
      'Legacy system modernisation',
      'Database architecture & optimisation',
    ],
    useCases: [
      { title: 'Internal Operations Tools', desc: 'CRMs, ERPs, HR systems, and dashboards built for your exact process — not the general market.' },
      { title: 'Client-Facing Portals', desc: 'Branded, performant portals that give your customers a seamless self-service experience.' },
      { title: 'Integration Platforms', desc: 'Connect disparate tools and data sources into a single unified system your team can trust.' },
    ],
  },
  'saas-development': {
    title: 'SaaS Development',
    tagline: 'SaaS platforms engineered to scale from early users to enterprise contracts.',
    description: "We build SaaS products from scratch — architecture, design, and every line of code. Multi-tenancy, billing, onboarding, and permission systems built right from day one so you're not rewriting them at Series A.",
    metaTitle: 'SaaS Product Development — Ayana Technologies',
    metaDescription: 'End-to-end SaaS product development: architecture, design, multi-tenancy, billing, and launch. Pune-based studio delivering globally.',
    deliverables: [
      'SaaS architecture & multi-tenancy',
      'Subscription & billing integration',
      'User onboarding & authentication',
      'Role-based access control',
      'Analytics & usage dashboards',
      'Scalable cloud deployment',
    ],
    useCases: [
      { title: 'B2B SaaS Products', desc: 'Team-based products with workspaces, admin controls, and enterprise-grade security from the start.' },
      { title: 'Vertical SaaS', desc: 'Industry-specific software that solves a niche problem better than any horizontal tool can.' },
      { title: 'SaaS MVP to Scale', desc: 'Ship a focused MVP fast, then grow the product systematically without accumulating tech debt.' },
    ],
  },
  'mobile-applications': {
    title: 'Mobile Applications',
    tagline: 'iOS & Android apps that users actually open again — and again.',
    description: 'We design and build cross-platform mobile apps that feel native, perform well, and ship on schedule. From consumer apps to enterprise mobile tools, every interaction is designed with real user behaviour in mind.',
    metaTitle: 'Mobile App Development — Ayana Technologies',
    metaDescription: 'iOS and Android mobile app development for consumer and enterprise. Cross-platform with native feel. Pune-based, globally delivered by Ayana Technologies.',
    deliverables: [
      'iOS & Android app development',
      'Cross-platform (React Native / Expo)',
      'UI/UX design for mobile',
      'Push notifications & offline support',
      'App Store & Play Store submission',
      'Maintenance & version updates',
    ],
    useCases: [
      { title: 'Consumer Apps', desc: 'Apps built for mass adoption — fast, delightful, and retention-optimised from first launch.' },
      { title: 'Enterprise Mobile Tools', desc: 'Field apps, internal tools, and B2B products that work reliably on any device, any network.' },
      { title: 'SaaS Mobile Companion', desc: 'Extend your web SaaS into mobile without duplicating your backend or your team.' },
    ],
  },
  'cloud-application-development': {
    title: 'Cloud Application Development',
    tagline: 'Cloud-native applications built to scale reliably under real-world load.',
    description: 'We architect and build cloud-native applications on AWS, GCP, and Azure — designed for resilience, auto-scaling, and cost efficiency. Whether greenfield or migration, we build cloud infrastructure that your product can grow into.',
    metaTitle: 'Cloud Application Development — Ayana Technologies',
    metaDescription: 'Cloud-native application development on AWS, GCP, and Azure. Scalable architecture, CI/CD, DevOps, and managed infrastructure. Ayana Technologies, Pune.',
    deliverables: [
      'Cloud-native app architecture',
      'AWS / GCP / Azure deployment',
      'Microservices & serverless design',
      'CI/CD pipeline setup',
      'Infrastructure as Code (IaC)',
      'Cloud cost optimisation',
    ],
    useCases: [
      { title: 'Scalable Product Infrastructure', desc: 'Start lean, scale to millions of requests — without rewriting your infrastructure at every growth stage.' },
      { title: 'Cloud Migration', desc: 'Move legacy on-premise systems to cloud with minimal disruption and maximum reliability.' },
      { title: 'DevOps & Managed Infra', desc: 'Hand off your infrastructure management so your engineering team can focus on product.' },
    ],
  },
}

export default function ServicePage() {
  const { slug } = useParams()
  const data = serviceData[slug]

  useEffect(() => {
    if (data) {
      document.title = data.metaTitle
      const desc = document.querySelector('meta[name="description"]')
      if (desc) desc.setAttribute('content', data.metaDescription)
    }
    window.scrollTo(0, 0)
  }, [slug, data])

  if (!data) {
    return (
      <div style={{ minHeight: '100vh', background: T.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: T.fontBody, color: T.text }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Service not found</h1>
        <Link to="/" style={{ color: T.accent }}>← Back to home</Link>
      </div>
    )
  }

  return (
    <div style={{ background: T.bg, minHeight: '100vh', color: T.text }}>
      {/* Nav back */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 90, background: 'rgba(244,246,251,0.92)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${T.border}`, padding: '1rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: T.fontBody, fontSize: '0.875rem', fontWeight: 500, color: T.muted, textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Ayana Technologies
        </Link>
        <a href="/#contact" style={{ fontFamily: T.fontBody, fontSize: '0.875rem', fontWeight: 600, padding: '0.6rem 1.25rem', background: T.gradient, color: T.onAccent, textDecoration: 'none', borderRadius: T.radiusPill, boxShadow: '0 4px 16px rgba(99,102,241,0.35)' }}>
          Get in Touch
        </a>
      </div>

      {/* Hero */}
      <div style={{ paddingTop: '8rem', paddingBottom: '5rem', paddingLeft: '3rem', paddingRight: '3rem', maxWidth: 1280, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: T.radiusPill, background: T.gradientSoft, border: `1px solid ${T.border}`, fontFamily: T.fontMono, fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.accentDark, marginBottom: '1.5rem' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.gradient }} />
            Service
          </span>
          <h1 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', color: T.text, marginBottom: '1.25rem' }}>
            {data.title}
          </h1>
          <p style={{ fontFamily: T.fontBody, fontSize: '1.25rem', fontWeight: 400, color: T.muted, lineHeight: 1.6, maxWidth: 600, marginBottom: '2rem' }}>
            {data.tagline}
          </p>
          <p style={{ fontFamily: T.fontBody, fontSize: '1rem', fontWeight: 300, color: T.muted, lineHeight: 1.8, maxWidth: 680 }}>
            {data.description}
          </p>
        </motion.div>
      </div>

      {/* Deliverables */}
      <div style={{ padding: '4rem 3rem', maxWidth: 1280, margin: '0 auto', borderTop: `1px solid ${T.border}` }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 600, color: T.text, marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>
            What's included
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {data.deliverables.map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1.25rem 1.5rem', background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radiusLg, boxShadow: T.shadowSm }}>
                <div style={{ flexShrink: 0, width: 22, height: 22, background: T.gradient, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                  <Check size={12} color={T.onAccent} strokeWidth={2.5} />
                </div>
                <span style={{ fontFamily: T.fontBody, fontSize: '0.9rem', fontWeight: 500, color: T.text, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Use Cases */}
      <div style={{ padding: '4rem 3rem', maxWidth: 1280, margin: '0 auto', borderTop: `1px solid ${T.border}`, background: T.gradientSoft }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 600, color: T.text, marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>
            Common use cases
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {data.useCases.map((uc, i) => (
              <motion.div key={uc.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                style={{ padding: '2rem', background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radiusLg, boxShadow: T.shadowCard }}>
                <h3 style={{ fontFamily: T.fontDisplay, fontSize: '1.125rem', fontWeight: 600, color: T.text, marginBottom: '0.625rem' }}>{uc.title}</h3>
                <p style={{ fontFamily: T.fontBody, fontSize: '0.9rem', fontWeight: 300, color: T.muted, lineHeight: 1.7 }}>{uc.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA */}
      <div style={{ padding: '5rem 3rem', maxWidth: 1280, margin: '0 auto', borderTop: `1px solid ${T.border}`, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 600, color: T.text, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Have a project in mind?
          </h2>
          <p style={{ fontFamily: T.fontBody, fontSize: '1rem', color: T.muted, marginBottom: '2rem' }}>
            Tell us what you're building. We'll tell you honestly whether and how we can help.
          </p>
          <a href="/#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2.25rem', background: T.gradient, color: T.onAccent, fontFamily: T.fontBody, fontSize: '1rem', fontWeight: 600, borderRadius: T.radiusPill, textDecoration: 'none', boxShadow: T.shadowGlow }}>
            Start a conversation <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${T.border}`, padding: '1.5rem 3rem', maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: T.fontDisplay, fontSize: '0.9rem', fontWeight: 600, color: T.muted }}>Ayana<span style={{ color: T.accent, fontStyle: 'italic' }}> Technologies LLP</span></span>
        <span style={{ fontFamily: T.fontMono, fontSize: '0.6875rem', color: T.faint }}>© 2025 Ayana Technologies LLP. All rights reserved.</span>
      </div>
    </div>
  )
}
