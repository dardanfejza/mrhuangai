# Phase 2: Landing Page - Research

**Researched:** 2026-03-02
**Domain:** Next.js 16 App Router static export — multi-section marketing landing page with server components, Tailwind v4, lucide-react icons, CSS data flow diagram
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Hero section
- Headline: "Meet MrHuang" (locked)
- Sub-copy must lean into the "Super smart. Also kinda dumb. Amazing." paradox — self-aware meta-humorous tone (HERO-01, HERO-04)
- Primary CTA: "Star on GitHub" button — prominent, uses NVIDIA green treatment (HERO-03)
- Three persona cards: Mentor, Therapist, Life Coach — Jensen Huang AI-generated images (placeholders acceptable for now) (HERO-02)
- Each persona card shows: role label + 1–2 line humorous tagline describing the persona's personality
- NVIDIA disclaimer on persona cards: "AI-generated, not affiliated with NVIDIA or Jensen Huang" (SEO-02)
- "100% Open Source" badge or callout in or near hero (FEAT-03)

#### Persona cards
- Cards are the visual centerpiece of the hero
- Dark glass-card style: `bg-canvas-subtle` base, `border border-border-default`, rounded corners — consistent with existing design tokens
- Placeholder images acceptable — can use a styled text/initial placeholder if no AI image assets exist at build time
- Disclaimer must be visually attached to the cards (small text beneath or as a card footer), not buried in the main footer

#### Features section
- Six feature cards: AI Personas, Persistent Knowledge Base, Voice Input (Deepgram), WhatsApp Integration, Daily Journal, Dashboard + habit tracking (FEAT-01)
- Grid layout — 2 columns mobile, 3 columns desktop
- Each card: icon + title + 1-line description
- "Your data stays on your hardware" messaging displayed prominently — can be a banner or callout above/between feature cards (FEAT-02)

#### Security section
- Dedicated section below features (SEC-01, SEC-02, SEC-03)
- Data flow diagram: Browser → Cloudflare Tunnel → Home Server → Claude API
  - Represented as a styled CSS component (nodes + arrows) — not an SVG file, not an image
  - Emphasize "only outbound call: Claude API" — all other traffic stays local
- Five security callout cards: Zero Trust (Cloudflare Tunnel), PIN Protection (JWT + timing-safe compare), HMAC Webhook Verification, Path Traversal Protection, Zod Schema Validation
- Anchor message: "Your data never leaves your hardware" (SEC-03)

#### Coming Soon section
- Tease Mac, iOS, Android native apps (SOON-01)
- CTA: Link to GitHub to watch/star the repo for updates — no email capture form (keep it simple, static export)

#### Tone throughout
- Self-aware meta-humorous copy across all sections (HERO-04)
- Examples: "yes, this site was also written with MrHuang", "Super smart. Also kinda dumb. Amazing."
- Each section heading should feel like a founder wrote it, not a marketing team

### Claude's Discretion
- Exact section order (hero → features → security → coming soon is assumed but Claude can reorder if it improves flow)
- Scroll animation approach — if using Motion 12, keep it subtle (fade-up on enter). Static is also acceptable
- Exact icon choices for feature cards (lucide-react icons preferred, consistent with existing Nav/Footer)
- Typography scale per section (h2/h3 hierarchy)
- Exact sub-copy text beyond the constraints above
- Data flow diagram arrow style and layout direction (horizontal vs vertical)
- Coming Soon platform icons (Mac/iOS/Android)

