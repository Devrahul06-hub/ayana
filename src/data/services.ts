export const services = [
  { num: '01', title: 'AI Development', slug: 'ai-development', desc: 'Custom LLM-powered agents, ML pipelines, and intelligent automation — engineered for production, not just proof-of-concept.' },
  { num: '02', title: 'Custom Software', slug: 'custom-software-development', desc: 'Business software built with AI embedded at the architecture level from day one — not as an afterthought feature.' },
  { num: '03', title: 'SaaS Development', slug: 'saas-development', desc: 'AI-native SaaS platforms engineered to learn and improve with every user interaction — built to scale from the start.' },
  { num: '04', title: 'Mobile Applications', slug: 'mobile-applications', desc: 'iOS & Android apps with AI at their core — personalization, intelligent prediction, and UX that adapts to real user behaviour.' },
  { num: '05', title: 'Cloud Infrastructure', slug: 'cloud-application-development', desc: 'Cloud-native infrastructure scaled for AI workloads — designed for the compute demands of real ML in production.' },
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
    tagline: 'Intelligent AI systems built for production — not just impressive demos.',
    description: 'We design and build AI solutions that operate in real workflows under real load. From custom ML models to LLM-powered agents and AI-augmented SaaS, we take AI from architecture to production — reliably, cost-efficiently, and maintainably.',
    metaTitle: 'AI Development Services — Ayana Technologies',
    metaDescription: 'Custom AI development: ML models, LLM integrations, AI-powered SaaS features, and intelligent automation. Production-ready, globally delivered. Ayana Technologies, Pune.',
    deliverables: ['Custom ML model design & training', 'LLM integration and fine-tuning', 'AI-powered product features', 'Intelligent workflow automation', 'Data pipeline architecture', 'AI API development & deployment'],
    useCases: [
      { title: 'SaaS Feature Intelligence', desc: 'Embed smart recommendations, predictive inputs, and anomaly detection directly into your product as core functionality.' },
      { title: 'Process Automation', desc: 'Replace manual, repetitive tasks with AI agents that run 24/7, handle exceptions gracefully, and reduce operational overhead.' },
      { title: 'Data-Driven Decisions', desc: 'Build dashboards and pipelines that turn raw data into actionable insight in real time — automatically.' },
    ],
  },
  'custom-software-development': {
    title: 'Custom Software Development',
    tagline: 'Software built to your exact workflows — with AI embedded from the first line of code.',
    description: "Off-the-shelf tools create workarounds. Custom software removes them — and when AI is built into the architecture from the start, it compounds in value over time. We build web applications, internal tools, and complex platforms that work precisely the way your team needs, and get smarter as they're used.",
    metaTitle: 'Custom Software Development — Ayana Technologies',
    metaDescription: 'AI-native custom software development for web apps, internal tools, and business platforms. Pune-based, globally delivered. Clean architecture, fast iteration.',
    deliverables: ['Web application development', 'Internal tooling & admin systems', 'Business process platforms', 'API design & third-party integrations', 'Legacy system modernisation', 'Database architecture & optimisation'],
    useCases: [
      { title: 'Internal Operations Tools', desc: 'CRMs, ERPs, HR systems, and dashboards built for your exact process — not the general market — with AI surfacing insights automatically.' },
      { title: 'Client-Facing Portals', desc: 'Branded, performant portals that give your customers a seamless self-service experience, enhanced by intelligent features.' },
      { title: 'Integration Platforms', desc: 'Connect disparate tools and data sources into a unified system your team can trust — with AI reducing manual reconciliation.' },
    ],
  },
  'saas-development': {
    title: 'SaaS Development',
    tagline: 'AI-native SaaS platforms built to scale from early adopters to enterprise contracts.',
    description: "We build SaaS products from scratch — architecture, AI systems, design, and every line of code. Multi-tenancy, billing, onboarding, and permission systems built correctly from day one, so you're not rewriting them at Series A. AI isn't an add-on: it's part of the core product from the first sprint.",
    metaTitle: 'SaaS Product Development — Ayana Technologies',
    metaDescription: 'AI-native SaaS product development: architecture, design, multi-tenancy, billing, and launch. Pune-based studio delivering globally.',
    deliverables: ['SaaS architecture & multi-tenancy', 'Subscription & billing integration', 'User onboarding & authentication', 'Role-based access control', 'Analytics & usage dashboards', 'Scalable cloud deployment'],
    useCases: [
      { title: 'B2B SaaS Products', desc: 'Team-based products with workspaces, admin controls, and enterprise-grade security — with AI features that drive retention and expansion.' },
      { title: 'Vertical SaaS', desc: 'Industry-specific software that solves a niche problem better than any horizontal tool can, often because it uses AI trained on domain-specific data.' },
      { title: 'SaaS MVP to Scale', desc: 'Ship a focused MVP fast, then grow the product systematically with AI capabilities that compound as your user base grows.' },
    ],
  },
  'mobile-applications': {
    title: 'Mobile Applications',
    tagline: 'iOS & Android apps with AI at their core — not bolted on after launch.',
    description: 'We design and build cross-platform mobile apps that feel native, perform under load, and ship on schedule. From consumer apps to enterprise mobile tools, AI is part of the architecture from day one — enabling personalization, intelligent features, and adaptive UX that improves with usage.',
    metaTitle: 'Mobile App Development — Ayana Technologies',
    metaDescription: 'AI-native iOS and Android mobile app development. Cross-platform with native feel. Pune-based, globally delivered by Ayana Technologies.',
    deliverables: ['iOS & Android app development', 'Cross-platform (React Native / Expo)', 'UI/UX design for mobile', 'Push notifications & offline support', 'App Store & Play Store submission', 'Maintenance & version updates'],
    useCases: [
      { title: 'Consumer Apps', desc: 'Apps built for mass adoption — fast, delightful, and AI-powered for personalization and retention from the first install.' },
      { title: 'Enterprise Mobile Tools', desc: 'Field apps, internal tools, and B2B products that work reliably on any device — with AI reducing manual data entry and decision-making.' },
      { title: 'SaaS Mobile Companion', desc: 'Extend your web SaaS into mobile without duplicating your backend — and bring AI features natively to the mobile experience.' },
    ],
  },
  'cloud-application-development': {
    title: 'Cloud Infrastructure',
    tagline: 'Cloud-native infrastructure built for AI workloads — not just regular web traffic.',
    description: 'We architect and build cloud-native applications on AWS, GCP, and Azure — designed for the unique demands of AI products: high compute bursts, large model inference, data-intensive pipelines, and cost-efficient scaling. Whether greenfield or migration, we build infrastructure that your product can grow into.',
    metaTitle: 'Cloud Application Development — Ayana Technologies',
    metaDescription: 'Cloud-native application development on AWS, GCP, and Azure. Scalable AI infrastructure, CI/CD, DevOps, and managed deployment. Ayana Technologies, Pune.',
    deliverables: ['Cloud-native app architecture', 'AWS / GCP / Azure deployment', 'Microservices & serverless design', 'CI/CD pipeline setup', 'Infrastructure as Code (IaC)', 'Cloud cost optimisation'],
    useCases: [
      { title: 'AI-Ready Product Infrastructure', desc: 'Start lean, scale to millions of requests and large model inference — without rewriting your infrastructure at every growth stage.' },
      { title: 'Cloud Migration', desc: 'Move legacy on-premise systems to cloud with minimal disruption, then layer AI capabilities on top of a solid foundation.' },
      { title: 'DevOps & Managed Infra', desc: 'Hand off infrastructure management so your engineering team focuses on product — we handle uptime, security, and cost.' },
    ],
  },
};
