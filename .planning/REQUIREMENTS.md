# Requirements: mrhuang.ai Website

**Defined:** 2026-03-01
**Core Value:** Get a developer from "what is this?" to "MrHuang is running on my server" as fast as possible, while making them feel like they discovered the most unhinged useful thing on the internet.

## v1 Requirements

Requirements for initial launch. Each maps to roadmap phases.

### Foundation

- [x] **FOUND-01**: Site uses dark GitHub-style theme with NVIDIA green (#76b900) accent — all color tokens defined in Tailwind v4 `@theme` CSS block; dark text on green backgrounds (accessibility compliant)
- [x] **FOUND-02**: All pages are fully responsive from 375px mobile to 1440px desktop
- [x] **FOUND-03**: Sticky navigation bar includes site logo/name, links to Features / Install / Cost / GitHub, and a dynamic GitHub star count CTA
- [x] **FOUND-04**: Footer includes GitHub repo link, open-source license badge, "not affiliated with NVIDIA" attribution

### Landing Page — Hero

- [x] **HERO-01**: Hero section displays headline "Meet MrHuang" with sub-copy leaning into the "Super smart. Also kinda dumb. Amazing." paradox
- [x] **HERO-02**: Three AI-generated Jensen Huang persona cards displayed in hero — Mentor, Therapist, Life Coach — each with role label and brief description
- [x] **HERO-03**: Primary "Star on GitHub" CTA button in hero section
- [x] **HERO-04**: Self-aware meta-humorous tone applied throughout the landing page copy (e.g., "yes, this site was also written with MrHuang")

### Landing Page — Features

- [ ] **FEAT-01**: Features showcase section with cards for: AI Personas (Lifecoach / Mentor / Assistant), Persistent Knowledge Base, Voice Input (Deepgram transcription), WhatsApp Integration, Daily Journal, Dashboard with habit tracking
- [ ] **FEAT-02**: "Your data stays on your hardware" messaging prominently displayed with visual icon/badge
- [x] **FEAT-03**: "100% Open Source" badge and GitHub repo link in features or hero section

### Security Section

- [ ] **SEC-01**: Dedicated security section with data flow diagram showing: Browser → Cloudflare Tunnel → Home Server → Claude API (only outbound call)
- [ ] **SEC-02**: Security callout cards for: Zero Trust (Cloudflare Tunnel), PIN Protection (JWT, timing-safe), HMAC Webhook Verification, Path Traversal Protection, Zod schema validation
- [ ] **SEC-03**: Clear "your data never leaves your hardware" message anchoring the security section

### Install Guide

- [ ] **INST-01**: Install guide page at `/install` with 3-tier tab structure — Vibecoder (noob), Terminal User (intermediate), Bash Veteran (advanced)
- [ ] **INST-02**: Each tier tab contains TODO placeholder content with the tier name, target audience description, and "content coming soon" structure
- [x] **INST-03**: Code blocks throughout the site have copy-to-clipboard button and syntax highlighting (GitHub dark theme)

### Cost Breakdown

- [ ] **COST-01**: Static monthly cost breakdown section listing: Claude CLI Pro (~$20/mo), home server hardware estimate (existing NAS/PC or ~$5-15/mo VPS), domain ($10-15/yr), optional services (Deepgram, Google Calendar — free tiers noted)
- [ ] **COST-02**: Cost anchored against familiar alternatives (e.g., "Less than Netflix. More useful than a therapist.")

### Coming Soon

- [ ] **SOON-01**: "Coming Soon" teaser section for native apps — Mac, iOS, Android — with brief description and email/GitHub notification CTA

### SEO & Legal

- [ ] **SEO-01**: Each page has unique `<title>`, `<meta description>`, and Open Graph tags (title, description, image)
- [x] **SEO-02**: AI-generated image disclaimer on Jensen Huang persona cards — "AI-generated, not affiliated with NVIDIA or Jensen Huang"
- [ ] **SEO-03**: Site generates sitemap and robots.txt at build time

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Install Guide Content

- **INST-04**: Full Vibecoder tier install guide — complete copy-paste steps assuming zero terminal experience
- **INST-05**: Full Terminal User tier install guide — git clone, docker compose, env setup
- **INST-06**: Full Bash Veteran tier install guide — from-scratch setup with explanations of each component

### Interactive Cost Calculator

- **CALC-01**: Interactive cost calculator with sliders for: messages per day, file attachments per week, voice notes per week → live monthly cost estimate
- **CALC-02**: Model selector (Sonnet vs Opus) with cost impact

### Architecture Deep-Dive

- **ARCH-01**: Architecture overview page showing full tech stack (React 19, Express 5, SQLite, Deepgram, Cloudflare Tunnel, Tailscale)
- **ARCH-02**: Contributor guide / "How to contribute" section

### Media

- **MEDIA-01**: Screen recording or GIF walkthrough of MrHuang in action
- **MEDIA-02**: Final AI-generated Jensen Huang persona images (replacing placeholder silhouettes)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Light mode toggle | Dark only in v1 — brand identity is GitHub dark; adds complexity without launch benefit |
| Blog / CMS | Maintenance overhead for a solo developer; README and GitHub serve this purpose |
| User accounts on the website | The website is a marketing/docs site only; no MrHuang functionality here |
| Live demo / playground | Cost and liability (running Claude API for public demo); the install guide IS the demo path |
| Newsletter signup | Overhead for solo dev; GitHub Watch/Star is the notification mechanism |
| Competitor comparison page | Adversarial framing; "just run it and see" is the better conversion path |
| Backend / API | Purely static site; zero server-side logic on mrhuang.ai itself |
| i18n / localization | English only in v1 |
| NVIDIA trademarks or official logos | Legal risk; site is not affiliated with NVIDIA |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1: Foundation | Complete |
| FOUND-02 | Phase 1: Foundation | Complete |
| FOUND-03 | Phase 1: Foundation | Complete |
| FOUND-04 | Phase 1: Foundation | Complete |
| INST-03 | Phase 1: Foundation | Complete |
| HERO-01 | Phase 2: Landing Page | Complete |
| HERO-02 | Phase 2: Landing Page | Complete |
| HERO-03 | Phase 2: Landing Page | Complete |
| HERO-04 | Phase 2: Landing Page | Complete |
| FEAT-01 | Phase 2: Landing Page | Pending |
| FEAT-02 | Phase 2: Landing Page | Pending |
| FEAT-03 | Phase 2: Landing Page | Complete |
| SEC-01 | Phase 2: Landing Page | Pending |
| SEC-02 | Phase 2: Landing Page | Pending |
| SEC-03 | Phase 2: Landing Page | Pending |
| SOON-01 | Phase 2: Landing Page | Pending |
| SEO-02 | Phase 2: Landing Page | Complete |
| INST-01 | Phase 3: Content Pages | Pending |
| INST-02 | Phase 3: Content Pages | Pending |
| COST-01 | Phase 3: Content Pages | Pending |
| COST-02 | Phase 3: Content Pages | Pending |
| SEO-01 | Phase 4: SEO and Polish | Pending |
| SEO-03 | Phase 4: SEO and Polish | Pending |

**Coverage:**
- v1 requirements: 23 total
- Mapped to phases: 23
- Unmapped: 0

---
*Requirements defined: 2026-03-01*
*Last updated: 2026-03-01 after roadmap creation*