### Deferred Ideas (OUT OF SCOPE)
- Email capture / notification signup form — keep it simple for static export; GitHub watch link is sufficient for now
- Interactive persona card hover effects beyond basic CSS transitions — can revisit in Phase 4 polish
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HERO-01 | Hero section displays headline "Meet MrHuang" with sub-copy leaning into "Super smart. Also kinda dumb. Amazing." paradox | Section composition pattern, typography hierarchy |
| HERO-02 | Three AI-generated Jensen Huang persona cards in hero — Mentor, Therapist, Life Coach — each with role label and brief description | Persona card component pattern with placeholder image technique |
| HERO-03 | Primary "Star on GitHub" CTA button in hero section | Reuse `lib/github.ts` + server component async data pattern |
| HERO-04 | Self-aware meta-humorous tone throughout landing page copy | Tone guidelines from CONTEXT.md specifics |
| FEAT-01 | Features showcase with six feature cards (AI Personas, Knowledge Base, Voice, WhatsApp, Journal, Dashboard) | 2-col/3-col responsive grid, lucide-react icon map |
| FEAT-02 | "Your data stays on your hardware" messaging prominent with visual icon/badge | Shield/Lock icon from lucide-react, callout banner pattern |
| FEAT-03 | "100% Open Source" badge and GitHub repo link in features or hero | Badge component using existing border tokens |
| SEC-01 | Security section with CSS data flow diagram: Browser → Cloudflare Tunnel → Home Server → Claude API | Pure-CSS node+arrow pattern with flexbox/grid |
| SEC-02 | Five security callout cards: Zero Trust, PIN Protection, HMAC, Path Traversal, Zod validation | Grid card pattern — same as features grid |
| SEC-03 | "Your data never leaves your hardware" anchor message in security section | Callout/banner pattern |
| SOON-01 | Coming Soon teaser for Mac, iOS, Android with GitHub notification CTA | Simple static section, platform icons from lucide-react |
| SEO-02 | AI-generated disclaimer on persona cards: "AI-generated, not affiliated with NVIDIA or Jensen Huang" | Card footer text, consistent with Footer.tsx phrasing |
</phase_requirements>

---

## Summary

Phase 2 replaces `app/page.tsx` (the Phase 1 placeholder) with a complete multi-section marketing landing page. The page is implemented as a Next.js App Router Server Component — no `"use client"` needed for the static sections since there are no browser APIs, state, or event handlers beyond standard anchor tags. The only interactive element (the "Star on GitHub" CTA) reuses `lib/github.ts` already wired for server-side data fetching at build time.

All required stack is already installed: Tailwind CSS v4 with the project design tokens, lucide-react 0.575.0, shadcn/ui (New York style, RSC mode), and `cn()` from `lib/utils.ts`. The `motion` package (Motion 12) is NOT installed and NOT needed — `tw-animate-css` is already imported in `globals.css` and provides `animate-in fade-in` utilities for any optional scroll entrance effects. Scroll animations are Claude's discretion; static is fully acceptable.

The CSS data flow diagram (SEC-01) is a pure-CSS flexbox component with styled node boxes and arrow connectors. No SVG or external library needed. The persona card placeholder images use styled `div` elements with initials or role abbreviations rather than any image assets.

**Primary recommendation:** Write `app/page.tsx` as a single async Server Component that composes section components from `components/sections/`. Each section is its own file. All sections are static Server Components. No new npm packages required.

---

## Standard Stack

### Core (already installed — no new installs needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | App Router, static export, async Server Components | Project foundation; `output: 'export'` already configured |
| Tailwind CSS | v4.2.1 | Utility styling with project design tokens | CSS-first `@theme` block already defines all brand colors |
| lucide-react | 0.575.0 | Icons for feature cards, coming soon, CTAs | Already used in Nav (Star, Github) and Footer |
| tw-animate-css | 1.4.0 | `animate-in fade-in` utilities for optional entrance effects | Already imported in globals.css |
| tailwind-merge + clsx | latest | `cn()` class merging | Already in `lib/utils.ts` |

### No New Packages Required

All functionality needed for Phase 2 is covered by what's already installed. Specifically:
- Motion 12 (`motion` package) is NOT installed and NOT required — tw-animate-css handles any CSS entrance animations
- No chart library needed — data flow diagram is pure CSS flexbox
- No image optimization service needed — persona card placeholders are styled HTML elements

### Alternatives Considered

| Instead of | Could Use | Why We Don't |
|------------|-----------|--------------|
| Pure CSS data flow diagram | react-flow or mermaid | Heavy JS dependency for a static visual; pure CSS is sufficient for 4 nodes |
| tw-animate-css | motion package | motion is not installed; tw-animate-css already provides what's needed |
| Styled div placeholder | next/image with actual image | Images don't exist yet; placeholder is the documented Phase 2 approach |

