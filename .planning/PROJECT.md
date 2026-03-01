# mrhuang.ai — Marketing & Documentation Website

## What This Is

A Next.js marketing and documentation website for MrHuang, an open-source self-hosted AI companion powered by Claude. The site advertises the GitHub repo at mrhuang.ai, showcases MrHuang's three core personas (Mentor, Therapist, Life Coach — all visually embodied by AI-generated Jensen Huang imagery), and guides three distinct user tiers through installation. Styled like GitHub's dark UI with NVIDIA green (#76b900) accents.

## Core Value

Get a developer — from vibecoder to bash veteran — from "what is this?" to "MrHuang is running on my server" as fast as possible, while making them feel like they just discovered the most unhinged useful thing on the internet.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Landing page: hero section with Jensen Huang AI persona cards (Mentor, Therapist, Life Coach)
- [ ] Landing page: features showcase (AI roles, knowledge base, WhatsApp, journal, dashboard, voice)
- [ ] Landing page: security/zero-trust emphasis section
- [ ] Landing page: "Coming Soon" native apps teaser
- [ ] Landing page: open-source CTA linking to GitHub repo
- [ ] Install guide: 3 user tiers (noob vibecoder, terminal user, bash/zsh veteran)
- [ ] Features/Docs page: full feature breakdown matching mrhuang_taxonomy.md
- [ ] Cost calculator: interactive monthly cost breakdown (Anthropic API, hosting, optional services)
- [ ] Self-aware meta-humorous tone throughout (jokes about itself, honest about AI limitations)
- [ ] NVIDIA green + GitHub dark theme applied consistently
- [ ] Responsive design (mobile + desktop)
- [ ] mrhuang.ai domain-ready (no backend, static or SSG)

### Out of Scope

- Backend/API — purely a marketing/docs site, no server-side logic
- Auth/login — no user accounts on the website itself
- Actual MrHuang functionality — the site advertises the repo, doesn't run MrHuang
- CMS integration — content is code, not database-driven (v1)
- i18n/localization — English only for v1

## Context

- Source repo: github.com/dardanfejza/mrhuang (open source)
- Target domain: mrhuang.ai
- MrHuang is built on: Claude Opus 4.6, Node.js/Express, React 19, SQLite, Cloudflare Tunnel, Tailscale
- The product has a distinctive paradox: deeply sophisticated AI engineering + deliberately irreverent personality ("Super smart. Also kinda retarded.")
- Jensen Huang (NVIDIA CEO) is the visual mascot — AI-generated images of him in each role (Mentor, Therapist, Life Coach)
- Three user tiers for install guide:
  1. **Noob vibecoder** — never used terminal, follows copy-paste instructions
  2. **Terminal user** — comfortable with CLI, understands `cd` and `npm install`
  3. **Bash/zsh veteran** — knows the difference, can configure environment from scratch
- Security is a genuine differentiator: PIN protection, HMAC webhooks, Cloudflare Tunnel, zero data leaves your hardware (except API calls)
- Coming soon: native apps to interface with MrHuang

## Constraints

- **Tech Stack**: Next.js (App Router) + Tailwind CSS — standard for static/SSG marketing sites
- **Styling**: NVIDIA green (#76b900) primary accent, GitHub dark theme base (bg ~#0d1117, border ~#30363d)
- **Assets**: AI-generated Jensen Huang images (3 role variants) — creator will supply; placeholders used during build
- **No backend**: Site is statically generated (SSG) or uses Next.js static export
- **Open source**: Codebase for the website itself should be clean and open-sourceable

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router | Standard for modern marketing sites, SSG support, fast | — Pending |
| Static export / SSG | No backend needed, deploy to Cloudflare Pages / Vercel easily | — Pending |
| Tailwind CSS | Matches existing MrHuang frontend stack, fast iteration | — Pending |
| NVIDIA green accent | Brand alignment with Jensen Huang mascot | — Pending |

---
*Last updated: 2026-03-01 after initialization*
