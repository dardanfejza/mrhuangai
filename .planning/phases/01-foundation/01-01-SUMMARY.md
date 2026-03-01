---
phase: 01-foundation
plan: 01
subsystem: infra
tags: [nextjs, tailwindcss, shadcn, postcss, static-export, design-tokens]

# Dependency graph
requires: []
provides:
  - Next.js 16.1.6 project scaffolded with TypeScript, ESLint, App Router
  - Tailwind CSS v4 CSS-first design system (@theme tokens available to all components)
  - shadcn/ui initialized (New York style, Neutral base, CSS variables)
  - Static export configured (output: 'export', trailingSlash: true)
  - Custom image loader for next-image-export-optimizer
  - NVIDIA green (#76b900) + GitHub dark (#0d1117) design tokens
  - WCAG AA enforcement: dark text on .bg-nvidia elements
affects: [01-02, 01-03, 01-04, all-subsequent-phases]

# Tech tracking
tech-stack:
  added:
    - next@16.1.6
    - react@19.2.3
    - tailwindcss@4.2.1
    - "@tailwindcss/postcss@4.2.1"
    - postcss@8.5.6
    - next-image-export-optimizer@1.20.1
    - rehype-pretty-code@0.14.1
    - shiki@3.23.0
    - lucide-react@0.575.0
    - clsx@2.1.1
    - tailwind-merge@3.5.0
    - shadcn/ui@3.8.5
    - tw-animate-css (via shadcn)
  patterns:
    - Tailwind v4 CSS-first: all tokens defined in @theme block in globals.css, no tailwind.config.ts
    - shadcn/ui: source-copied components in components/ui, lib/utils.ts provides cn() helper
    - Static export: all pages must be statically renderable, no API routes

key-files:
  created:
    - next.config.ts
    - lib/image-loader.ts
    - lib/utils.ts
    - app/globals.css
    - postcss.config.mjs
    - components.json
    - package.json
    - tsconfig.json
  modified: []

key-decisions:
  - "Scaffolded in /tmp to bypass create-next-app conflict with existing .planning/ directory, then rsync'd to project root"
  - "Downgraded shiki 4.0.0 -> 3.23.0 for rehype-pretty-code 0.14.1 peer dependency compatibility"
  - "Merged shadcn/ui CSS variables with project design tokens: @theme inline block for shadcn, separate @theme block for brand tokens"
  - "Overrode shadcn :root defaults with GitHub dark palette so site defaults to dark without .dark class toggle"
  - "No tailwind.config.ts created — Tailwind v4 CSS-only approach maintained"

patterns-established:
  - "Design tokens: use --color-canvas-default, --color-border-default, --color-fg-muted etc for GitHub dark theme"
  - "Brand accent: use bg-nvidia class (maps to #76b900) — WCAG rule auto-applies dark text"
  - "Image handling: use next/image with custom loader, not <img> tags"
  - "Component utilities: use cn() from lib/utils.ts for conditional class merging"

requirements-completed: [FOUND-01, FOUND-02]

# Metrics
duration: 3min
completed: 2026-03-01
---

# Phase 1 Plan 01: Project Scaffold & Design System Summary

**Next.js 16.1.6 static export project with Tailwind v4 @theme tokens, GitHub dark palette, NVIDIA green (#76b900) WCAG-enforced design system, and shadcn/ui initialized**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-01T13:26:17Z
- **Completed:** 2026-03-01T13:29:30Z
- **Tasks:** 2
- **Files modified:** 13

## Accomplishments

- Next.js 16.1.6 with App Router, TypeScript, ESLint, and all required dependencies installed
- Tailwind v4 CSS-first design system active with brand tokens (NVIDIA green, GitHub dark canvas, borders, foreground)
- shadcn/ui initialized with merged design tokens — shadcn components will inherit GitHub dark defaults without needing `.dark` class
- Static export fully configured: `output: 'export'`, `trailingSlash: true`, custom image loader
- `pnpm build` produces `out/` directory without errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold project with create-next-app and install all dependencies** - `7e99d0a` (chore)
2. **Task 2: Configure static export, design tokens, and image loader** - `2068d4a` (feat)

**Plan metadata:** _(final docs commit — see below)_

## Files Created/Modified

- `next.config.ts` - Static export config: output: 'export', trailingSlash: true, custom image loader
- `lib/image-loader.ts` - Custom image loader for next-image-export-optimizer
- `lib/utils.ts` - cn() helper created by shadcn init (clsx + tailwind-merge)
- `app/globals.css` - Tailwind v4 @theme tokens + shadcn CSS variables merged with GitHub dark palette
- `postcss.config.mjs` - Tailwind v4 PostCSS plugin (@tailwindcss/postcss)
- `components.json` - shadcn/ui configuration (New York style, Neutral, Tailwind v4)
- `package.json` - All dependencies declared
- `pnpm-lock.yaml` - Lock file for reproducible installs
- `tsconfig.json` - TypeScript config with @/* import alias
- `eslint.config.mjs` - ESLint configuration
- `public/` - Default Next.js SVG assets
- `app/layout.tsx` - Root layout (imports globals.css)
- `app/page.tsx` - Default home page (placeholder)

## Decisions Made

- **Scaffold in /tmp:** `create-next-app` refuses to run in a directory with existing files (`.planning/`, `concept.md`). Scaffolded in `/tmp/nextjs-scaffold`, then `rsync`'d to project root excluding `.git`, `node_modules`, `.next`.
- **shiki version:** shiki 4.0.0 has a peer conflict with `rehype-pretty-code 0.14.1` (requires `^1.0.0 || ^2.0.0 || ^3.0.0`). Downgraded to `shiki@3.23.0`.
- **Merged CSS tokens:** shadcn init rewrote `globals.css` with its own token structure. Rather than fully replacing, the project tokens were added in a separate `@theme` block and shadcn's `:root` variables were overridden with the GitHub dark palette. This keeps shadcn components working while applying the correct dark defaults site-wide.
- **Dark-first defaults:** shadcn defaults to light mode and requires a `.dark` class toggle for dark. Instead, `:root` was set to GitHub dark values so the site is always dark without needing client-side class toggling.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Scaffolded in /tmp due to directory conflict**
- **Found during:** Task 1 (scaffold with create-next-app)
- **Issue:** `create-next-app` exits with error when target directory contains files (`.planning/`, `concept.md`). The `--yes` flag does not override this check.
- **Fix:** Ran `create-next-app` in `/tmp/nextjs-scaffold`, then `rsync`'d scaffolded files to project root excluding `.git`, `node_modules`, `.next`
- **Files modified:** All scaffold files (rsync operation)
- **Verification:** `pnpm install` and `pnpm build` succeeded after copy
- **Committed in:** `7e99d0a` (Task 1 commit)

**2. [Rule 1 - Bug] Downgraded shiki 4.0.0 to 3.23.0**
- **Found during:** Task 1 (install supporting libraries)
- **Issue:** `pnpm add shiki` fetched shiki 4.0.0 which is outside `rehype-pretty-code 0.14.1`'s peer dependency range (`^1.0.0 || ^2.0.0 || ^3.0.0`), causing a peer conflict warning
- **Fix:** Ran `pnpm add shiki@^3.0.0` to install shiki 3.23.0
- **Files modified:** `package.json`, `pnpm-lock.yaml`
- **Verification:** No peer dependency warnings in subsequent installs
- **Committed in:** `7e99d0a` (Task 1 commit)

**3. [Rule 3 - Blocking] Seeded globals.css with @import before shadcn init**
- **Found during:** Task 1 (shadcn init)
- **Issue:** shadcn init failed with "No Tailwind CSS configuration found" because `globals.css` was the default non-Tailwind file and no `tailwind.config.ts` existed. shadcn v3.8.5 requires `@import "tailwindcss"` present to detect v4.
- **Fix:** Wrote `@import "tailwindcss"` to `globals.css` and created `postcss.config.mjs` before running `shadcn init`
- **Files modified:** `app/globals.css`, `postcss.config.mjs`
- **Verification:** shadcn init detected "Found v4" and completed successfully
- **Committed in:** `7e99d0a` (Task 1 commit — files then overwritten in Task 2 with final content)

---

**Total deviations:** 3 auto-fixed (2 blocking, 1 bug)
**Impact on plan:** All fixes required for task completion. No scope creep. Plan intent fully realized.

## Issues Encountered

None beyond the auto-fixed deviations documented above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Foundation complete. All subsequent plans can import `@/*` aliases and use Tailwind v4 utility classes.
- Design tokens (`bg-nvidia`, `bg-canvas-default`, `text-fg-muted`, `border-border-default`) available immediately.
- shadcn components can be added via `pnpm dlx shadcn@latest add [component]`.
- Static export verified: any new page/component must not use server-side features (`getServerSideProps`, API routes, etc.).

---
*Phase: 01-foundation*
*Completed: 2026-03-01*

## Self-Check: PASSED

All files and commits verified:
- next.config.ts: FOUND
- lib/image-loader.ts: FOUND
- lib/utils.ts: FOUND
- app/globals.css: FOUND
- postcss.config.mjs: FOUND
- out/ directory: FOUND
- commit 7e99d0a: FOUND
- commit 2068d4a: FOUND
