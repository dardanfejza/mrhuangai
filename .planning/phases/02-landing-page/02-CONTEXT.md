# Phase 2: Landing Page - Context

**Gathered:** 2026-03-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the complete landing page at `app/page.tsx` — replacing the Phase 1 placeholder with: hero section with persona cards, features showcase, security section, and coming-soon teaser. All sections live on a single scrollable page. Installing, cost breakdown, and dedicated pages are Phase 3.

</domain>

<decisions>
## Implementation Decisions

### Hero section
- Headline: "Meet MrHuang" (locked)
- Sub-copy must lean into the "Super smart. Also kinda dumb. Amazing." paradox — self-aware meta-humorous tone (HERO-01, HERO-04)
- Primary CTA: "Star on GitHub" button — prominent, uses NVIDIA green treatment (HERO-03)
- Three persona cards: Mentor, Therapist, Life Coach — Jensen Huang AI-generated images (placeholders acceptable for now) (HERO-02)
- Each persona card shows: role label + 1–2 line humorous tagline describing the persona's personality
- NVIDIA disclaimer on persona cards: "AI-generated, not affiliated with NVIDIA or Jensen Huang" (SEO-02)
- "100% Open Source" badge or callout in or near hero (FEAT-03)

### Persona cards
- Cards are the visual centerpiece of the hero
- Dark glass-card style: `bg-canvas-subtle` base, `border border-border-default`, rounded corners — consistent with existing design tokens
- Placeholder images acceptable — can use a styled text/initial placeholder if no AI image assets exist at build time
- Disclaimer must be visually attached to the cards (small text beneath or as a card footer), not buried in the main footer

### Features section
- Six feature cards: AI Personas, Persistent Knowledge Base, Voice Input (Deepgram), WhatsApp Integration, Daily Journal, Dashboard + habit tracking (FEAT-01)
- Grid layout — 2 columns mobile, 3 columns desktop
- Each card: icon + title + 1-line description
- "Your data stays on your hardware" messaging displayed prominently — can be a banner or callout above/between feature cards (FEAT-02)

### Security section
- Dedicated section below features (SEC-01, SEC-02, SEC-03)
- Data flow diagram: Browser → Cloudflare Tunnel → Home Server → Claude API
  - Represented as a styled CSS component (nodes + arrows) — not an SVG file, not an image
  - Emphasize "only outbound call: Claude API" — all other traffic stays local
- Five security callout cards: Zero Trust (Cloudflare Tunnel), PIN Protection (JWT + timing-safe compare), HMAC Webhook Verification, Path Traversal Protection, Zod Schema Validation
- Anchor message: "Your data never leaves your hardware" (SEC-03)

### Coming Soon section
- Tease Mac, iOS, Android native apps (SOON-01)
- CTA: Link to GitHub to watch/star the repo for updates — no email capture form (keep it simple, static export)

### Tone throughout
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

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/nav/Nav.tsx`: Sticky nav already handles layout shell — page just needs sections inside `<main>`
- `components/footer/Footer.tsx`: Already has "not affiliated with NVIDIA" attribution — persona card disclaimer is ADDITIONAL, more prominent
- `components/code/CodeBlock.tsx` + `CopyButton.tsx`: Available if any code snippet appears on landing page
- `lib/utils.ts`: `cn()` for class merging — use throughout new components
- `lib/github.ts`: GitHub API fetch — `GitHubStars` already uses it for star count CTA in Nav

### Established Patterns
- Layout wrapper: `mx-auto max-w-6xl px-4 sm:px-6 lg:px-8` — use for all sections
- Section padding: `py-24` for hero, `py-16` or `py-20` for subsequent sections
- Color tokens: `canvas-default` (#0d1117) main bg, `canvas-subtle` (#161b22) card bg, `border-default` (#30363d) borders, `nvidia` (#76b900) accent — dark text only on green
- Text: `text-fg-default`, `text-fg-muted`, `text-fg-subtle` hierarchy — established in Phase 1
- Hover transitions: `transition-colors` — consistent with Nav/Footer pattern
- NVIDIA green rule: `text-nvidia` or `bg-nvidia` only with `text-gray-950` — white text fails WCAG

### Integration Points
- `app/page.tsx`: Entire landing page replaces the Phase 1 placeholder content — keep the `max-w-6xl` wrapper
- Nav links `/#features` and `/#cost` are already wired — features section needs `id="features"`, cost section (Phase 3) needs `id="cost"`
- `app/layout.tsx` metadata: title/description already set — Phase 2 doesn't need to touch layout

</code_context>

<specifics>
## Specific Ideas

- Persona card taglines should match the humor style: Mentor = "Tells you what you need to hear, not what you want.", Therapist = "Listens. Also judges. Mostly listens.", Life Coach = "Calls you out when you're being a coward." (Claude can refine)
- Data flow diagram should visually emphasize the LOCAL boundary — a box around "Home Server" to show where data stays
- Features section "Your data stays on your hardware" could use a shield or lock icon from lucide-react
- The NVIDIA disclaimer on persona cards mirrors the existing Footer disclaimer — keep phrasing consistent: "AI-generated, not affiliated with NVIDIA or Jensen Huang"

</specifics>

<deferred>
## Deferred Ideas

- Email capture / notification signup form — keep it simple for static export; GitHub watch link is sufficient for now
- Interactive persona card hover effects beyond basic CSS transitions — can revisit in Phase 4 polish

</deferred>

---

*Phase: 02-landing-page*
*Context gathered: 2026-03-02*