**Installation:** None required. All dependencies already in `package.json`.

---

## Architecture Patterns

### Recommended Project Structure

```
app/
└── page.tsx                         # Root landing page — async Server Component, composes sections

components/
├── nav/                             # Phase 1 — do not modify
├── footer/                          # Phase 1 — do not modify
├── code/                            # Phase 1 — do not modify
└── sections/                        # NEW: one file per landing page section
    ├── HeroSection.tsx              # Hero + persona cards + CTA (HERO-01, HERO-02, HERO-03, HERO-04, FEAT-03, SEO-02)
    ├── FeaturesSection.tsx          # Feature grid + "Your data stays on your hardware" (FEAT-01, FEAT-02)
    ├── SecuritySection.tsx          # Data flow diagram + callout cards (SEC-01, SEC-02, SEC-03)
    └── ComingSoonSection.tsx        # Mac/iOS/Android teaser (SOON-01)
```

### Pattern 1: Async Server Component Page Composition

`app/page.tsx` is an async Server Component that composes section components. No `"use client"` needed. This is the correct pattern for Next.js static export — Server Components run at build time, producing static HTML.

```typescript
// app/page.tsx — async Server Component (no "use client")
// Source: https://nextjs.org/docs/app/guides/static-exports (v16.1.6, 2026-02-27)
import HeroSection from '@/components/sections/HeroSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import SecuritySection from '@/components/sections/SecuritySection'
import ComingSoonSection from '@/components/sections/ComingSoonSection'
import { getStarCount } from '@/lib/github'

export default async function HomePage() {
  const stars = await getStarCount()  // runs at next build; falls back to 0

  return (
    <div>
      <HeroSection stars={stars} />
      <FeaturesSection />
      <SecuritySection />
      <ComingSoonSection />
    </div>
  )
}
```

### Pattern 2: Section Component Structure

Each section component is a plain (non-async) Server Component — they receive props from the page, no data fetching of their own. They use the established layout wrapper.

```typescript
// components/sections/FeaturesSection.tsx
// Source: Established project pattern from Phase 1 code review
import { Shield, BookOpen, Mic, MessageCircle, BookHeart, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section content */}
      </div>
    </section>
  )
}
```

**Critical:** The `id="features"` attribute on the Features section is required — Nav already has `href="/#features"` wired.

### Pattern 3: Persona Card with Placeholder Image

No image assets exist yet. The locked decision allows a styled text/initial placeholder.

```typescript
// components/sections/HeroSection.tsx (persona card)
// Source: CONTEXT.md locked decisions
const personas = [
  {
    role: 'Mentor',
    initials: 'M',
    tagline: 'Tells you what you need to hear, not what you want.',
  },
  {
    role: 'Therapist',
    initials: 'T',
    tagline: 'Listens. Also judges. Mostly listens.',
  },
  {
    role: 'Life Coach',
    initials: 'LC',
    tagline: "Calls you out when you're being a coward.",
  },
]

// Card JSX pattern
<div className="rounded-xl border border-border-default bg-canvas-subtle p-6 flex flex-col">
  {/* Placeholder image area */}
  <div className="mb-4 flex h-32 w-full items-center justify-center rounded-lg bg-canvas-inset">
    <span className="text-4xl font-bold text-nvidia">{persona.initials}</span>
  </div>
  {/* Role + tagline */}
  <p className="text-xs font-medium uppercase tracking-widest text-nvidia">{persona.role}</p>
  <p className="mt-1 text-sm text-fg-muted">{persona.tagline}</p>
  {/* Disclaimer — attached to card, not footer */}
  <p className="mt-4 text-xs text-fg-subtle">AI-generated, not affiliated with NVIDIA or Jensen Huang</p>
</div>
```

### Pattern 4: CSS Data Flow Diagram

