export const SITE = {
  name: "Swar Shah",
  role: "AI & Full Stack Consultant",
  tagline: "Software that drives business growth",
  email: "swarbuilds@gmail.com",
  whatsapp: "+918302808701",
  whatsappDisplay: "+91 83028 08701",
  linkedin: "https://www.linkedin.com/in/swar-shah-190a84218/",
  github: "https://github.com/swarshah09",
  location: "Pune, India",
  calendly: "https://calendly.com/swarbuilds/consultation",
};

export const TRUST_BADGES = [
  { label: "Software Engineer at Synechron" },
  { label: "Enterprise Experience" },
  { label: "AI-Powered Solutions" },
  { label: "Fast Delivery" },
  { label: "Clean Architecture" },
  { label: "Global Quality" },
];

export const INDUSTRIES = [
  { name: "Real Estate", icon: "Home" },
  { name: "Healthcare", icon: "HeartPulse" },
  { name: "Fitness", icon: "Dumbbell" },
  { name: "Banking", icon: "Landmark" },
  { name: "Startups", icon: "Rocket" },
  { name: "Restaurants", icon: "UtensilsCrossed" },
];

export const SERVICES = [
  {
    slug: "business-websites",
    title: "Business Websites",
    icon: "Globe",
    tagline: "Websites that convert visitors into revenue.",
    description: "Modern, responsive websites engineered to generate qualified leads and rank on search.",
    bullets: ["Lead generation", "SEO-first", "Sub-1s load times", "CMS-ready"],
    size: "lg",
  },
  {
    slug: "custom-web-applications",
    title: "Custom Web Applications",
    icon: "Layers",
    tagline: "Software tailored to your business — not templates.",
    description: "Internal portals, SaaS products and customer platforms that scale with your operation.",
    bullets: ["SaaS builds", "Portals & internal tools", "Multi-tenant ready"],
    size: "lg",
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    icon: "Sparkles",
    tagline: "Bring AI where it moves the needle.",
    description: "Chatbots, document AI, and support agents built on OpenAI, Claude and Gemini — production grade.",
    bullets: ["AI Chatbots", "Document AI", "Support automation"],
    size: "md",
  },
  {
    slug: "business-automation",
    title: "Business Automation",
    icon: "Workflow",
    tagline: "Automate the busywork. Reclaim your time.",
    description: "Workflow, email, CRM and reporting automations that save teams 20+ hours a week.",
    bullets: ["Workflow automation", "CRM integrations", "Automated reporting"],
    size: "md",
  },
  {
    slug: "dashboards",
    title: "Dashboard Development",
    icon: "LayoutDashboard",
    tagline: "See your business at a glance.",
    description: "Analytics, admin panels and executive dashboards built with real-time data.",
    bullets: ["Admin panels", "Business analytics", "Realtime charts"],
    size: "md",
  },
  {
    slug: "website-redesign",
    title: "Website Redesign",
    icon: "Palette",
    tagline: "From outdated to unforgettable.",
    description: "Convert outdated websites into premium experiences your customers actually trust.",
    bullets: ["Brand refresh", "Conversion audit", "Performance rebuild"],
    size: "md",
  },
  {
    slug: "website-maintenance",
    title: "Website Maintenance",
    icon: "ShieldCheck",
    tagline: "Peace of mind, on retainer.",
    description: "Security, updates, performance monitoring and priority support — always on.",
    bullets: ["Security patches", "Uptime monitoring", "Priority support"],
    size: "md",
  },
];

export const WHY_ME = [
  { title: "Fast Communication", body: "Replies within hours, not days. Weekly progress calls without asking.", icon: "MessageSquare" },
  { title: "Business-First Mindset", body: "Every decision maps back to revenue, retention or cost. Never tech for tech's sake.", icon: "Target" },
  { title: "Clean, Scalable Code", body: "Enterprise-grade architecture from day one — no rewrites when you grow.", icon: "Code2" },
  { title: "AI-First Approach", body: "Modern AI baked in where it multiplies output, not as a gimmick.", icon: "Sparkles" },
  { title: "Long-Term Support", body: "Post-launch retainers and 24/7 monitoring keep your product healthy.", icon: "LifeBuoy" },
  { title: "Modern UI/UX", body: "Interfaces that feel premium — the kind that make customers trust the brand.", icon: "PenTool" },
];

