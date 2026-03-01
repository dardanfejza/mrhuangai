# Project Research Summary

**Project:** mrhuang.ai — Open-source AI companion marketing + documentation website
**Domain:** Open-source project marketing site with tiered install documentation and interactive tooling
**Researched:** 2026-03-01
**Confidence:** HIGH

## Executive Summary

The mrhuang.ai website is a static marketing and documentation site for an open-source, self-hosted AI companion powered by Claude. Research across all four areas converges on a single, well-validated approach: Next.js 16 with static export (`output: 'export'`), deployed to Cloudflare Pages. This combination is the industry standard for developer-focused OSS marketing sites and is fully documented with official support. The stack is not in flux — every major technology choice (Next.js 16, Tailwind CSS v4, shadcn/ui, Motion 12) is a stable, current release with high confidence from official sources. There is no need to second-guess the core technology decisions.

The site's most distinctive feature — the Jensen Huang AI persona cards — is also its highest-risk creative choice. The three-tier install guide (Noob / Terminal User / Veteran) is the most time-intensive content effort, not the most technically complex one. The interactive cost calculator is the most technically complex interactive component on the site. Research confirms the feature set is achievable without any server-side backend: all interactivity (calculator, tab switching, copy buttons) runs client-side, and all content is compiled at build time from MDX files. The architecture is pure SSG with "islands" of client interactivity.

