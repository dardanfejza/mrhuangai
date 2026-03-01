# Architecture Research

**Domain:** Next.js open-source marketing + documentation website (static export)
**Researched:** 2026-03-01
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     Presentation Layer                          │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌────────────┐  │
│  │  Landing   │  │  Install  │  │ Features/ │  │   Cost     │  │
│  │  Page      │  │  Guides   │  │ Docs      │  │ Calculator │  │
│  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘  └──────┬─────┘  │
│        │              │              │               │          │
├────────┴──────────────┴──────────────┴───────────────┴──────────┤
│                     Layout Layer                                │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Root Layout (html/body, dark theme, global nav/footer)  │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │  (marketing) Layout   │   (docs) Layout + Sidebar       │   │
│  └──────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                     Component Layer                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │  UI/Base  │  │ Sections │  │   MDX    │  │ Interactive  │   │
│  │ (Button,  │  │ (Hero,   │  │ Content  │  │ (Calculator, │   │
│  │  Card)    │  │ Feature) │  │ Renderer │  │  TabSwitch)  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                     Content Layer                               │
│  ┌──────────────┐  ┌───────────────┐  ┌────────────────────┐   │
│  │ MDX Install  │  │ MDX Features/ │  │ Static Data (cost  │   │
│  │ Guides (x3)  │  │ Docs Pages    │  │ tiers, features)   │   │
│  └──────────────┘  └───────────────┘  └────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                     Static Assets                               │
│  ┌──────────────┐  ┌───────────────┐  ┌────────────────────┐   │
│  │ Jensen Huang │  │ Icons/SVGs    │  │ Fonts              │   │
│  │ AI Images    │  │               │  │                    │   │
│  └──────────────┘  └───────────────┘  └────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                           │
                    ┌──────┴──────┐
                    │ Static HTML │  (output: 'export')
                    │  CSS / JS   │  deployed to Cloudflare
                    │  out/       │  Pages or Vercel
                    └─────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Root Layout | HTML shell, dark theme class, global nav, footer, metadata, font loading | `src/app/layout.tsx` - Server Component, wraps all routes |
| (marketing) Layout | Optional shared layout for landing page sections | `src/app/(marketing)/layout.tsx` - adds marketing-specific styles/nav |
| (docs) Layout | Sidebar navigation, breadcrumbs, docs-specific chrome | `src/app/(docs)/layout.tsx` - sidebar + content area grid |
| Hero Section | Persona cards (Mentor/Therapist/Coach), headline, CTA | Server Component with Client sub-components for animation |
| Feature Showcase | Grid of feature cards with icons/descriptions | Server Component, data-driven from static array |
| Install Guide | Tier-routed documentation with code blocks, copy buttons | MDX pages rendered per tier, Client Components for tabs/copy |
| Cost Calculator | Interactive monthly cost breakdown | `'use client'` Component with React state, zero API calls |
| Security Section | Zero-trust emphasis, visual trust indicators | Server Component, static content |
| MDX Renderer | Styled MDX output with custom components | `mdx-components.tsx` global config + Tailwind typography |
| Navigation | Site header with logo, route links, GitHub link | Server Component (no client-side routing state needed) |
| Footer | Links, open-source badge, GitHub link | Server Component, static content |

