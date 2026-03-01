# Roadmap: mrhuang.ai

## Overview

This roadmap delivers the mrhuang.ai marketing and documentation website in four phases. Phase 1 establishes the design system, layout shell, and deployment pipeline -- the skeleton everything hangs on. Phase 2 builds the full landing page (hero, features, security, coming soon) -- the site's public face and primary conversion surface. Phase 3 adds the content pages that convert interest into action (install guide structure, cost breakdown). Phase 4 closes with SEO metadata, sitemap generation, and performance polish so the site is discoverable and fast when shared on HN/Reddit/Twitter.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Design system, responsive layout shell, navigation, footer, code block component, and Cloudflare Pages deploy pipeline
- [ ] **Phase 2: Landing Page** - Hero with persona cards, features showcase, security section, coming soon teaser, open-source messaging, and legal disclaimers
- [ ] **Phase 3: Content Pages** - Install guide page with 3-tier tab structure (placeholder content) and static cost breakdown section
- [ ] **Phase 4: SEO and Polish** - Per-page meta/OG tags, sitemap, robots.txt, and performance audit

## Phase Details

### Phase 1: Foundation
**Goal**: A deployable site skeleton with correct theming, responsive layout, navigation, and code block infrastructure -- so every subsequent phase builds on proven foundations rather than fighting config issues
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, INST-03
**Success Criteria** (what must be TRUE):
  1. Visiting the deployed URL shows a dark-themed page with NVIDIA green accents, and text on green backgrounds is readable (dark text, not white)
  2. The sticky navigation bar displays the site name, links to Features / Install / Cost / GitHub, and a GitHub star count CTA -- and it remains visible on scroll
  3. The footer displays the GitHub repo link, open-source license badge, and "not affiliated with NVIDIA" attribution on every page
  4. The site renders correctly from 375px mobile to 1440px desktop without horizontal overflow or broken layouts
  5. Code blocks anywhere on the site display syntax highlighting in the GitHub dark theme and include a working copy-to-clipboard button
**Plans**: 4 plans

Plans:
- [ ] 01-01-PLAN.md — Next.js 16 scaffold, Tailwind v4 @theme design tokens, static export config
- [ ] 01-02-PLAN.md — Sticky nav with GitHub stars CTA + footer with NVIDIA attribution
- [ ] 01-03-PLAN.md — CodeBlock server component with shiki highlighting + CopyButton client component
- [ ] 01-04-PLAN.md — Root layout wiring, homepage stub, build verification, human visual check

### Phase 2: Landing Page
**Goal**: Visitors landing on mrhuang.ai see a complete, compelling landing page that communicates what MrHuang is, shows the three personas, highlights features and security, and drives them toward the GitHub repo
**Depends on**: Phase 1
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04, FEAT-01, FEAT-02, FEAT-03, SEC-01, SEC-02, SEC-03, SOON-01, SEO-02
**Success Criteria** (what must be TRUE):
  1. The hero section displays the "Meet MrHuang" headline with self-aware humorous sub-copy, three Jensen Huang persona cards (Mentor, Therapist, Life Coach -- placeholders acceptable), and a prominent "Star on GitHub" CTA button
  2. Scrolling past the hero reveals a features showcase with cards for AI Personas, Knowledge Base, Voice Input, WhatsApp, Journal, and Dashboard -- plus visible "Your data stays on your hardware" messaging and a "100% Open Source" badge linking to GitHub
  3. A dedicated security section shows a data flow diagram (Browser to Cloudflare Tunnel to Home Server to Claude API) and callout cards for Zero Trust, PIN Protection, HMAC Verification, Path Traversal Protection, and Zod Validation
  4. A "Coming Soon" section teases native apps (Mac, iOS, Android) with a notification CTA
  5. The Jensen Huang persona cards include an "AI-generated, not affiliated with NVIDIA" disclaimer
**Plans**: TBD

Plans:
- [ ] 02-01: TBD
- [ ] 02-02: TBD
- [ ] 02-03: TBD

### Phase 3: Content Pages
**Goal**: Interested visitors can navigate to dedicated pages for installation guidance and cost understanding -- the two pieces of information that convert "this looks cool" into "I'm setting this up"
**Depends on**: Phase 2
**Requirements**: INST-01, INST-02, COST-01, COST-02
**Success Criteria** (what must be TRUE):
  1. Visiting `/install` shows a page with three selectable tabs -- Vibecoder, Terminal User, Bash Veteran -- each displaying its target audience description and placeholder "content coming soon" structure
  2. The cost breakdown section lists monthly costs (Claude CLI Pro, server hardware, domain, optional services with free tiers noted) and anchors the total against familiar comparisons ("Less than Netflix")
**Plans**: TBD

Plans:
- [ ] 03-01: TBD

### Phase 4: SEO and Polish
**Goal**: The site is discoverable and shareable -- every page has proper metadata for search engines and social sharing, and the site generates a sitemap for crawlers
**Depends on**: Phase 3
**Requirements**: SEO-01, SEO-03
**Success Criteria** (what must be TRUE):
  1. Every page has a unique `<title>`, `<meta description>`, and Open Graph tags (title, description, image) so links shared on social media display rich previews
  2. The site generates a `sitemap.xml` and `robots.txt` at build time, both accessible at their standard URLs on the deployed site
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/4 | In Progress|  |
| 2. Landing Page | 0/? | Not started | - |
| 3. Content Pages | 0/? | Not started | - |
| 4. SEO and Polish | 0/? | Not started | - |