The security section data flow (Browser → Cloudflare Tunnel → Home Server → Claude API) is implemented as a CSS flexbox row with node boxes and arrow connectors. This satisfies the locked decision "styled CSS component (nodes + arrows) — not an SVG file, not an image."

```typescript
// components/sections/SecuritySection.tsx — data flow diagram
// Source: Pure CSS pattern, verified with flexbox layout
const flowNodes = [
  { label: 'Browser', sublabel: 'You' },
  { label: 'Cloudflare Tunnel', sublabel: 'Zero Trust' },
  { label: 'Home Server', sublabel: 'Your hardware', highlight: true },  // visual boundary
  { label: 'Claude API', sublabel: 'Only outbound', outbound: true },
]

// Rendered as flexbox row with CSS arrows between nodes:
<div className="flex flex-wrap items-center justify-center gap-0">
  {flowNodes.map((node, i) => (
    <div key={node.label} className="flex items-center">
      <div className={cn(
        "rounded-lg border px-4 py-3 text-center",
        node.highlight
          ? "border-nvidia/50 bg-canvas-subtle ring-1 ring-nvidia/30"   // "local" box
          : "border-border-default bg-canvas-inset",
        node.outbound && "border-border-muted opacity-70"
      )}>
        <p className="text-sm font-semibold text-fg-default">{node.label}</p>
        <p className="text-xs text-fg-subtle">{node.sublabel}</p>
      </div>
      {/* Arrow connector between nodes */}
      {i < flowNodes.length - 1 && (
        <div className="flex items-center px-2">
          <div className="h-px w-6 bg-border-default" />
          <div className="border-t-4 border-b-4 border-l-4 border-transparent border-l-border-default h-0 w-0" />
        </div>
      )}
    </div>
  ))}
</div>
```

### Pattern 5: Feature Card Grid

Six feature cards in a 2-col mobile / 3-col desktop grid:

```typescript
// components/sections/FeaturesSection.tsx — feature grid
// Source: CONTEXT.md locked decisions + project grid pattern
const features = [
  { icon: Brain,          title: 'AI Personas',           desc: 'Mentor, Therapist, Life Coach — each with its own voice.' },
  { icon: BookOpen,       title: 'Knowledge Base',         desc: 'Persistent memory that actually remembers.' },
  { icon: Mic,            title: 'Voice Input',            desc: 'Deepgram transcription — speak, it listens.' },
  { icon: MessageCircle,  title: 'WhatsApp Integration',   desc: 'Chat with MrHuang on the app you already use.' },
  { icon: BookHeart,      title: 'Daily Journal',          desc: 'Track your thoughts. It will have opinions.' },
  { icon: LayoutDashboard,title: 'Dashboard',              desc: 'Habit tracking. It notices when you stop.' },
]

<div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
  {features.map(({ icon: Icon, title, desc }) => (
    <div key={title} className="rounded-xl border border-border-default bg-canvas-subtle p-5">
      <Icon className="mb-3 h-5 w-5 text-nvidia" />
      <h3 className="text-sm font-semibold text-fg-default">{title}</h3>
      <p className="mt-1 text-xs text-fg-muted">{desc}</p>
    </div>
  ))}
</div>
```

### Pattern 6: NVIDIA Green CTA Button

The hero "Star on GitHub" CTA uses NVIDIA green with dark text (WCAG-enforced by globals.css):

```typescript
// Hero CTA button — server component (no client needed, it's just a link)
// Source: globals.css WCAG enforcement — bg-nvidia forces color: #030712
<a
  href="https://github.com/dardanfejza/mrhuang"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 rounded-lg bg-nvidia px-6 py-3 text-sm font-semibold text-gray-950 transition-opacity hover:opacity-90"
>
  <Star className="h-4 w-4" />
  Star on GitHub
  {stars > 0 && <span className="ml-1 opacity-75">({stars.toLocaleString()})</span>}
</a>
```

### Anti-Patterns to Avoid