The primary risks are not technical — they are design and content risks. Using NVIDIA green (#76b900) incorrectly as a button background with white text will fail WCAG accessibility checks. Using the default Next.js image loader will break the build. Deploying without `trailingSlash: true` will produce 404s on Cloudflare Pages. All three are Phase 1 mistakes that must be prevented at the foundation stage. The Jensen Huang likeness risk is real but manageable if imagery is kept modular and a clear AI-generated disclaimer is included.

## Key Findings

### Recommended Stack

The full stack is Next.js 16 (static export) + React 19 + TypeScript 5 + Tailwind CSS v4 + shadcn/ui, deployed to Cloudflare Pages via `pnpm`. This combination requires zero backend infrastructure — the entire site is compiled to static HTML/CSS/JS and served from Cloudflare's global CDN. The stack is specifically tuned for the static export constraint: `next-image-export-optimizer` handles build-time image optimization (required because Next.js default image optimization is a server feature), and `@next/mdx` with `gray-matter` handles the small volume of documentation content (5-10 MDX files do not warrant a full CMS or Velite).

One critical naming distinction: the animation library is `motion` (not `framer-motion`). The `framer-motion` package name is a deprecated compatibility shim — install `motion` directly. Similarly, Tailwind CSS v4 eliminates `tailwind.config.js` in favor of `@theme` blocks in CSS — do not copy any v3 configuration patterns.

**Core technologies:**
- **Next.js 16.x** (static export): Framework, routing, SSG — industry standard, App Router stable, Turbopack default
- **React 19.x**: Ships with Next.js 16; React Compiler eliminates manual memoization
- **TypeScript 5.x**: Non-negotiable type safety; first-class Next.js support
- **Tailwind CSS v4.2.x**: CSS-first `@theme` configuration; define NVIDIA green and GitHub dark tokens in `globals.css`
- **shadcn/ui** (latest): Source-copied components; full customization for GitHub-dark aesthetic; unified `radix-ui` package since Feb 2026
- **Motion 12.x**: Declarative animation for persona cards, scroll effects, hero — install as `motion`, not `framer-motion`
- **@next/mdx + gray-matter + rehype-pretty-code**: MDX pipeline for install guides and feature docs; Shiki provides `github-dark` syntax highlighting
- **next-image-export-optimizer**: Required for build-time image optimization in static export mode
- **next-themes 0.4.6**: Dark mode management (force dark only for v1); shadcn/ui dependency
- **Cloudflare Pages**: Free tier hosting; unlimited bandwidth; static export via `output: 'export'`
- **pnpm 9.x**: Faster installs; used by Next.js core team

**What not to use:** `framer-motion`, Contentlayer (abandoned), `next-on-pages` (deprecated), CSS-in-JS, `react-icons` (not tree-shakable), Tailwind CSS v3, `next export` command (removed in Next.js 14).

See full details: `.planning/research/STACK.md`

### Expected Features

The site must deliver two distinct value categories: table stakes (what every OSS marketing site must have to avoid immediate bounce) and differentiators (what makes mrhuang.ai memorable and shareable). The MVP is the ten P1 features; P2 features follow post-launch validation.

**Must have (table stakes — P1 launch blockers):**
- **Dark theme + design system** — foundation for everything; NVIDIA green (#76b900) + GitHub dark (#0d1117) tokens
- **Hero section with Jensen Huang persona cards** — the "screenshot moment" that defines brand identity
- **Sticky navigation** — four to five items: Features, Install, Cost Calculator, GitHub star count
- **Features showcase** — card grid of MrHuang capabilities (personas, knowledge base, WhatsApp, journaling, voice, dashboard)
- **Single-path install guide** — Terminal User tier as MVP; copy-paste commands with syntax highlighting and copy buttons
- **Dynamic GitHub star CTA** — in navbar AND hero; primary conversion metric
- **Open-source + privacy messaging** — "100% Open Source" badge + "Your data stays on your hardware"
- **Footer** — GitHub, social links, attribution
- **SEO + Open Graph tags** — required for HN/Reddit/Twitter launch sharing
- **Responsive design** — must work at 375px (mobile) through 1440px (desktop)

**Should have (competitive differentiators — P2, add post-launch):**
- **3-tier install guide** (Noob / Terminal / Veteran) — no other OSS AI project does this; highest content effort
- **Interactive cost calculator** — unique in personal-AI OSS space; sliders for usage level and hosting type
- **Security deep-dive section** — dedicated section with data flow diagram; "your data never leaves your hardware"
- **Animated hero effects** — parallax persona cards, NVIDIA green glow, typing animation for install command
- **Architecture/tech stack overview** — attracts contributors; shows Claude + Node + React + SQLite stack

**Defer (v2+):**
- "Coming soon" native apps teaser (only when in active development)
- Screen recording / video walkthrough (requires polished stable product)
- MDX-based full documentation site (only if README outgrows usefulness)
- Discord community integration, i18n

**Anti-features (do not build for v1):** light/dark toggle, blog/CMS, user accounts/auth, live demo/playground, newsletter signup, pricing page, comparison page vs competitors.

See full details: `.planning/research/FEATURES.md`

### Architecture Approach

The architecture follows a strict Server Component default / Client Island pattern. Every page is a React Server Component rendered at build time to static HTML. Only interactive leaves — the cost calculator, tab switchers, copy buttons, and mobile nav toggle — use `'use client'`. This produces minimal client JavaScript while preserving full interactivity. MDX content lives in `src/content/` (not directly as route pages) and is imported into page components in `src/app/`, giving full control over layout, metadata, and surrounding UI without fighting MDX-as-page conventions.

Route groups (`(marketing)` and `(docs)`) separate the full-bleed landing page layout from the sidebar docs layout without affecting URLs. Dynamic routes for install tiers and feature deep-dives use `generateStaticParams()` to enumerate all pages at build time — required for static export compatibility. The cost calculator uses no API calls; all pricing data is defined in TypeScript constants bundled into client JS.

**Major components:**
1. **Root Layout** (`src/app/layout.tsx`) — HTML shell, dark theme via ThemeProvider, font loading, global nav/footer
2. **(marketing) Layout** — full-bleed, no sidebar; wraps landing page and cost calculator
3. **(docs) Layout** — sidebar navigation + constrained content width; wraps install guides and feature docs
4. **Hero Section** — Server Component with PersonaCards as Client sub-component (animation boundary)
5. **Features Showcase** — Server Component, data-driven from static array
6. **Install Guide Tier Router** — dynamic `[tier]` routes pre-rendered for beginner/intermediate/advanced
7. **Cost Calculator** — `'use client'` Component; pure function of React state; no network requests
8. **MDX Renderer** — `mdx-components.tsx` global config; rehype-pretty-code for syntax highlighting
9. **Code Block** — Client Component for copy-to-clipboard; syntax highlighting from Shiki `github-dark` theme
10. **Navigation + Footer** — Server Components; no client routing state needed

See full details: `.planning/research/ARCHITECTURE.md`

### Critical Pitfalls

Six pitfalls carry significant risk; three must be resolved in Phase 1 before any other work begins.

1. **White text on NVIDIA green backgrounds fails WCAG AA** — #76b900 with white text yields 2.04:1 contrast (need 4.5:1). Fix: use dark text (`text-gray-950`) on green backgrounds. Establish this rule in the design system before building any UI components.

2. **Default `next/image` breaks static export** — The default image optimization loader requires a Node.js server. Setting `images: { unoptimized: true }` ships multi-megabyte images to mobile, destroying LCP. Fix: use `next-image-export-optimizer` or pre-optimize WebP images and serve them from `public/` with plain `<img>` tags.

3. **Static hosting returns 404 on page refresh** — Without `trailingSlash: true` in `next.config.mjs`, direct URL access to any route other than `/` returns 404 on Cloudflare Pages. Fix: set `trailingSlash: true` and add a `_redirects` file for Cloudflare Pages before creating any routes.

4. **Tailwind CSS v4 config migration confusion** — v3 `tailwind.config.js` patterns do not work in v4. Custom brand colors must be defined in `@theme` blocks in CSS, not in a JavaScript config file. Starting from a v3 template will produce silent failures. Fix: start fresh with v4 from day one.

5. **AI-generated celebrity likeness legal exposure** — Jensen Huang images carry right-of-publicity risk. Fix: include an explicit "AI-generated, not affiliated with NVIDIA" disclaimer; design persona imagery as a swappable module (passed as props, not hardcoded throughout); use no official NVIDIA trademarks.

6. **Hydration mismatches in the cost calculator** — The calculator's initial render must be identical on server and client. Browser-only APIs (`localStorage`, `window`) in initial render cause hydration errors. Fix: use `dynamic(() => import('./Calculator'), { ssr: false })` to skip SSR for the calculator entirely; show a loading skeleton until hydration.

See full details: `.planning/research/PITFALLS.md`

## Implications for Roadmap

Research across all four files converges on the same five-phase sequence suggested in ARCHITECTURE.md. The ordering is dictated by hard dependencies: the design system must exist before any component can be styled; the landing page must be built before the docs sections because it defines the visual language; MDX infrastructure must precede content writing; the calculator extends established patterns and can be built in parallel with docs content; polish (animations, SEO, performance) must come last because it depends on final assets.

### Phase 1: Foundation
**Rationale:** Everything depends on this. The Tailwind v4 `@theme` color system, static export configuration, routing setup, dark theme, and base layout must be correct before any feature is attempted. Three of the six critical pitfalls (accessibility contrast, image optimization, 404 on refresh, Tailwind v4 config) are Phase 1 mistakes that are expensive to fix later.
**Delivers:** Deployable skeleton — blank pages with correct theme, navigation, and footer; correct Cloudflare Pages build pipeline
**Addresses:** Dark theme + design system (P1), sticky navigation (P1), footer (P1), responsive scaffold (P1)
**Avoids:** Tailwind v4 config confusion, static export 404s, image optimization build failures, green-on-white accessibility failures
**Research flag:** No deeper research needed — patterns are well-documented and official.

### Phase 2: Landing Page
**Rationale:** The landing page is the highest-visibility deliverable and defines the brand identity that all subsequent pages inherit. Jensen Huang persona cards are the visual "screenshot moment" — without final images, placeholders are acceptable for development. Content strategy (self-aware humorous tone) must be applied in this phase.
**Delivers:** Full landing page — hero with persona cards, features showcase, security section, open-source CTA, GitHub star button
**Addresses:** Hero + persona cards (P1), features showcase (P1), GitHub star CTA (P1), open-source/privacy messaging (P1), SEO + OG tags (P1)
**Avoids:** Celebrity likeness risk (disclaimer text, modular image architecture), mobile responsiveness failures
**Research flag:** No deeper research needed — OSS marketing site patterns are well-documented. Persona image assets must be provided by creator before this phase is complete.

### Phase 3: Documentation Infrastructure + Install Guide
**Rationale:** The three-tier install guide is the site's most time-intensive content effort and the most direct path to user adoption. The MDX pipeline, sidebar layout, dynamic routing with `generateStaticParams`, and code block components must all be established before install content is written.
**Delivers:** Tiered install guide at `/install/beginner`, `/install/intermediate`, `/install/advanced` with sidebar navigation, copy-to-clipboard code blocks, syntax highlighting, step indicators
**Addresses:** Single-path install guide (P1 → expands to 3-tier in this phase), code block component (P1), install guide UX (tier self-selection)
**Avoids:** Hydration mismatches in copy buttons (Client Component isolation), 404s on tier sub-routes (generateStaticParams required)
**Research flag:** No deeper research needed — Next.js MDX + generateStaticParams patterns are fully documented.

### Phase 4: Feature Docs + Cost Calculator
**Rationale:** Feature deep-dive pages extend the routing pattern established in Phase 3 (dynamic `[slug]` parallels `[tier]`). The cost calculator is the most complex interactive component but is self-contained — it requires no infrastructure from other phases beyond the base layout. Both can proceed in parallel.
**Delivers:** Feature documentation at `/features/[slug]` for each MrHuang capability; interactive cost calculator at `/cost` with sliders for usage level and hosting type
**Addresses:** Interactive cost calculator (P2), security deep-dive section (P2), architecture overview (P2), feature docs (P3)
**Avoids:** Calculator hydration mismatches (use `dynamic` with `ssr: false`), calculator showing wrong initial state (consistent static defaults)
**Research flag:** No deeper research needed for routing. Calculator pricing data should be verified against current Anthropic API pricing before launch.

### Phase 5: Polish, SEO, and Performance
**Rationale:** Animations, final images, SEO metadata, and performance audits must come last — they depend on all other content being in place. Running a Lighthouse audit against placeholder images or incomplete pages produces misleading results.
**Delivers:** Motion scroll animations on landing sections, persona card hover effects, NVIDIA green glow, final AI persona images replacing placeholders, complete OG images for all routes, sitemap, robots.txt, Lighthouse score >= 90 on mobile
**Addresses:** Animated hero effects (P2), architecture overview visual (P2), image optimization (replace `next-image-export-optimizer` placeholders with final assets)
**Avoids:** LCP failures from unoptimized hero images, missing per-page OG images, keyboard accessibility gaps on interactive elements
**Research flag:** No deeper research needed. Performance benchmarks are standard — LCP < 2.5s, CLS < 0.1, Lighthouse 90+.

### Phase Ordering Rationale

- **Design system before everything:** NVIDIA green contrast rules and Tailwind v4 `@theme` tokens must be defined once, correctly, before any component is built. Retrofitting color contrast rules after 50 components exist is expensive.
- **Landing page before docs:** The hero and features sections define the visual vocabulary (card styles, typography scale, spacing rhythm) that docs pages inherit. Building docs first produces visual inconsistency.
- **MDX infrastructure before content:** The MDX pipeline (`@next/mdx`, `rehype-pretty-code`, `gray-matter`, `mdx-components.tsx`) must be proven to build correctly before install guide content is authored. Writing content before the pipeline is validated wastes effort if compilation fails.
- **Calculator after docs infrastructure:** The calculator is a Client Component island — it has no dependency on MDX or routing infrastructure. But building it in Phase 4 (rather than Phase 2) avoids scope creep before the core marketing surface exists.
- **Polish last:** Final AI persona images from the creator are an external dependency. Animations and performance audits against placeholder images are wasted work.

### Research Flags

**Phases with standard patterns (skip `/gsd:research-phase`):**
- **Phase 1 (Foundation):** Next.js static export + Tailwind v4 + Cloudflare Pages is fully documented. No ambiguity.
- **Phase 2 (Landing Page):** OSS marketing site patterns are well-established. shadcn/ui + Motion animations are documented.
- **Phase 3 (Install Guide):** Next.js MDX + generateStaticParams is fully documented. No niche integration needed.
- **Phase 4 (Docs + Calculator):** Extends Phase 3 patterns. Calculator is pure client-side React state — no novel integration.
- **Phase 5 (Polish):** Standard Lighthouse/performance work. No research needed.

**Phases needing attention (not research, but external dependencies):**
- **Phase 2:** Jensen Huang AI persona images must be provided by the creator before the hero section is visually complete.
- **Phase 4:** Anthropic API pricing data in the cost calculator's `pricing-data.ts` must be manually verified against current Anthropic pricing at time of implementation and updated quarterly thereafter.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified from official sources (npm, official docs, release notes). Every technology is stable and current. The only MEDIUM-confidence items are `next-image-export-optimizer` and `rehype-pretty-code` — both are actively maintained and widely used, but lack official Next.js endorsement. |
| Features | HIGH | Feature expectations derived from direct observation of Supabase, Ollama, Tabby, Replicate, LangChain, Vercel, shadcn/ui. Anti-features are well-justified against the constraints of a solo OSS developer project. |
| Architecture | HIGH | Patterns sourced from official Next.js 16 documentation (updated 2026-02-27). Server Component default + Client Island architecture is the canonical App Router approach. Static export `generateStaticParams` pattern is fully documented. |
| Pitfalls | HIGH | Contrast ratios calculated using the W3C relative luminance formula (mathematical verification). Static export limitations confirmed from official Next.js docs. Tailwind v4 migration confirmed from official Tailwind blog. Legal risk assessment is MEDIUM (inherently uncertain). |

**Overall confidence:** HIGH

### Gaps to Address

- **Final persona images:** The visual centerpiece of the site (Jensen Huang AI-generated persona images for Mentor, Therapist, Life Coach) is an external creative dependency. Development should proceed with labeled placeholder silhouettes; final images replace placeholders in Phase 5.
- **Anthropic API pricing accuracy:** The cost calculator's pricing constants should be verified against Anthropic's current pricing page at implementation time. Prices in research are directionally correct but may shift. Set a quarterly reminder to update `pricing-data.ts`.
- **Cloudflare Pages `_redirects` file format:** The specific syntax for Cloudflare Pages fallback routing should be verified in Cloudflare documentation during Phase 1 deployment. The `trailingSlash: true` + `_redirects` combination is well-documented but requires a working test to confirm no edge cases.
- **GitHub star count freshness:** The dynamic GitHub star count in the navbar/hero uses either `ghbtns.com` (iframe embed) or a build-time GitHub API fetch. Build-time fetch is preferred (no external dependency at runtime, no rate limiting) but will show a slightly stale count between deploys. Decide the approach in Phase 2 based on acceptable staleness.

## Sources

### Primary (HIGH confidence)
- [Next.js Static Exports (official, v16.1.6)](https://nextjs.org/docs/app/guides/static-exports) — static export config, limitations, generateStaticParams
- [Next.js Project Structure (official)](https://nextjs.org/docs/app/getting-started/project-structure) — App Router conventions, route groups
- [Next.js MDX Guide (official)](https://nextjs.org/docs/app/guides/mdx) — MDX pipeline, mdx-components.tsx
- [Tailwind CSS v4.0 Announcement](https://tailwindcss.com/blog/tailwindcss-v4) — CSS-first @theme config, migration from v3
- [Tailwind CSS npm](https://www.npmjs.com/package/tailwindcss) — v4.2.1 version confirmation
- [shadcn/ui Changelog](https://ui.shadcn.com/docs/changelog) — unified radix-ui package (Feb 2026)
- [shadcn/ui Dark Mode with Next.js](https://ui.shadcn.com/docs/dark-mode/next) — next-themes integration
- [Motion npm](https://www.npmjs.com/package/motion) — v12.34.3, framer-motion to motion migration
- [Cloudflare Pages Static Next.js](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/) — deployment configuration
- [WCAG 2.1 Contrast Requirements](https://www.w3.org/WAI/GL/WCAG3/2022/how-tos/visual-contrast-of-text/) — contrast ratio requirements and calculation
- [Next.js Hydration Error docs](https://nextjs.org/docs/messages/react-hydration-error) — hydration mismatch prevention
- [Vercel Blog: Common Next.js App Router Mistakes](https://vercel.com/blog/common-mistakes-with-the-next-js-app-router-and-how-to-fix-them) — pitfall patterns
- [Lucide React npm](https://www.npmjs.com/package/lucide-react) — v0.575.0, 29M+ weekly downloads
- [next-themes npm](https://www.npmjs.com/package/next-themes) — v0.4.6 confirmation
- [GitHub Buttons (ghbtns.com)](https://ghbtns.com/) — dynamic star count embed

### Secondary (MEDIUM confidence)
- [next-image-export-optimizer (GitHub)](https://github.com/Niels-IO/next-image-export-optimizer) — build-time image optimization for static export
- [Rehype Pretty Code docs](https://rehype-pretty.pages.dev/) — syntax highlighting integration
- [Supabase](https://supabase.com), [Ollama](https://ollama.com), [Tabby](https://tabbyml.com), [Replicate](https://replicate.com), [LangChain](https://langchain.com), [Vercel](https://vercel.com) — competitor feature analysis
- [DocsBot AI Pricing Calculator](https://docsbot.ai/tools/gpt-openai-api-pricing-calculator) — cost calculator UX patterns
- [Smashing Magazine — Inclusive Dark Mode](https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/) — accessibility requirements
- [NetBird](https://netbird.io) — zero-trust security messaging patterns
- [Tailwind CSS v4 Migration Discussion (GitHub)](https://github.com/tailwindlabs/tailwindcss/discussions/16517) — v3 to v4 migration edge cases

### Tertiary (LOW confidence)
- [Helicone LLM Cost Calculator](https://www.helicone.ai/llm-cost) — multi-model cost comparison UX patterns
- [AI Marketing and Copyright Legal Risks](https://www.techcxo.com/ai-marketing-copyright-legal-risks/) — right-of-publicity framing
- [Lapa Ninja Open Source Category](https://www.lapa.ninja/category/open-source/) — open-source landing page design patterns

---
*Research completed: 2026-03-01*
*Ready for roadmap: yes*
