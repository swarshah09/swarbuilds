# PRD — Swar Shah Personal Brand + Consultancy Site

## Original Problem Statement
Premium personal brand & software consultancy website for **Swar Shah** (AI & Full Stack Consultant, currently at Synechron). Goal: convert visitors into paying clients for ₹50k–₹10L engagements. Look must feel Apple + Linear + Stripe + Vercel — premium, minimal, dark-mode default, not "portfolio-y."

## User Personas
- **Startup founders / SaaS builders** shopping for a senior technical partner
- **SMB owners** (real estate, healthcare, fitness, restaurants) needing custom software / websites / automation
- **Return visitors / hiring managers** doing diligence via Blog + Case studies

## Locked Design System
- Colors: primary `#2563EB`, secondary `#7C3AED`, accent `#06B6D4`, near-black background
- Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (code)
- Dark mode default

## Architecture
- Frontend: React 19 + React Router 7 + Tailwind + shadcn/ui + Framer Motion + react-icons + react-fast-marquee + sonner
- Backend: FastAPI + Motor (MongoDB) + PyJWT + bcrypt + httpx
- Email: Emergent-managed Resend proxy
- Auth: JWT (Bearer) with single admin seeded from env

## Implemented (Dec 2025)
- Landing page with 13 sections (Hero, Trust, Industries, Services, Why Me, Projects, Process, Testimonials, FAQ, About, Tech Stack, Blog preview, Contact)
- 3 case study detail pages (Shreeji Associates, Fitness Freak, FamPulse)
- Blog listing + detail with lightweight Markdown rendering
- Contact form: MongoDB persistence + Resend email notification to `swarbuilds@gmail.com`
- Admin CMS at `/admin` (login → posts CRUD + submissions viewer). Admin auth: `admin@swarshah.dev` / `SwarAdmin@2025`
- Global UX: sticky "Let's build something" CTA, back-to-top, cursor glow, fixed nav with scroll blur, custom loading screen
- SEO: OG/Twitter meta, JSON-LD Person schema, Google Fonts preconnect
- 3 seed blog posts, deterministic slugs

## Prioritized Backlog
- **P1**: Real Calendly link + WhatsApp Business proof, real project screenshots + client logos, custom OG images per case study
- **P1**: Analytics (Plausible/GA4) + Meta pixel wiring in `public/index.html`
- **P2**: Rich Markdown editor (TipTap / MDX) inside `/admin`, image upload endpoint
- **P2**: `/services/[slug]` pages for SEO on individual services
- **P2**: Sitemap + robots.txt generation, per-page dynamic OG tags
- **P3**: Newsletter signup + drip, email templates for auto-reply on contact submission
- **P3**: Password reset endpoint, brute-force lockout (endpoints exist in playbook, not yet wired)

## Next Tasks
1. Swap placeholder Calendly link (`content.js` → `SITE.calendly`) with real one
2. Replace stock case study covers with real project screenshots
3. Add real testimonials or remove until obtained
4. Configure custom domain + Vercel-quality deployment