## Recommended Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: html, body, dark theme, fonts
│   ├── page.tsx                # Landing page (imports section components)
│   ├── not-found.tsx           # Custom 404
│   ├── sitemap.ts              # Generated sitemap
│   ├── robots.ts               # Generated robots.txt
│   ├── (marketing)/            # Route group (no URL impact)
│   │   └── layout.tsx          # Marketing pages layout (optional if same as root)
│   ├── install/
│   │   ├── page.tsx            # Install guide index (tier selector)
│   │   └── [tier]/
│   │       ├── page.tsx        # Dynamic install guide per tier
│   │       └── generateStaticParams  # Pre-renders: beginner, intermediate, advanced
│   ├── features/
│   │   ├── page.tsx            # Features overview / docs landing
│   │   └── [slug]/
│   │       └── page.tsx        # Individual feature deep-dive (from MDX)
│   └── cost/
│       └── page.tsx            # Cost calculator page
├── components/
│   ├── ui/                     # Atomic UI primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── code-block.tsx      # Syntax-highlighted code with copy button
│   │   ├── tabs.tsx            # Tab switcher (for tier selection, OS tabs)
│   │   └── tooltip.tsx
│   ├── sections/               # Landing page sections (composed from ui/)
│   │   ├── hero.tsx            # Persona cards + headline + CTA
│   │   ├── features.tsx        # Feature grid showcase
│   │   ├── security.tsx        # Zero-trust section
│   │   ├── coming-soon.tsx     # Native apps teaser
│   │   └── open-source-cta.tsx # GitHub CTA section
│   ├── layout/                 # Structural components
│   │   ├── header.tsx          # Site header/nav
│   │   ├── footer.tsx          # Site footer
│   │   ├── docs-sidebar.tsx    # Docs/features sidebar nav
│   │   └── mobile-nav.tsx      # Mobile hamburger menu ('use client')
│   ├── calculator/             # Cost calculator feature
│   │   ├── calculator.tsx      # Main calculator ('use client')
│   │   ├── slider.tsx          # Usage slider input
│   │   ├── cost-breakdown.tsx  # Line-item cost display
│   │   └── pricing-data.ts     # Static pricing constants
│   └── docs/                   # Documentation-specific components
│       ├── install-tabs.tsx    # Tier/OS tab switcher ('use client')
│       ├── copy-button.tsx     # Code copy button ('use client')
│       └── step-indicator.tsx  # Step progress indicator
├── content/                    # MDX content files
│   ├── install/
│   │   ├── beginner.mdx        # Noob vibecoder guide
│   │   ├── intermediate.mdx   # Terminal-comfortable guide
│   │   └── advanced.mdx       # Bash/zsh veteran guide
│   └── features/
│       ├── ai-personas.mdx     # Feature deep-dive pages
│       ├── knowledge-base.mdx
│       ├── whatsapp.mdx
│       ├── journal.mdx
│       ├── dashboard.mdx
│       └── voice.mdx
├── lib/
│   ├── content.ts              # MDX content loading helpers
│   ├── metadata.ts             # Shared metadata generation helpers
│   └── constants.ts            # Brand colors, URLs, config constants
├── styles/
│   └── globals.css             # Tailwind directives, CSS custom properties
├── types/
│   └── index.ts                # Shared TypeScript types
└── public/
    ├── images/
    │   ├── personas/           # Jensen Huang AI-generated images
    │   │   ├── mentor.webp
    │   │   ├── therapist.webp
    │   │   └── coach.webp
    │   ├── og/                 # Open Graph images
    │   └── icons/              # Feature icons, favicons
    └── fonts/                  # Self-hosted fonts (if any)
```

### Structure Rationale

- **`src/app/`:** App Router convention. Route groups `(marketing)` separate layout concerns without URL changes. Dynamic `[tier]` and `[slug]` routes pre-rendered via `generateStaticParams` for static export compatibility.
- **`src/components/`:** Three-tier organization: `ui/` (design system atoms), `sections/` (landing page compositions), `layout/` (structural chrome). This keeps the distinction clear between reusable primitives and page-specific compositions.
- **`src/content/`:** MDX files live outside `app/` and are imported into page components. This gives full control over the page wrapper, layout, and metadata rather than relying on MDX-as-page (which limits layout control). Content is treated as data, not routing.
- **`src/lib/`:** Utility functions, content loaders, shared constants. Thin layer -- no business logic, just helpers.
- **`public/`:** Static assets served as-is. Persona images, OG images, favicons. No image optimization API in static export, so images should be pre-optimized (WebP, appropriate dimensions).

## Architectural Patterns

### Pattern 1: Server Component Default, Client Island Architecture

**What:** Every component is a React Server Component by default. Only add `'use client'` to specific interactive leaves (calculator, tab switches, copy buttons, mobile nav toggle). The page shell, layout, sections, and all static content remain Server Components.

**When to use:** Always. This is the Next.js App Router default and the correct mental model.

**Trade-offs:** Minimizes client JavaScript bundle. Requires thinking about where interactivity boundaries live. Some components need careful splitting (e.g., hero section is Server Component, but persona card hover animations need a Client wrapper).

**Example:**
```typescript
// src/components/sections/hero.tsx (Server Component - no directive)
import { PersonaCards } from './persona-cards'

