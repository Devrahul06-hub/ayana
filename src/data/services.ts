export const services = [
  { num: '01', title: 'AI Development', slug: 'ai-development', desc: 'Intelligent AI-powered solutions that automate workflows, personalize experiences, and drive business growth.' },
  { num: '02', title: 'Custom Software Development', slug: 'custom-software-development', desc: 'Tailored software solutions precisely aligned to your workflows, goals, and operational needs.' },
  { num: '03', title: 'SaaS Development', slug: 'saas-development', desc: 'Robust SaaS platforms engineered for scale, speed, and long-term product growth.' },
  { num: '04', title: 'Mobile Applications', slug: 'mobile-applications', desc: 'Fast, intuitive iOS & Android experiences tailored for real user behaviour and delight.' },
  { num: '05', title: 'Cloud Application Development', slug: 'cloud-application-development', desc: 'Cloud-native apps designed for resilience, seamless scaling, and reliable deployment.' },
];

export const serviceData: Record<string, {
  title: string;
  tagline: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  deliverables: string[];
  useCases: { title: string; desc: string }[];
}> = {
  'ai-development': {
    title: 'AI Development',
    tagline: 'Intelligent automation and AI-powered products that give your business a compounding edge.',
    description: 'We design and build AI solutions that fit into real workflows — not demos that never ship. From custom ML models to LLM-powered features and AI-augmented SaaS, we take AI from proof-of-concept to production.',
    metaTitle: 'AI Development Services — Ayana Technologies',
    metaDescription: 'Custom AI development services: ML models, LLM integrations, AI-powered SaaS features, and intelligent automation. Global delivery, based in Pune, India.',
    deliverables: ['Custom ML model design & training', 'LLM integration and fine-tuning', 'AI-powered product features', 'Intelligent workflow automation', 'Data pipeline architecture', 'AI API development & deployment'],
    useCases: [
      { title: 'SaaS Feature Intelligence', desc: 'Embed smart recommendations, predictive inputs, and anomaly detection directly into your product.' },
      { title: 'Process Automation', desc: 'Replace manual, repetitive tasks with AI agents that run 24/7 without error.' },
      { title: 'Data-Driven Decisions', desc: 'Build dashboards and pipelines that turn raw data into actionable insight in real time.' },
    ],
  },
  'custom-software-development': {
    title: 'Custom Software Development',
    tagline: 'Software built to your exact workflows — not a generic template stretched to fit.',
    description: "Off-the-shelf tools create workarounds. Custom software removes them. We build web and desktop applications, internal tools, and complex business platforms that work precisely the way your team needs them to.",
    metaTitle: 'Custom Software Development — Ayana Technologies',
    metaDescription: 'Bespoke software development for web apps, internal tools, and business platforms. Pune-based, globally delivered. Clean architecture, fast iteration.',
    deliverables: ['Web application development', 'Internal tooling & admin systems', 'Business process platforms', 'API design & third-party integrations', 'Legacy system modernisation', 'Database architecture & optimisation'],
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
    deliverables: ['SaaS architecture & multi-tenancy', 'Subscription & billing integration', 'User onboarding & authentication', 'Role-based access control', 'Analytics & usage dashboards', 'Scalable cloud deployment'],
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
    deliverables: ['iOS & Android app development', 'Cross-platform (React Native / Expo)', 'UI/UX design for mobile', 'Push notifications & offline support', 'App Store & Play Store submission', 'Maintenance & version updates'],
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
    deliverables: ['Cloud-native app architecture', 'AWS / GCP / Azure deployment', 'Microservices & serverless design', 'CI/CD pipeline setup', 'Infrastructure as Code (IaC)', 'Cloud cost optimisation'],
    useCases: [
      { title: 'Scalable Product Infrastructure', desc: 'Start lean, scale to millions of requests — without rewriting your infrastructure at every growth stage.' },
      { title: 'Cloud Migration', desc: 'Move legacy on-premise systems to cloud with minimal disruption and maximum reliability.' },
      { title: 'DevOps & Managed Infra', desc: 'Hand off your infrastructure management so your engineering team can focus on product.' },
    ],
  },
};
