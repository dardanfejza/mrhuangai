# Feature Research

**Domain:** Open-source AI project marketing & documentation website
**Researched:** 2026-03-01
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = visitors bounce within seconds.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Hero section with clear value proposition** | Every major OSS site (Supabase, Vercel, LangChain, Ollama) leads with a bold headline + subheadline + primary CTA. Visitors decide in 3-5 seconds whether to stay. | MEDIUM | Headline: what it is. Subheadline: why care. CTA: get started. MrHuang's hook is the irreverent Jensen Huang persona -- lean into it immediately. |
| **Primary CTA: GitHub repo link** | Open-source projects live or die by repo traffic. Supabase shows 98.2K stars in nav. Tabby shows 21.6K dynamically. LangChain shows "100k+ GitHub stars." The star count IS social proof. | LOW | Use dynamic GitHub star count button (ghbtns.com or GitHub API). Place in both navbar AND hero section. Star count auto-updates. |
| **Secondary CTA: Install / Get Started** | Ollama leads with `curl -fsSL ... | sh`. Every OSS project has a "get started" path from the hero. Visitors who don't click GitHub still need a path to adoption. | LOW | Link to the install guide section. Use language like "Get MrHuang Running" not generic "Get Started." |
| **Dark theme (primary, not toggle)** | GitHub dark (#0d1117) is the developer default. Over 80% of developers use dark mode. MrHuang's brand IS dark + NVIDIA green. A light-first site would feel wrong. | LOW | Dark-first design with Tailwind's dark utilities. No light mode toggle needed for v1 -- this is a brand choice, not an accessibility gap. Ensure 4.5:1 contrast ratio for text. |
| **Responsive design (mobile + desktop)** | Non-negotiable in 2026. Developers discover projects on phones (Twitter/X links, Reddit, HN). If hero is broken on mobile, they leave. | MEDIUM | Tailwind responsive utilities. Test hero, install guide, and cost calculator at 375px, 768px, 1024px, 1440px. |
| **Navigation with key sections** | Supabase, Vercel, LangChain all have clean top nav: Product/Features, Docs/Install, Pricing, GitHub. Users expect to find things without scrolling. | LOW | Sticky navbar: Features, Install, Cost Calculator, GitHub (with star count). Keep it to 4-5 items max. |
| **Features showcase section** | Every site (Supabase: 7 product cards, Replicate: 3 capability sections, Tabby: 5 feature highlights) explains what the product does. Without this, visitors don't know what they're installing. | MEDIUM | Card grid showing MrHuang's core features: AI Personas, Knowledge Base, WhatsApp Integration, Journaling, Voice, Dashboard. Each card = icon + name + 1-liner. |
| **Install guide / Getting Started** | Ollama's entire hero IS the install command. Every OSS project has a quickstart. MrHuang's 3-tier approach is the differentiator (see below), but having SOME install path is table stakes. | HIGH | This is MrHuang's most complex content piece. See Differentiators for the multi-tier approach. At minimum, a single copy-paste command block. |
| **Footer with essential links** | Supabase, Vercel, LangChain all have comprehensive footers: GitHub, docs, social, legal. Feels unfinished without one. | LOW | GitHub repo, creator attribution, social links (Twitter/X, Discord if exists). Keep lean -- this is a personal project, not an enterprise. |
| **Code blocks with copy-to-clipboard** | shadcn/ui, Supabase, Ollama, Replicate all have copy buttons on code. Developers expect to click-copy, not manually select text. | LOW | Use a code block component with syntax highlighting (Shiki or Prism) + clipboard copy button. Apply to all install commands and config examples. |
| **Social proof / credibility signals** | Supabase: customer logos + testimonials. LangChain: "90M monthly downloads." Replicate: "16M runs." Without proof someone uses it, visitors assume it's vaporware. | LOW | For a personal/early project: GitHub star count (primary), any community usage stats, "Built with Claude Opus" badge. Honest about stage -- don't fake enterprise logos. |
| **Open-source emphasis** | Supabase, Tabby, Dify, NetBird all prominently badge themselves as open source. It's a trust signal AND a feature. Developers want to see the code. | LOW | "100% Open Source" badge near hero. Link to GitHub repo. License type visible. "Your data never leaves your hardware" messaging. |
| **SEO basics (meta tags, OG image)** | Social sharing (Twitter/X, HN, Reddit) requires good OG tags. A link shared without a preview image gets dramatically fewer clicks. | LOW | Custom OG image with Jensen Huang persona + MrHuang branding. Title/description meta tags. Next.js handles this natively with metadata API. |

### Differentiators (Competitive Advantage)

Features that set mrhuang.ai apart. Not expected, but create the "this is special" moment.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **3-tier install guide (Noob / Terminal User / Veteran)** | No other OSS AI project segments install guides by user skill level. Ollama has one path. Dify has docker-compose. MrHuang explicitly saying "never used a terminal? start here" is radically inclusive AND memorable. | HIGH | Three parallel paths, each with appropriate detail level. Noob: screenshots, every keystroke. Terminal: standard commands, assumed knowledge. Veteran: one-liner + config reference. Use tabs or accordion to let users self-select. This is a MAJOR content effort -- likely the largest single feature. |
| **Interactive cost calculator** | Self-hosted AI has hidden costs (Anthropic API tokens, hosting, optional services). No comparable OSS AI companion project has a calculator. DocsBot, Helicone, and PricePerToken prove the UX pattern works for LLM pricing. MrHuang can be the first personal-AI project to do this. | HIGH | Inputs: estimated daily messages, average message length, chosen Claude model (Opus/Sonnet/Haiku). Outputs: monthly API cost, hosting cost estimate, total. Use sliders + dropdowns. Show "MrHuang costs less than your Netflix subscription" type comparisons for context. Pull Anthropic pricing data (hardcoded is fine, update quarterly). |
| **Jensen Huang persona cards** | The mascot IS the product's identity. No other AI project uses a real tech figure as an AI-generated persona with three distinct roles (Mentor, Therapist, Life Coach). This is the "most unhinged useful thing on the internet" moment. | MEDIUM | Three cards with AI-generated Jensen Huang images, each showing a different persona with distinct visual treatment. Hover effects revealing persona descriptions. This is the visual hook that makes people screenshot and share. |
| **Self-aware, meta-humorous tone** | Most OSS sites are corporate-serious (Supabase, Vercel) or clinically neutral (Ollama). MrHuang's voice -- honest about AI limitations, jokes about itself, paradox of sophistication + irreverence -- is genuinely unique in the space. | LOW | Not a "feature" to build, but a content strategy to apply everywhere. Example: "Will MrHuang replace your therapist? No. Will he listen at 3 AM without judging you? Also no, he will judge you, but he'll be helpful about it." Requires careful copywriting -- funny but not mean, honest but not self-deprecating to the point of undermining trust. |
| **Security / Zero-Trust section** | Self-hosted AI's killer value prop is privacy. MrHuang has genuine security features (PIN protection, HMAC webhooks, Cloudflare Tunnel, zero data exfiltration). NetBird and FerrumGate show how to communicate zero-trust credibly. Most personal AI projects DON'T emphasize security -- MrHuang can own this message. | MEDIUM | Dedicated section (not just a bullet point) with visual: data flow diagram showing "Your data stays on YOUR hardware." List security features with brief explanations. Tone: confident, not paranoid. "Your conversations with MrHuang never leave your server. Period." |
| **"Coming Soon" native apps teaser** | Creates anticipation and signals the project has a future. Vercel and Supabase both tease upcoming features. For MrHuang, native apps are a genuine roadmap item that developers will want to know about. | LOW | Minimal section near bottom: app store mockup silhouettes, "Native apps coming soon" with email signup or GitHub watch CTA. Don't over-promise. |
| **Animated/interactive hero** | Tabby uses ASCII art animations. Vercel has deployment demos. Supabase has animated feature cards. A static hero works, but animation creates the "premium" feeling that converts casual visitors to engaged ones. | MEDIUM | Subtle animations: persona cards that gently float or have parallax. NVIDIA green glow effects. Terminal-style typing animation for the install command. Don't go overboard -- performance matters more than flash. |
| **Framework/architecture overview** | Tabby shows supported IDEs. Supabase shows framework quickstarts. MrHuang's stack (Claude + Node/Express + React + SQLite + Cloudflare Tunnel + Tailscale) is interesting to developers. Showing it builds trust AND attracts contributors. | LOW | Simple tech stack visual: logos in a horizontal bar or small architecture diagram. "Built with" section showing Claude, Node.js, React, SQLite, Cloudflare. Links to relevant docs. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but should be deliberately NOT built for mrhuang.ai v1.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **Light/dark mode toggle** | "Accessibility" and "user preference" | MrHuang's brand IS dark. Adding a light mode doubles the design/testing surface for zero brand benefit. The GitHub dark + NVIDIA green identity would be diluted. Accessibility is about contrast ratios, not light backgrounds. | Design dark-first with proper contrast (4.5:1 minimum). Use lighter grays for body text instead of pure white. This IS accessible dark mode. |
| **Blog / CMS system** | "Content marketing" and "SEO" | Adds massive complexity (CMS integration, content workflow, RSS, pagination). A personal project doesn't need a blog engine. The README, GitHub discussions, and social posts serve the same purpose with zero maintenance. | Link to GitHub Discussions for updates. Use the repo's README as the canonical "blog." If needed later, add MDX pages to Next.js (no CMS). |
| **User accounts / auth** | "Track installs" and "community features" | The website advertises the repo -- it doesn't RUN MrHuang. Adding auth creates backend requirements, privacy obligations, and maintenance burden for a static marketing site. | GitHub stars/forks ARE your user tracking. Discord/GitHub Discussions for community. The product itself (MrHuang) has its own auth. |
| **Live demo / playground** | "Let people try before installing" | MrHuang requires Claude API keys and runs on user hardware. A live demo means hosting a full MrHuang instance, paying for API calls, moderating content, and handling abuse. Massive cost and liability for a personal project. | Screenshots and screen recordings showing MrHuang in action. A short video walkthrough (30-60 seconds) is 10x cheaper and safer than a live demo. |
| **i18n / multi-language** | "Reach global audience" | Multiplies content by N languages. Translation quality matters for trust. Maintaining 3-tier install guides in 5 languages is a full-time job. English-speaking developer audience is the v1 target. | English only for v1. Clean content architecture (Next.js App Router) makes adding i18n later straightforward if demand warrants it. |
| **Analytics dashboard (public)** | "Show project health" | Public analytics (downloads, active installs) require telemetry in the product -- which contradicts the "your data stays on your hardware" privacy message. Public dashboards also expose unflattering early numbers. | GitHub Insights (stars over time, traffic) are already public. Mention download stats from npm if/when available. Don't build custom analytics. |
| **Comparison page vs competitors** | "Show why MrHuang is better" | Drawing direct comparisons invites scrutiny and positions MrHuang against products with bigger teams. A personal AI companion doesn't compete with ChatGPT or enterprise platforms -- it occupies a different niche entirely. | Let the personality and self-hosting angle speak for themselves. The tone and mascot already differentiate without needing a feature matrix. |
| **Newsletter signup** | "Build an audience" | Requires email service (Resend, Mailchimp), GDPR compliance, unsubscribe handling, and regular content creation. Overhead for a solo developer with a GitHub project. | "Watch" or "Star" the repo on GitHub for updates. GitHub's built-in notification system is the newsletter. If email is truly needed later, use GitHub Sponsors or a simple Buttondown integration. |
| **Pricing page** | "Show what it costs" | MrHuang is free and open source. A "Pricing" page implies paid tiers or hosting services that don't exist. Confuses the value proposition. | The interactive cost calculator handles the "what will this cost me?" question by showing API and hosting costs. Frame it as "Running Costs" not "Pricing." |

## Feature Dependencies

```
[Dark Theme + Design System]
    |-- required by --> [Hero Section]
    |-- required by --> [Navigation]
    |-- required by --> [Features Showcase]
    |-- required by --> [All page sections]

[Hero Section]
    |-- contains --> [GitHub Star CTA]
    |-- contains --> [Jensen Huang Persona Cards]
    |-- contains --> [Install CTA link]

[Navigation]
    |-- links to --> [Features Showcase]
    |-- links to --> [Install Guide]
    |-- links to --> [Cost Calculator]
    |-- links to --> [GitHub Repo]

[Code Block Component (with copy)]
    |-- required by --> [Install Guide]
    |-- required by --> [Cost Calculator output]

[Install Guide (3-tier)]
    |-- requires --> [Code Block Component]
    |-- requires --> [Tab/Accordion Component]
    |-- enhanced by --> [Cost Calculator] (link to cost context)

[Cost Calculator]
    |-- requires --> [Slider/Input Components]
    |-- requires --> [Anthropic Pricing Data]
    |-- enhanced by --> [Security Section] (self-hosted = you control costs)

[Security Section]
    |-- enhanced by --> [Architecture Overview] (shows data flow)

[Jensen Huang Persona Cards]
    |-- requires --> [AI-generated images] (external asset dependency)
    |-- enhanced by --> [Animated Hero]
```

### Dependency Notes

- **Dark Theme + Design System requires nothing, enables everything:** This must be built first. Every component inherits from it. Tailwind config with NVIDIA green (#76b900) and GitHub dark (#0d1117) tokens.
- **Code Block Component required by Install Guide:** The install guide is useless without copy-paste code blocks. Build the component before the content.
- **Jensen Huang images are an external dependency:** The creator supplies AI-generated images. Use placeholder silhouettes during build. The persona cards' visual impact depends entirely on image quality.
- **Cost Calculator is self-contained but complex:** It doesn't block anything else, but it's the highest-complexity interactive feature. Can be deferred to a later phase without hurting the core experience.
- **Install Guide is the heaviest content effort:** Three parallel paths with different detail levels. This is where the most writing time goes, not the most code time.

## MVP Definition

### Launch With (v1)

Minimum viable product -- what's needed for the site to convert a visitor into a GitHub star or install.

- [ ] **Dark theme + design system** -- Foundation for everything. Tailwind config, color tokens, typography scale. Without this, nothing looks right.
- [ ] **Hero section with persona cards** -- The first impression. Jensen Huang cards, headline, GitHub star CTA, install CTA. This is the "screenshot moment."
- [ ] **Navigation (sticky)** -- 4-5 items: Features, Install, Cost Calculator, GitHub. Developers need to navigate.
- [ ] **Features showcase** -- Card grid of MrHuang's capabilities. Developers need to know what they're installing.
- [ ] **Single-path install guide** -- Start with the "Terminal User" tier (the middle ground). Copy-paste commands with syntax highlighting. Expand to 3 tiers after launch.
- [ ] **GitHub star CTA (dynamic count)** -- In nav AND hero. This is the primary conversion metric.
- [ ] **Open-source + security messaging** -- "100% Open Source" badge + "Your data stays on your hardware" one-liner. Trust signals.
- [ ] **Footer** -- GitHub, social links, attribution. Completeness signal.
- [ ] **SEO + OG tags** -- Meta tags, OG image. Required for social sharing (HN, Reddit, Twitter/X launch).
- [ ] **Responsive design** -- Mobile must work. Period.

### Add After Validation (v1.x)

Features to add once the core site is live and getting traffic.

- [ ] **3-tier install guide** -- Expand from single path to Noob/Terminal/Veteran tabs. Trigger: user feedback that install is too hard or too simple.
- [ ] **Interactive cost calculator** -- Sliders + model selection + monthly estimate. Trigger: users asking "how much does this cost to run?" in GitHub Issues.
- [ ] **Security deep-dive section** -- Data flow diagram, feature-by-feature security breakdown. Trigger: users asking about privacy in Issues/Discussions.
- [ ] **Animated hero effects** -- Parallax cards, typing animation, NVIDIA green glow. Trigger: site is functional, time to polish.
- [ ] **Architecture/tech stack overview** -- Logo bar + simple diagram. Trigger: getting contributor interest, people wanting to understand the codebase.

### Future Consideration (v2+)

Features to defer until the project has meaningful traction.

- [ ] **"Coming Soon" native apps section** -- Only add when native apps are actually in development, not aspirational.
- [ ] **Screen recording / video walkthrough** -- Requires a polished, stable MrHuang instance to record. Defer until product is mature.
- [ ] **MDX-based documentation** -- Full docs site with sidebar navigation. Only if the README outgrows its usefulness.
- [ ] **Discord community integration** -- Widget or link. Only when there's a community to join.
- [ ] **i18n support** -- Only if non-English user demand is demonstrated.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Hero section + persona cards | HIGH | MEDIUM | P1 |
| Dark theme + design system | HIGH | LOW | P1 |
| GitHub star CTA (dynamic) | HIGH | LOW | P1 |
| Navigation (sticky) | HIGH | LOW | P1 |
| Features showcase cards | HIGH | MEDIUM | P1 |
| Code block component (copy) | HIGH | LOW | P1 |
| Single-path install guide | HIGH | MEDIUM | P1 |
| Open-source + security badges | MEDIUM | LOW | P1 |
| Footer | MEDIUM | LOW | P1 |
| SEO + OG tags | MEDIUM | LOW | P1 |
| Responsive design | HIGH | MEDIUM | P1 |
| Self-aware humorous copy | HIGH | LOW (writing effort) | P1 |
| 3-tier install guide | HIGH | HIGH | P2 |
| Interactive cost calculator | HIGH | HIGH | P2 |
| Security deep-dive section | MEDIUM | MEDIUM | P2 |
| Animated hero effects | MEDIUM | MEDIUM | P2 |
| Architecture overview | LOW | LOW | P2 |
| Native apps teaser | LOW | LOW | P3 |
| Video walkthrough | MEDIUM | MEDIUM | P3 |
| MDX documentation | MEDIUM | HIGH | P3 |
| Discord integration | LOW | LOW | P3 |

**Priority key:**
- P1: Must have for launch -- site is incomplete without these
- P2: Should have, add when core site is live and validated
- P3: Nice to have, only when project has traction

## Competitor Feature Analysis

| Feature | Supabase | Ollama | Tabby | Replicate | MrHuang Approach |
|---------|----------|--------|-------|-----------|------------------|
| **Hero** | "Build in a weekend, Scale to millions" + dual CTA | Install command AS the hero | "Secure, flexible, transparent AI coding" + live demo CTA | "Run AI with an API" + multi-language code | Jensen Huang persona cards + irreverent headline + GitHub star CTA |
| **GitHub stars display** | 98.2K in navbar | Not prominently displayed | 21.6K dynamic count | N/A (not fully OSS) | Dynamic count in navbar AND hero |
| **Install path** | Framework quickstarts (React, Next, Flutter, etc.) | Single curl command | Documentation link | pip/npm one-liner + API key | 3-tier: Noob (step-by-step), Terminal (commands), Veteran (one-liner) |
| **Dark theme** | Toggle (dark default) | Light default | Dark with ASCII art glow | Light default | Dark-only, GitHub dark + NVIDIA green. Brand, not preference. |
| **Cost transparency** | Pricing page with tiers | Free (local models) | Free community + paid team/enterprise | Per-second GPU pricing table | Interactive calculator for API + hosting costs |
| **Security messaging** | SOC2, HIPAA badges | Implicit (local = private) | "Transparency & Security" section | Enterprise section | Dedicated section: zero-trust, data flow diagram, PIN/HMAC/Tunnel details |
| **Mascot/personality** | None (professional) | None (minimal) | Pochi (agent name) | None | Jensen Huang AI personas (Mentor, Therapist, Life Coach) -- THE differentiator |
| **Social proof** | 15+ company logos, testimonials | 40K+ integrations count | IDE support logos, model partner logos | Model run counts (16M+), creator logos | GitHub stars, "Built with Claude" badge, honest about stage |
| **Tone** | Professional, developer-focused | Minimal, utilitarian | Technical, enterprise-ready | Developer-friendly, clean | Irreverent, self-aware, funny-but-competent. "Super smart. Also kinda retarded." |

## Sources

- [Supabase](https://supabase.com) -- Analyzed hero, navigation, social proof, features, dark mode implementation (HIGH confidence, direct observation)
- [shadcn/ui](https://ui.shadcn.com) -- Analyzed component showcase, dark/light mode, copy-to-clipboard, GitHub integration (HIGH confidence, direct observation)
- [Replicate](https://replicate.com) -- Analyzed hero, code examples, model showcase, pricing display (HIGH confidence, direct observation)
- [Vercel](https://vercel.com) -- Analyzed hero, framework logos, dark/light toggle, customer metrics (HIGH confidence, direct observation)
- [LangChain](https://langchain.com) -- Analyzed hero, product pillars, social proof stats, community elements (HIGH confidence, direct observation)
- [Ollama](https://ollama.com) -- Analyzed install-first hero, navigation, integration ecosystem (HIGH confidence, direct observation)
- [Tabby](https://www.tabbyml.com) -- Analyzed self-hosted AI positioning, GitHub star display, security messaging, ASCII animations (HIGH confidence, direct observation)
- [NetBird](https://netbird.io) -- Analyzed zero-trust security messaging, open-source + enterprise balance (MEDIUM confidence, direct observation)
- [DocsBot AI Pricing Calculator](https://docsbot.ai/tools/gpt-openai-api-pricing-calculator) -- Analyzed interactive LLM cost calculator UX (MEDIUM confidence, direct observation)
- [Helicone LLM Cost Calculator](https://www.helicone.ai/llm-cost) -- Referenced for multi-model cost comparison patterns (LOW confidence, search result only)
- [GitHub Buttons](https://ghbtns.com/) -- Dynamic GitHub star/fork/watch buttons for websites (HIGH confidence, established tool)
- [Lapa Ninja Open Source Category](https://www.lapa.ninja/category/open-source/) -- Open source landing page design patterns (MEDIUM confidence, curated gallery)
- [Dark Mode Best Practices 2026](https://natebal.com/best-practices-for-dark-mode/) -- Dark theme implementation guidelines (MEDIUM confidence, WebSearch)
- [Smashing Magazine - Inclusive Dark Mode](https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/) -- Accessibility requirements for dark themes (MEDIUM confidence, authoritative publication)
- [freeCodeCamp - GitHub Stars Growth](https://www.freecodecamp.org/news/how-to-get-more-engagement-with-your-open-source-project/) -- Strategies for GitHub star conversion (MEDIUM confidence, credible publication)

---
*Feature research for: mrhuang.ai -- Open-source AI project marketing & documentation website*
*Researched: 2026-03-01*
