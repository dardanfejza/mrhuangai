---
phase: 01-foundation
plan: 03
subsystem: ui
tags: [shiki, syntax-highlighting, clipboard, react, nextjs, server-component, client-component]

# Dependency graph
requires:
  - phase: 01-foundation
    plan: 01
    provides: Design tokens (bg-canvas-subtle, border-border-default, text-fg-muted, text-nvidia), shiki installed, lucide-react installed

provides:
  - CodeBlock async server component with shiki github-dark syntax highlighting at build time
  - CopyButton client component with clipboard interaction and 2-second check icon feedback
  - components/code/ shared infrastructure for all code snippet usage in Phase 3 and beyond

affects:
  - 03-content-pages (install guide code blocks will import CodeBlock)
  - Any future page requiring code snippets

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Async server component for build-time rendering (CodeBlock)"
    - "Client component for browser API access (CopyButton)"
    - "shiki codeToHtml with github-dark theme for syntax highlighting"
    - "[&_pre]:!bg-transparent CSS override to neutralize shiki injected background"
    - "group/opacity-0/group-hover:opacity-100 Tailwind pattern for hover-revealed UI"

key-files:
  created:
    - components/code/CopyButton.tsx
    - components/code/CodeBlock.tsx
  modified: []

key-decisions:
  - "Used [&_pre]:!bg-transparent to override shiki github-dark theme background (#24292e) so bg-canvas-subtle (#161b22) shows through from the wrapper div"
  - "CopyButton fails silently on clipboard error (non-HTTPS environments, old browsers) — no user-facing error state needed for v1"

patterns-established:
  - "Server/client component split: CodeBlock (async server) imports CopyButton (client) — server-renders HTML, client handles interactivity"
  - "biome-ignore lint/security/noDangerouslySetInnerHtml comment required for shiki dangerouslySetInnerHTML usage"

requirements-completed: [INST-03]

# Metrics
duration: 5min
completed: 2026-03-01
---

# Phase 1 Plan 3: Code Block Components Summary

**Shiki github-dark syntax highlighting server component paired with clipboard CopyButton client component, using [&_pre]:!bg-transparent to override shiki's injected background color**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-03-01T22:35:00Z
- **Completed:** 2026-03-01T22:40:00Z
- **Tasks:** 2
- **Files modified:** 2 (both new)

## Accomplishments
- CopyButton client component with navigator.clipboard.writeText, 2-second check icon feedback, silent error handling
- CodeBlock async server component using codeToHtml with github-dark theme at build time
- Background color override: `[&_pre]:!bg-transparent` prevents shiki's #24292e from overriding our canvas-subtle (#161b22)
- Hover-reveal copy button via Tailwind group pattern (opacity-0 / group-hover:opacity-100)
- `pnpm build` exits 0 with no errors

## Task Commits

Each task was committed atomically:

1. **Task 1: CopyButton client component** - `791edab` (feat)
2. **Task 2: CodeBlock async server component with shiki highlighting** - `78bb99d` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `components/code/CopyButton.tsx` - Client component: clipboard write, Check/Copy icons, 2s feedback, silent error handling
- `components/code/CodeBlock.tsx` - Async server component: shiki codeToHtml, github-dark theme, optional filename header, hover CopyButton

## Decisions Made
- Used `[&_pre]:!bg-transparent` CSS override on the inner div to neutralize shiki's injected `background-color: #24292e` on the `<pre>` element, allowing the wrapper's `bg-canvas-subtle` to show through. This approach is more maintainable than post-processing the HTML string.
- Silent clipboard failure (empty catch block) is correct for v1 — clipboard errors occur in non-HTTPS contexts where the site wouldn't normally be served anyway.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None — shiki 3.23.0 (already installed in Plan 01) processed correctly in the build. No TypeScript errors. Build passed cleanly on first attempt.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- CodeBlock and CopyButton are ready to be imported by Phase 3 install guide pages
- Components use design tokens established in Plan 01 — no hardcoded hex colors (except the intentional shiki background override comment)
- No blockers for Plan 04 (deploy pipeline)

---
*Phase: 01-foundation*
*Completed: 2026-03-01*