- **Adding `"use client"` to section components:** None of the landing page sections have interactivity (no `useState`, no event handlers, no browser APIs). Adding `"use client"` unnecessarily forces client-side JS hydration and defeats static export benefits.
- **Using `next/image` without the custom loader:** The project uses `lib/image-loader.ts` as a passthrough. Since persona images don't exist yet, avoid `<Image>` entirely — use styled `<div>` placeholders.
- **Putting the NVIDIA disclaimer only in the footer:** The locked decision requires it visually attached to each persona card. The Footer already has a similar disclaimer; the card disclaimer is additional and more prominent.
- **Missing `id="features"` on the features section:** Nav already links to `/#features`. Missing this attribute breaks navigation silently.
- **Using `bg-nvidia` with white text:** globals.css enforces `color: #030712` on `.bg-nvidia` elements. Always pair with `text-gray-950` explicitly in JSX to avoid confusion.
- **Importing Motion 12 (`motion`):** The package is not installed. Do not add it. tw-animate-css is sufficient for any entrance animations.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Class merging with conditionals | Custom string concatenation | `cn()` from `lib/utils.ts` | Already established; handles Tailwind conflicts correctly |
| Star count in hero CTA | Direct `fetch()` in component | `getStarCount()` from `lib/github.ts` | Already handles fallback, GITHUB_TOKEN, build-time fetching |
| CSS entrance animations | Custom keyframe definitions | `tw-animate-css` classes (`animate-in fade-in slide-in-from-bottom-4`) | Already imported in globals.css |
| Arrow head in CSS diagram | Custom SVG arrows | CSS border trick (`border-t-4 border-l-4 border-transparent`) | Pure CSS, no dependency |
| Icon components | Custom SVG inline | lucide-react named imports | Already installed; 1000+ icons, tree-shakeable |
| Badge styling | Custom component | Tailwind utilities + existing border tokens | No shadcn Badge needed; inline utility classes are sufficient |

**Key insight:** Phase 1 built all shared infrastructure. Phase 2 consumes it exclusively — no new abstractions needed.

---

## Common Pitfalls

### Pitfall 1: Client Component Creep
**What goes wrong:** Developer adds `"use client"` to section components because they "might need it later" or to use an `onClick`. Landing page becomes a client bundle.
**Why it happens:** React/Next.js newcomers default to client components when unsure.
**How to avoid:** All landing page sections are static HTML. If a section ever needs interactivity (e.g., a copy button), extract ONLY that sub-element as a client component and keep the section server-rendered.
**Warning signs:** `"use client"` appearing at the top of `HeroSection.tsx`, `FeaturesSection.tsx`, etc.

### Pitfall 2: Missing Section IDs Breaking Nav Links
**What goes wrong:** Nav links `/#features` and `/#cost` silently fail to scroll because the target element lacks the matching `id`.
**Why it happens:** Developer forgets the anchor requirement documented in Phase 1.
**How to avoid:** Features section MUST have `id="features"`. Cost section (Phase 3) will need `id="cost"`.
**Warning signs:** Clicking "Features" in Nav scrolls to top of page instead of features section.

### Pitfall 3: NVIDIA Green Contrast Failure
**What goes wrong:** A component uses `bg-nvidia text-white` or `bg-nvidia text-fg-default`, which fails WCAG (contrast ratio ~2.0:1).
**Why it happens:** Forgetting the project rule that green backgrounds MUST use dark text.
**How to avoid:** globals.css enforces `color: #030712` on `.bg-nvidia` elements, but JSX `className` can override this. Always explicitly write `text-gray-950` alongside `bg-nvidia`.
**Warning signs:** Green buttons or badges with white/light text.

### Pitfall 4: Star Count Data Fetching in Wrong Component
**What goes wrong:** Developer calls `getStarCount()` inside HeroSection (a non-async component) or re-fetches inside a client component.
**Why it happens:** Not understanding that data fetching should happen in `app/page.tsx` (the async Server Component) and be passed as props.
**How to avoid:** Fetch in `page.tsx`, pass `stars` as a prop to `HeroSection`. Do not re-create fetch logic.
**Warning signs:** `async function HeroSection()` — section components should not be async.