export function Hero() {
  return (
    <section className="relative py-24">
      <h1 className="text-5xl font-bold">Meet MrHuang</h1>
      <p className="text-xl text-gray-400">Your AI companion. Self-hosted. Zero trust.</p>
      <PersonaCards /> {/* Client component for hover/animation */}
      <a href="https://github.com/dardanfejza/mrhuang" className="btn-primary">
        View on GitHub
      </a>
    </section>
  )
}

// src/components/sections/persona-cards.tsx
'use client'
import { motion } from 'framer-motion'

export function PersonaCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {personas.map((persona) => (
        <motion.div key={persona.role} whileHover={{ scale: 1.03 }}>
          {/* Card content */}
        </motion.div>
      ))}
    </div>
  )
}
```

### Pattern 2: MDX Content as Data with Page Wrappers

**What:** MDX files live in `src/content/`, not directly as route pages. Page components in `src/app/` import and render MDX content, wrapping it with layout, metadata, and navigation context. Use `generateStaticParams` with dynamic imports for static export.

**When to use:** For all documentation and feature pages. Gives you full control over page metadata, layout wrapping, and sidebar navigation without fighting MDX-as-page limitations.

**Trade-offs:** Slightly more boilerplate than MDX-as-page. But gains: proper TypeScript metadata exports, consistent layout wrapping, ability to add page-level UI around content, and clean separation of concerns.

**Example:**
```typescript
// src/app/install/[tier]/page.tsx
import { notFound } from 'next/navigation'

const tiers = ['beginner', 'intermediate', 'advanced'] as const

export function generateStaticParams() {
  return tiers.map((tier) => ({ tier }))
}

export const dynamicParams = false // 404 for unknown tiers

export default async function InstallPage({
  params,
}: {
  params: Promise<{ tier: string }>
}) {
  const { tier } = await params
  if (!tiers.includes(tier as any)) notFound()

  const { default: Content } = await import(`@/content/install/${tier}.mdx`)

  return (
    <article className="prose prose-invert max-w-none">
      <Content />
    </article>
  )
}
```

### Pattern 3: Static Data Constants for Interactive Components

**What:** The cost calculator and feature data do not call APIs. All data is defined in TypeScript constants (`pricing-data.ts`, `features-data.ts`). Interactive components use React `useState` and `useReducer` to manipulate this static data client-side.

**When to use:** For the cost calculator, feature grids, tier comparison tables -- any data that is known at build time but needs client-side interactivity.

**Trade-offs:** Data updates require code changes and redeployment. Acceptable for this project since pricing changes infrequently (Anthropic API pricing, hosting costs). Eliminates all API/backend complexity.

**Example:**
```typescript
// src/components/calculator/pricing-data.ts
export const PRICING = {
  anthropic: {
    inputPerMillion: 3.00,   // Claude Sonnet
    outputPerMillion: 15.00,
    estimatedDailyTokens: { light: 50_000, moderate: 200_000, heavy: 1_000_000 },
  },
  hosting: {
    vps: { name: 'VPS (e.g., Hetzner)', monthly: 5 },
    homeServer: { name: 'Home Server', monthly: 0, note: 'Electricity only' },
  },
  optional: {
    cloudflare: { name: 'Cloudflare Tunnel', monthly: 0, note: 'Free tier' },
    domain: { name: 'Custom Domain', monthly: 1, note: '~$12/year' },
  },
} as const