export const PROJECTS = [
  {
    slug: "shreeji-associates",
    name: "Shreeji Associates",
    industry: "Real Estate",
    tagline: "A modern property portal that turned drive-bys into booked visits.",
    cover: "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHwzfHxyZWFsJTIwZXN0YXRlJTIwYXJjaGl0ZWN0dXJlJTIwbW9kZXJufGVufDB8fHx8MTc4MzE1NjU4M3ww&ixlib=rb-4.1.0&q=85",
    problem: "Shreeji Associates' listings were scattered across brokers and WhatsApp. Interested buyers couldn't reliably see availability, and inbound calls dropped 40% year over year.",
    solution: "A branded property portal with a lead-capture form, live listings CMS, WhatsApp integration and analytics for the sales team. Launched in 6 weeks.",
    features: ["Live listings with photo galleries", "Lead capture with WhatsApp routing", "Admin CMS for the sales team", "SEO-optimized city pages", "Google Analytics + Meta Pixel"],
    stack: ["Next.js", "Node.js", "MongoDB", "AWS", "Tailwind"],
    results: [
      { label: "More qualified leads", value: "+180%" },
      { label: "Time to close", value: "-32%" },
      { label: "Bounce rate", value: "-45%" },
    ],
    demo: "https://example.com/shreeji",
    github: "https://github.com/swarshah09",
  },
  {
    slug: "fitness-freak",
    name: "Fitness Freak",
    industry: "Fitness",
    tagline: "Member-first booking and coaching platform for a boutique gym.",
    cover: "https://images.unsplash.com/photo-1637430308606-86576d8fef3c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZ3ltJTIwZGFyayUyMGFlc3RoZXRpY3xlbnwwfHx8fDE3ODMxNTY1ODN8MA&ixlib=rb-4.1.0&q=85",
    problem: "The team relied on spreadsheets for class bookings and coaching sessions, leading to double-bookings, missed payments and frustrated members.",
    solution: "A full-stack membership platform with class scheduling, coach dashboards, payment automation and an AI progress assistant for members.",
    features: ["Class booking & waitlists", "Coach dashboards", "Payment automation", "AI progress assistant", "Mobile-first design"],
    stack: ["React", "Node.js", "PostgreSQL", "Stripe", "OpenAI"],
    results: [
      { label: "Retention improvement", value: "+62%" },
      { label: "Admin hours saved / week", value: "24h" },
      { label: "MRR growth", value: "+3.1×" },
    ],
    demo: "https://example.com/fitness-freak",
    github: "https://github.com/swarshah09",
  },
  {
    slug: "fampulse",
    name: "FamPulse",
    industry: "Startup / Health",
    tagline: "A family health hub that keeps everyone on the same page.",
    cover: "https://images.unsplash.com/photo-1720139290909-5f05410b20c6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwbW9kZXJuJTIwb2ZmaWNlJTIwZGFya3xlbnwwfHx8fDE3ODMxNTY1ODN8MA&ixlib=rb-4.1.0&q=85",
    problem: "Families managing chronic health across multiple members lost track of medication, appointments and reports scattered across apps and paper.",
    solution: "A single family health platform with role-based access, AI document extraction for reports, and reminders across WhatsApp and email.",
    features: ["Family roles & permissions", "AI report extraction", "Cross-channel reminders", "Doctor visit prep briefs", "Secure vault"],
    stack: ["Next.js", "FastAPI", "MongoDB", "OpenAI", "Twilio"],
    results: [
      { label: "Onboarded families (beta)", value: "1,200+" },
      { label: "Missed appointments", value: "-78%" },
      { label: "NPS", value: "72" },
    ],
    demo: "https://example.com/fampulse",
    github: "https://github.com/swarshah09",
  },
];