### Pitfall 5: Persona Card Disclaimer Placement
**What goes wrong:** The NVIDIA disclaimer for persona cards is added only in the footer and not on the cards themselves.
**Why it happens:** Footer already has a disclaimer — easy to assume it's sufficient.
**How to avoid:** The locked decision is explicit: disclaimer must be visually attached to each persona card (small text beneath or as card footer). The Footer disclaimer is separate.
**Warning signs:** Persona cards rendering without any disclaimer text.

### Pitfall 6: Horizontal Scroll on Data Flow Diagram (Mobile)
**What goes wrong:** The 4-node horizontal diagram overflows on mobile, causing horizontal scroll.
**Why it happens:** Flexbox row with fixed-width nodes exceeds 375px viewport.
**How to avoid:** Use `flex-wrap` on the diagram container, or switch to a vertical layout on mobile (`flex-col sm:flex-row`). Alternatively, use `overflow-x-auto` scoped to the diagram container.
**Warning signs:** Horizontal scrollbar appearing on mobile breakpoint.

---

## Code Examples

Verified patterns from official sources and existing codebase:

### Established Layout Wrapper (from Phase 1 codebase)
```typescript
// Source: app/page.tsx Phase 1 placeholder, components/nav/Nav.tsx
<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
  {/* section content */}
</div>
```

### Section Padding Convention (from Phase 1)
```typescript
// Source: CONTEXT.md code_context — established Phase 1 patterns
<section className="py-24">           {/* hero */}
<section className="py-16 sm:py-20"> {/* subsequent sections */}
```

### Tailwind v4 Token Usage (from globals.css)
```typescript
// Source: app/globals.css @theme block
// These are the ONLY valid token names:
className="bg-canvas-default"    // #0d1117 — page background
className="bg-canvas-subtle"     // #161b22 — card background
className="bg-canvas-inset"      // #010409 — deep inset
className="border-border-default" // #30363d
className="border-border-muted"   // #21262d
className="text-fg-default"       // #e6edf3
className="text-fg-muted"         // #8b949e
className="text-fg-subtle"        // #6e7681
className="text-nvidia"           // #76b900 — accent only
className="bg-nvidia"             // #76b900 — MUST use dark text
```

### tw-animate-css Entrance Animation (optional, already available)
```typescript
// Source: tw-animate-css README (installed v1.4.0)
// Available without any new installs — imported in globals.css
<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
  {/* content fades and slides up on render */}
</div>
```

### Lucide-React Icon Import (from existing codebase pattern)
```typescript
// Source: components/nav/GitHubStars.tsx, components/footer/Footer.tsx
import { Brain, BookOpen, Mic, MessageCircle, BookHeart, LayoutDashboard, Shield, Lock, Github, Star, Monitor, Smartphone } from 'lucide-react'

// Usage pattern (consistent with existing Nav/Footer)
<Shield className="h-5 w-5 text-nvidia" />
```

### Open Source Badge Pattern
```typescript
// Source: Derived from Footer.tsx license badge pattern (existing codebase)
// FEAT-03: "100% Open Source" badge
<span className="inline-flex items-center rounded-full border border-nvidia/40 px-3 py-1 text-xs font-medium text-nvidia">
  100% Open Source
</span>
```