// src/components/calculator/calculator.tsx
'use client'
import { useState } from 'react'
import { PRICING } from './pricing-data'

export function CostCalculator() {
  const [usage, setUsage] = useState<'light' | 'moderate' | 'heavy'>('moderate')
  const [hostingType, setHostingType] = useState<'vps' | 'homeServer'>('vps')

  const monthlyCost = calculateTotal(usage, hostingType)

  return (/* interactive UI */)
}
```

### Pattern 4: Route Groups for Layout Separation

**What:** Use `(marketing)` and `(docs)` route groups to apply different layouts without affecting URLs. Marketing pages get a full-bleed layout. Docs/install pages get a sidebar layout with navigation.

**When to use:** When the landing page and documentation sections have fundamentally different chrome (navigation, sidebar, content width).

**Trade-offs:** Slight folder structure complexity. But prevents the common mistake of one layout trying to serve both full-bleed marketing and constrained docs content.

**Example:**
```
src/app/
├── layout.tsx                  # Root: html, body, theme, fonts only
├── (marketing)/
│   ├── layout.tsx              # Full-bleed, no sidebar
│   ├── page.tsx                # Landing page (/)
│   └── cost/
│       └── page.tsx            # Cost calculator (/cost)
├── (docs)/
│   ├── layout.tsx              # Sidebar + constrained content width
│   ├── install/
│   │   ├── page.tsx            # Install index (/install)
│   │   └── [tier]/
│   │       └── page.tsx        # Per-tier guide (/install/beginner)
│   └── features/
│       ├── page.tsx            # Features index (/features)
│       └── [slug]/
│           └── page.tsx        # Feature detail (/features/whatsapp)
```

## Data Flow

### Content Rendering Flow (Static Export)

```
[MDX Files in src/content/]
    │ (build time)
    ▼
[next build] → @next/mdx compiles MDX → React components
    │
    ▼
[Page Components in src/app/]
    │ import MDX as component
    ▼
[generateStaticParams()] → enumerates all [tier] and [slug] values
    │
    ▼
[Server Components render] → static HTML per route
    │
    ▼
[out/ directory] → HTML + CSS + JS chunks
    │ (deploy)
    ▼
[Cloudflare Pages / Vercel Static] → served to browser
    │ (hydration)
    ▼
[Client Components activate] → calculator, tabs, copy buttons become interactive
```

### Cost Calculator Data Flow (Client-Side Only)

```
[Static Pricing Constants]
    │ imported at build, bundled into client JS
    ▼
[CostCalculator Component] ('use client')
    │
    ├── [useState: usage tier] ←── [Slider/Select input]
    ├── [useState: hosting type] ←── [Radio/Card selection]
    ├── [useState: optional services] ←── [Checkbox toggles]
    │
    ▼
[calculateTotal()] → pure function, no API calls
    │
    ▼
[CostBreakdown display] → line items + total
```

### Install Guide Navigation Flow

```
[User lands on /install]
    │
    ▼
[Tier Selector Page]
    │ "I am a..." cards with descriptions
    │
    ├── "Complete beginner" → /install/beginner
    ├── "Terminal comfortable" → /install/intermediate
    └── "CLI veteran" → /install/advanced
    │
    ▼
[Tier-Specific MDX Page]
    │ rendered in (docs) layout with sidebar
    │ includes: code blocks, copy buttons, step indicators
    │ can link to other tiers: "Too easy? Try the veteran guide"
