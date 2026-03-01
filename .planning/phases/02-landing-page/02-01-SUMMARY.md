---
phase: 02-landing-page
plan: 01
subsystem: ui
tags: [nextjs, react, tailwind, server-component, hero, persona-cards]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: design tokens (bg-nvidia, text-fg-default, etc.), Nav/Footer layout, lib/github.ts getStarCount, lib/utils.ts cn()
provides:
  - HeroSection server component with headline, persona cards, CTA, and Open Source badge
  - app/page.tsx wired to fetch GitHub stars and pass to HeroSection
affects: [02-landing-page plans using HeroSection, any page consuming star counts]

# Tech tracking
tech-stack:
  added: []
  patterns: [Server Component receiving data as props from async page.tsx, persona cards with inline disclaimers]

key-files:
  created:
    - components/sections/HeroSection.tsx
  modified:
    - app/page.tsx

key-decisions:
  - "HeroSection is a plain (non-async) Server Component — stars fetched by app/page.tsx and passed as prop"
  - "app/page.tsx replaces Phase 1 placeholder stub entirely — no legacy content retained"
  - "Persona card disclaimer appears inside each card (pt-4 mt-auto) not in the page footer"

patterns-established:
  - "Section components pattern: plain Server Components in components/sections/ receiving data props from page.tsx"
  - "CTA pattern: bg-nvidia + text-gray-950 for WCAG compliance, not text-white"

requirements-completed: [HERO-01, HERO-02, HERO-03, HERO-04, FEAT-03, SEO-02]

# Metrics
duration: 2min
completed: 2026-03-01
---

# Phase 2 Plan 01: HeroSection — Landing Page Centerpiece Summary

**Hero section Server Component with three AI-persona cards, humorous self-aware copy, GitHub star CTA, and 100% Open Source badge using NVIDIA green design tokens**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-01T20:14:28Z
- **Completed:** 2026-03-01T20:16:30Z
- **Tasks:** 1
- **Files modified:** 2

## Accomplishments
- Created `components/sections/HeroSection.tsx` as a plain Server Component (no `"use client"`, no `async`)
- Three persona cards (Mentor, Therapist, Life Coach) with initials placeholders, humorous taglines, and per-card NVIDIA disclaimer
- "Star on GitHub" CTA with `bg-nvidia` + `text-gray-950` (WCAG AA compliant) showing star count if available
- "100% Open Source" badge and secondary "View on GitHub" ghost link
- Self-aware meta-humorous headline and sub-copy ("Super smart. Also kinda dumb. Remarkably useful.")
- Replaced Phase 1 placeholder stub in `app/page.tsx` — now calls `getStarCount()` and renders `<HeroSection stars={stars} />`

## Task Commits

Each task was committed atomically:

1. **Task 1: HeroSection server component with persona cards and CTA** - `0a9e8ac` (feat)

**Plan metadata:** (docs commit to follow)

## Files Created/Modified
- `components/sections/HeroSection.tsx` - Hero section Server Component: headline, persona cards, CTA, Open Source badge
- `app/page.tsx` - Wired to fetch GitHub star count and render HeroSection

## Decisions Made
- HeroSection receives `stars?: number` as prop from `app/page.tsx` — component itself is not async, consistent with the plan's Server Component pattern
- Phase 1 placeholder page entirely replaced — no content from it was worth preserving
- Persona card disclaimer uses `mt-auto pt-4` to visually anchor it to the card bottom while remaining inside the card boundary

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- HeroSection is complete and TypeScript-clean, ready for Phase 2 subsequent plans
- Persona card image placeholders (initials on dark bg) are ready to be replaced with actual AI-generated Jensen Huang persona images when available
- Star count display works via `getStarCount()` fallback (returns 0 if GitHub API unreachable at build time)

---
*Phase: 02-landing-page*
*Completed: 2026-03-01*