### "Your Data Stays on Your Hardware" Callout Banner
```typescript
// Source: CONTEXT.md locked decisions + established project token patterns
<div className="mb-8 flex items-center gap-3 rounded-lg border border-border-default bg-canvas-subtle px-5 py-4">
  <Shield className="h-5 w-5 shrink-0 text-nvidia" />
  <p className="text-sm font-medium text-fg-default">
    Your data stays on your hardware.{' '}
    <span className="text-fg-muted">No cloud sync. No data mining. Just yours.</span>
  </p>
</div>
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| Separate `pages/` directory | App Router `app/` directory | Already on current approach in Phase 1 |
| `framer-motion` | `motion` package (Motion 12) | motion not installed; tw-animate-css is sufficient for Phase 2 needs |
| `tailwind.config.js` | CSS-first `@theme` in globals.css | Already on current approach |
| `next export` CLI | `output: 'export'` in next.config.ts | Already configured |
| Default `next/image` optimization | Custom `loaderFile` | Already configured in next.config.ts |

**Deprecated/outdated:**
- `tailwindcss-animate`: Replaced by `tw-animate-css` (already using the replacement)
- `pages/index.tsx`: Replaced by `app/page.tsx` (already on App Router)

---

## Open Questions

1. **Jensen Huang persona images**
   - What we know: Placeholders (styled div with initials) are explicitly acceptable for Phase 2
   - What's unclear: When real images will be available and what format/dimensions they'll be
   - Recommendation: Build with placeholder pattern now; image slot should be `h-32 w-full` or similar aspect-ratio-constrained container so real images drop in without layout changes

2. **Scroll animations (Claude's discretion)**
   - What we know: tw-animate-css is available; motion is NOT installed; CONTEXT.md says "subtle fade-up on enter or static is acceptable"
   - What's unclear: Whether even simple CSS entrance animations are desirable for this audience (developers tend to prefer fast-loading, no-JS pages)
   - Recommendation: Default to STATIC (no animations). The landing page should feel instant. Any animation class applied at render time (not scroll-triggered) is acceptable as it requires zero JavaScript.

3. **Coming Soon platform icons**
   - What we know: CONTEXT.md marks icon choices as Claude's discretion; lucide-react is the preference
   - Available lucide icons verified: `Monitor` (Mac/desktop), `Smartphone` (iOS/Android), `Tablet` (iPad)
   - Recommendation: Use `Monitor` for Mac, `Smartphone` for iOS and Android. No separate iOS/Android icons exist in lucide-react.

---

## Sources

### Primary (HIGH confidence)
- `app/globals.css` — All design tokens, WCAG enforcement, tw-animate-css import confirmed
- `package.json` — Exact installed versions: Next.js 16.1.6, lucide-react 0.575.0, tw-animate-css 1.4.0, Tailwind 4.2.1
- `next.config.ts` — `output: 'export'`, `trailingSlash: true`, custom image loader confirmed
- `components/nav/Nav.tsx` — `/#features` and `/install/` links already wired
- `components/nav/GitHubStars.tsx` — Async server component + getStarCount pattern established
- `components/footer/Footer.tsx` — NVIDIA disclaimer phrasing: "AI-generated, not affiliated with NVIDIA or Jensen Huang"
- `lib/github.ts` — Build-time star count fetch with fallback
- `lib/utils.ts` — `cn()` available
- `components.json` — shadcn New York style, RSC: true, iconLibrary: lucide, aliases confirmed
- [Next.js 16.1.6 Static Exports docs](https://nextjs.org/docs/app/guides/static-exports) — Server Components supported in static export, fetch runs at build time (verified 2026-02-27)
- [lucide.dev/icons](https://lucide.dev/icons) — Confirmed icon names: Brain, BookOpen, Mic, MessageCircle, BookHeart, LayoutDashboard, Shield, ShieldCheck, Lock, Monitor, Smartphone, Github, Star

### Secondary (MEDIUM confidence)
- [tw-animate-css README](https://github.com/Wombosvideo/tw-animate-css) — `animate-in fade-in slide-in-from-bottom-4 duration-*` classes confirmed from installed node_modules/tw-animate-css/README.md
- Next.js Server vs Client Component guidance — Use server components for static sections; client only needed for interactivity (State, browser APIs, event handlers)

### Tertiary (LOW confidence — not needed for Phase 2)
- Pure CSS data flow diagram patterns (multiple sources) — Flexbox row with CSS border-trick arrows is a well-established pattern; Phase 2 implementation is straightforward

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified against installed node_modules and package.json
- Architecture: HIGH — existing Phase 1 code reviewed directly; patterns extracted from live files
- Pitfalls: HIGH — derived from official Next.js static export docs and existing project code review
- Icon availability: HIGH — verified against lucide.dev live icon browser

**Research date:** 2026-03-02
**Valid until:** 2026-04-02 (stable stack; lucide-react icon names are stable)