```

### Key Data Flows

1. **Landing page:** All sections are Server Components rendered at build time. Persona images loaded from `public/images/personas/`. Animation-only Client Components hydrate for scroll effects and hover states.
2. **Documentation:** MDX compiled at build time, imported into page components. Sidebar navigation built from a static array of routes. No runtime content fetching.
3. **Cost calculator:** All data is client-side. User interactions modify React state. Cost computation is a pure function of state. No network requests.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-10k visitors/month | Static export to Cloudflare Pages free tier. No changes needed. CDN handles everything. |
| 10k-100k visitors/month | Still static. Cloudflare Pages handles this easily. Add analytics (Plausible or Cloudflare Web Analytics). |
| 100k+ visitors/month | Still static -- this is the beauty of SSG. Consider adding a CMS (Sanity/Contentful) if content updates become frequent enough to warrant non-developer editing. |

### Scaling Priorities

1. **First bottleneck: Content velocity, not traffic.** A static site handles any traffic volume. The bottleneck is "how fast can content be updated?" For v1, code-as-content is fine. If docs need frequent non-developer updates, add a headless CMS later.
2. **Second bottleneck: Image size.** AI-generated Jensen Huang images could be large. Pre-optimize all images to WebP at appropriate dimensions (hero: 800x800 max, cards: 400x400). Use `next-image-export-optimizer` if build-time optimization is desired, or simply serve pre-optimized files from `public/`.

## Anti-Patterns

### Anti-Pattern 1: MDX Files as Direct Route Pages

**What people do:** Put `.mdx` files directly in `src/app/install/beginner/page.mdx` and let them serve as the page.

**Why it's wrong:** Limits control over metadata, layout wrapping, and page-level UI. Cannot easily add a tier selector header, "next step" footer, or dynamic metadata. Makes it harder to maintain consistent page structure across content pages.

**Do this instead:** Keep MDX in `src/content/`, import into proper page components in `src/app/`. The page component controls the wrapper; MDX controls the content.

### Anti-Pattern 2: Marking Entire Sections as Client Components

**What people do:** Add `'use client'` to the hero section or feature grid because one child needs animation.

**Why it's wrong:** Pushes the entire component tree into the client bundle unnecessarily. A hero section with three persona cards, a heading, and a CTA might be 50KB of client JS when only the animation code (2KB) actually needs `'use client'`.

**Do this instead:** Keep parent sections as Server Components. Extract only the interactive leaf (e.g., `PersonaCards` with hover animation) into a separate `'use client'` file. Import and compose.

### Anti-Pattern 3: Using next/image Default Loader with Static Export

**What people do:** Use `<Image src="/hero.jpg" />` without configuring a custom loader, then wonder why the build fails or images break.

**Why it's wrong:** The default Image Optimization API requires a Node.js server. Static export has no server. The build will either error or produce broken image references.

**Do this instead:** Either (a) use a custom loader pointing to a CDN, (b) use `next-image-export-optimizer` for build-time optimization, or (c) use plain `<img>` tags with pre-optimized WebP files from `public/`. For a marketing site with ~20 images, option (c) is simplest and most reliable.

### Anti-Pattern 4: Dynamic Server Features in Static Export

**What people do:** Use `cookies()`, `headers()`, rewrites, redirects, or Server Actions, then discover they are unsupported in static export.

**Why it's wrong:** Static export generates HTML at build time. There is no server at runtime. Any feature requiring request-time server execution will fail.

**Do this instead:** Keep all interactivity client-side. Use `'use client'` components with React state for the calculator, tier tabs, etc. If you need redirects, configure them at the hosting level (Cloudflare Pages `_redirects` file or Vercel `vercel.json`).

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| GitHub (repo link) | Static `<a>` tags | No API integration needed. Just link to `github.com/dardanfejza/mrhuang` |
| Cloudflare Pages | Deploy `out/` directory | `output: 'export'` in `next.config.mjs`. Build command: `next build`. Output dir: `out` |
| Vercel (alternative) | Auto-detected Next.js | Works out of the box, but static export means no Vercel-specific features |
| Analytics (optional) | Script tag or Cloudflare Web Analytics | Cloudflare analytics is free and privacy-respecting. Add script in root layout |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Page components <-> MDX content | Import: `import Content from '@/content/...'` | MDX compiled at build time by `@next/mdx` webpack loader |
| Server Components <-> Client Components | Props: pass data down from Server to Client | Client Components cannot import Server Components. Plan the boundary carefully |
| Landing sections <-> UI primitives | Import: sections compose UI atoms | One-directional dependency. UI primitives never import sections |
| Calculator <-> Pricing data | Import: `import { PRICING } from './pricing-data'` | Data is a static TypeScript module, bundled into client JS |
| Layout <-> Route groups | File convention: `(marketing)/layout.tsx`, `(docs)/layout.tsx` | Route groups share root layout but have distinct sub-layouts |

## Build Order (Suggested Implementation Sequence)

The following order respects component dependencies and enables incremental validation:

### Phase 1: Foundation (build first, everything depends on it)
1. Next.js project scaffold with `output: 'export'` config
2. Tailwind CSS with NVIDIA green theme + GitHub dark theme custom properties
3. Root layout (`layout.tsx`) with dark theme, font loading
4. Global `mdx-components.tsx` with styled markdown elements
5. Basic navigation header and footer
6. **Validates:** Project builds, deploys to static host, theme is correct

### Phase 2: Landing Page (highest visibility, defines brand)
1. Hero section with persona cards (placeholder images initially)
2. Features showcase section
3. Security section
4. Coming soon teaser
5. Open-source CTA section
6. **Validates:** Full landing page renders, responsive, brand-correct

### Phase 3: Content Architecture (docs infrastructure)
1. `(docs)` route group with sidebar layout
2. Install guide tier selector (`/install` index page)
3. Dynamic `[tier]` routing with `generateStaticParams`
4. MDX install guides for all three tiers (beginner, intermediate, advanced)
5. Code block component with syntax highlighting and copy button
6. **Validates:** All three install guides accessible, navigable, correctly styled

### Phase 4: Features/Docs + Calculator (deepens the site)
1. Features index page with feature grid
2. Dynamic `[slug]` routing for feature deep-dives
3. MDX feature content pages
4. Cost calculator (client-side, no API)
5. **Validates:** Complete content coverage, calculator works, all routes pre-rendered

### Phase 5: Polish (animations, SEO, performance)
1. Framer Motion scroll animations on landing sections
2. Persona card hover/interaction effects
3. SEO metadata, Open Graph images, sitemap, robots.txt
4. Image optimization (swap placeholders for final AI images)
5. Mobile responsiveness pass
6. Performance audit (Lighthouse)
7. **Validates:** Production-ready, all images final, SEO complete

**Build order rationale:** Foundation must come first (everything depends on layout and theme). Landing page next because it defines the visual language that docs pages inherit. Content architecture third because it establishes the MDX pipeline and routing patterns. Features and calculator fourth because they extend established patterns. Polish last because animations and SEO should not block content development.

## Sources

- [Next.js Static Exports Guide](https://nextjs.org/docs/app/guides/static-exports) (official, v16.1.6, updated 2026-02-27) -- HIGH confidence
- [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) (official, v16.1.6, updated 2026-02-27) -- HIGH confidence
- [Next.js MDX Guide](https://nextjs.org/docs/app/guides/mdx) (official, v16.1.6, updated 2026-02-27) -- HIGH confidence
- [Next.js generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) (official) -- HIGH confidence
- [next-image-export-optimizer](https://github.com/Niels-IO/next-image-export-optimizer) (GitHub) -- MEDIUM confidence
- [Framer Motion Scroll Animations Guide](https://jb.desishub.com/blog/framer-motion) -- MEDIUM confidence
- [Aceternity UI Components](https://ui.aceternity.com/components) -- MEDIUM confidence (reference for animation patterns)

---
*Architecture research for: mrhuang.ai marketing + documentation website*
*Researched: 2026-03-01*