export const PROCESS_STEPS = [
  { title: "Discovery", body: "We map your business goals, users, constraints and what winning looks like." },
  { title: "Research", body: "Competitive audit, technical spikes and interviews to remove guesswork." },
  { title: "Planning", body: "Scoped roadmap with milestones, budget and clear success metrics." },
  { title: "Design", body: "Wireframes, then hi-fi visuals that make your brand feel premium." },
  { title: "Development", body: "Enterprise-grade builds shipped in weekly demos — never a mystery box." },
  { title: "Testing", body: "Automated + manual QA, performance and accessibility passes." },
  { title: "Deployment", body: "Zero-downtime launches with monitoring, backups and rollback plans." },
  { title: "Support", body: "Retainers for updates, growth features and 24/7 monitoring." },
];

export const TESTIMONIALS = [
  {
    quote: "Swar delivered our platform in half the time we'd budgeted with an agency, and it looks better than any of the mocks they showed us.",
    name: "Riya Malhotra",
    role: "Founder, Retail SaaS",
    avatar: "https://i.pravatar.cc/128?img=47",
  },
  {
    quote: "He genuinely understood our business before writing a line of code. That's rare and the reason our LTV is up 40%.",
    name: "Karan Iyer",
    role: "COO, Fitness Chain",
    avatar: "https://i.pravatar.cc/128?img=12",
  },
  {
    quote: "The AI features he integrated saved our support team 20 hours a week and improved CSAT. Worth every rupee.",
    name: "Anushka Patel",
    role: "Head of CX, Healthtech",
    avatar: "https://i.pravatar.cc/128?img=32",
  },
  {
    quote: "Consultant-grade thinking, engineer-grade delivery. We renewed his retainer before month one closed.",
    name: "Deepak Rao",
    role: "CEO, Real Estate Group",
    avatar: "https://i.pravatar.cc/128?img=68",
  },
];

export const FAQS = [
  {
    q: "How much does a project cost?",
    a: "Most engagements fall between ₹50,000 and ₹10,00,000 depending on scope. After a free consultation you'll get a fixed-price proposal with clear deliverables — no hourly surprises.",
  },
  {
    q: "How long will my project take?",
    a: "Landing sites: 1–2 weeks. Custom applications: 3–8 weeks. AI or automation systems: 2–6 weeks. Everything ships in weekly demos so you always know where we are.",
  },
  {
    q: "Do you provide ongoing maintenance?",
    a: "Yes. Every project ships with a 30-day support window and optional monthly retainers for updates, monitoring, backups and new features.",
  },
  {
    q: "What kind of support do you offer post-launch?",
    a: "Retainer clients get priority Slack/WhatsApp support, uptime monitoring, monthly performance reports and a dedicated queue for new features.",
  },
  {
    q: "Who owns the code and the IP?",
    a: "You do — 100%. On final payment the repository, credentials, cloud accounts and documentation are transferred to your team.",
  },
  {
    q: "Can you integrate AI into my existing product?",
    a: "Absolutely. I integrate OpenAI, Claude and Gemini into existing web and mobile apps for chat, document parsing, agents and analytics — with proper guardrails and cost controls.",
  },
];

export const TECH_STACK = [
  { name: "React", icon: "SiReact" },
  { name: "Next.js", icon: "SiNextdotjs" },
  { name: "Node.js", icon: "SiNodedotjs" },
  { name: "TypeScript", icon: "SiTypescript" },
  { name: "Java", icon: "FaJava" },
  { name: "Spring Boot", icon: "SiSpringboot" },
  { name: "MongoDB", icon: "SiMongodb" },
  { name: "PostgreSQL", icon: "SiPostgresql" },
  { name: "AWS", icon: "FaAws" },
  { name: "Docker", icon: "SiDocker" },
  { name: "OpenAI", icon: "LuSparkles" },
  { name: "Tailwind", icon: "SiTailwindcss" },
  { name: "Python", icon: "SiPython" },
  { name: "GraphQL", icon: "SiGraphql" },
  { name: "Redis", icon: "SiRedis" },
];

export const VALUES = [
  { title: "Clarity", body: "No jargon. You always know where your project is and what it's worth." },
  { title: "Craft", body: "Software that feels premium, because craft is a business moat." },
  { title: "Commitment", body: "I take a small number of clients so each one gets senior attention." },
];
