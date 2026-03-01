# Stack Research

**Domain:** Open-source project marketing + documentation website
**Project:** mrhuang.ai
**Researched:** 2026-03-01
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 16.x (latest LTS: 16.1.6) | Framework, SSG, static export | Industry standard for marketing/docs sites. App Router is stable. Turbopack is default and stable in v16. Static export via `output: 'export'` produces pure HTML/CSS/JS deployable anywhere. React Server Components run at build time for zero client JS by default. |
| React | 19.x | UI library | Ships with Next.js 16. Stable React Compiler support means no manual `useMemo`/`useCallback`. Required by all other libraries in this stack. |
| TypeScript | 5.x | Type safety | Non-negotiable for any serious project. Next.js 16 has first-class TS support. Catches bugs at build time, enables IDE autocompletion for the entire codebase. |
| Tailwind CSS | 4.2.x (latest: 4.2.1) | Styling | CSS-first configuration in v4 (no `tailwind.config.js` needed). Use `@theme` rule in CSS to define NVIDIA green and GitHub dark tokens. 5x faster full builds, 100x faster incremental. Built-in container queries, 3D transforms. One-line setup: `@import "tailwindcss"`. |
| Node.js | 22.x LTS | Runtime | Required by Next.js 16. LTS channel for stability. |

### Component Library & UI

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| shadcn/ui | Latest (CLI: `npx shadcn`) | UI component foundation | Not a dependency -- copies source code into your project. Full ownership, zero runtime overhead. 100+ accessible, Tailwind-native components. Dark mode via CSS variables + `next-themes`. Uses unified `radix-ui` package (Feb 2026 update). Perfect for GitHub-dark aesthetic because you own and customize every component. |
| Radix UI | Latest (unified `radix-ui` package) | Headless accessible primitives | Powers shadcn/ui components. Handles keyboard navigation, focus management, screen reader support. The new unified package replaces individual `@radix-ui/react-*` imports. |
| next-themes | 0.4.6 | Dark mode management | Two lines of code for flicker-free dark mode. Uses `data-theme` attribute to drive CSS variables. shadcn/ui's official recommendation. Stable despite no recent releases -- the API is complete. |
| Lucide React | 0.575.x | Icons | Default icon set for shadcn/ui. Tree-shakable ESM-first architecture -- only icons you import hit the bundle. 1000+ icons, 29M+ weekly downloads. Outperforms react-icons in bundle size benchmarks. |

### Animation

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Motion (formerly Framer Motion) | 12.x (latest: 12.34.3) | Page transitions, scroll animations, hover effects | 30.7k GitHub stars, 3.6M weekly npm downloads. Declarative API (`<motion.div>`) integrates naturally with React components. Handles layout animations, gestures, scroll-linked animations, exit animations. The `motion` package is the official successor to `framer-motion` -- same API, broader framework support. Install `motion` not `framer-motion`. |

### Documentation / MDX Tooling

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| @next/mdx | Latest | MDX processing in Next.js | Official Next.js MDX integration. MDX files become pages in the App Router. Server Components support. Minimal overhead -- no extra build step. |
| rehype-pretty-code | Latest | Syntax highlighting in code blocks | Powered by Shiki (VS Code's syntax engine). Build-time highlighting -- zero client JS. Use any VS Code theme. Unstyled by default so it integrates with your GitHub-dark aesthetic. |
| Shiki | 1.x | Syntax highlighting engine | Powers rehype-pretty-code. Accurate VS Code-quality highlighting. Supports `github-dark` theme out of the box -- perfect match for your design. |
| gray-matter | Latest | Frontmatter parsing | Extract metadata (title, description, tier) from MDX files. Lightweight, stable, universally used. |
| remark-gfm | Latest | GitHub Flavored Markdown | Tables, strikethrough, autolinks, task lists in MDX. Expected by developers reading docs. |

### Image Handling

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| next-image-export-optimizer | Latest | Build-time image optimization for static export | Solves the critical problem: `next/image` default loader does not work with `output: 'export'`. Uses sharp to convert images to WebP at build time. Hashes images to avoid re-optimization on every build. Drop-in replacement for `next/image` with same API. |
| sharp | Latest | Image processing engine | Powers next-image-export-optimizer. Fast, native image processing. Converts Jensen Huang AI persona images to optimized WebP/AVIF at build time. |

### Infrastructure & Deployment

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Cloudflare Pages | N/A | Static hosting | Free tier is generous (500 builds/month, unlimited bandwidth). Global CDN edge network. Git-connected deployments. Framework preset for "Next.js (Static HTML Export)" handles config automatically. No server needed for static export. |
| pnpm | 9.x | Package manager | Faster installs, strict dependency resolution, disk-efficient. Used by Next.js core team. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint + eslint-config-next | Linting | Ships with Next.js. Catches common React/Next.js mistakes. |
| Prettier | Code formatting | Consistent formatting across the codebase. Use `prettier-plugin-tailwindcss` for class sorting. |
| prettier-plugin-tailwindcss | Tailwind class sorting | Automatic consistent ordering of Tailwind classes. Official Tailwind Labs plugin. |
| Turbopack | Dev server bundler | Default in Next.js 16. No configuration needed. Dramatically faster HMR than Webpack. |

## Theming: NVIDIA Green + GitHub Dark

This is a critical design decision. Here is the exact approach.

### CSS Variable Strategy (Tailwind v4)

Define your design tokens directly in CSS using `@theme`:

```css
/* globals.css */
@import "tailwindcss";

@theme {
  /* GitHub Dark palette */
  --color-bg-primary: #0d1117;
  --color-bg-secondary: #161b22;
  --color-bg-tertiary: #21262d;
  --color-border-default: #30363d;
  --color-border-muted: #21262d;
  --color-text-primary: #f0f6fc;
  --color-text-secondary: #8b949e;
  --color-text-muted: #484f58;

  /* NVIDIA Green accent */
  --color-accent: #76b900;
  --color-accent-hover: #8dd100;
  --color-accent-muted: #76b90033;
  --color-accent-subtle: #76b90015;

  /* Semantic tokens */
  --color-success: #3fb950;
  --color-warning: #d29922;
  --color-danger: #f85149;
  --color-info: #58a6ff;
}
```

### Why Not a Config File

Tailwind v4 eliminates `tailwind.config.js` for most use cases. The `@theme` directive in CSS is the canonical way to define design tokens. This means your color system lives in one CSS file, not split between config and CSS. Simpler, faster, fewer files.

### Dark Mode Implementation

Since the site is dark-only (GitHub dark theme), you do NOT need `next-themes` for toggling. However, install it anyway because:
1. shadcn/ui expects it
2. Future-proofs for a potential light mode
3. Set `forcedTheme="dark"` to lock to dark mode

```tsx
// app/layout.tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## Static Export Configuration

```js
// next.config.mjs
import createMDX from '@next/mdx'

const nextConfig = {
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './image-loader.ts',
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
```

### Static Export Limitations (Verified from Official Docs)

These features are NOT available with `output: 'export'`:

- Dynamic routes without `generateStaticParams()`
- Route Handlers that read from Request
- Cookies, Rewrites, Redirects, Headers
- Incremental Static Regeneration (ISR)
- Image Optimization (default loader) -- use next-image-export-optimizer instead
- Server Actions
- Draft Mode
- Intercepting Routes

**None of these matter for this project.** A marketing/docs site with static content has zero need for any of these features. The static export is the correct choice.

## Installation

```bash
# Initialize project
pnpm create next-app@latest mrhuang-website --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Core dependencies
pnpm add motion next-themes next-image-export-optimizer

# MDX tooling
pnpm add @next/mdx @mdx-js/loader @mdx-js/react
pnpm add remark-gfm rehype-pretty-code shiki gray-matter

# shadcn/ui (run after project init)
pnpm dlx shadcn@latest init

# Then add components as needed:
pnpm dlx shadcn@latest add button card tabs accordion badge

# Dev dependencies
pnpm add -D prettier prettier-plugin-tailwindcss @types/mdx
```

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Next.js 16 | Astro | Astro is excellent for content sites, but the project already decided on Next.js (matches MrHuang's frontend stack). Astro would mean learning a new framework for the team. |
| Framework | Next.js 16 | Docusaurus | Too opinionated for a marketing site. Great for pure docs, bad for custom landing pages with animations and persona cards. |
| Docs Framework | @next/mdx (raw) | Fumadocs | Fumadocs (v16.6.x) is powerful but overkill for this project. MrHuang needs ~5-10 docs pages, not a full documentation portal. Fumadocs adds complexity (sidebar config, search index, breadcrumbs) that this project would fight against. Use raw MDX + custom components for full creative control. |
| Docs Framework | @next/mdx (raw) | Nextra | Nextra 4.0 supports App Router but is more opinionated than raw MDX. For a site where the docs are a secondary feature behind the marketing landing page, Nextra's conventions add friction. |
| Content Layer | @next/mdx + gray-matter | Velite | Velite is the best Contentlayer replacement (Contentlayer is abandoned). But with ~5-10 docs pages, the overhead of a content SDK with Zod schemas is unnecessary. gray-matter for frontmatter + file-based MDX routing is sufficient. Consider Velite if docs grow beyond 30+ pages. |
| Content Layer | @next/mdx + gray-matter | Contentlayer | Abandoned. Maintainer allocates one day/month. Incompatible with latest Next.js. Do not use. |
| Animation | Motion | React Spring | Physics-based animations are powerful but harder to learn. Motion's declarative API (`animate`, `whileHover`, `whileInView`) is more intuitive for marketing site effects. React Spring has 788K weekly downloads vs Motion's 3.6M. |
| Animation | Motion | GSAP | GSAP is more powerful for complex timeline animations but has licensing concerns (GSAP's license changed). Motion covers 95% of what a marketing site needs with a simpler API. |
| Styling | Tailwind CSS v4 | CSS Modules | Tailwind is already decided in project constraints. CSS Modules are fine but slower to iterate on for marketing pages. |
| Component Library | shadcn/ui | Radix Themes | Radix Themes is pre-styled and opinionated. shadcn/ui gives you the source code to customize -- essential for the GitHub-dark + NVIDIA green aesthetic. |
| Component Library | shadcn/ui | Material UI (MUI) | Heavy runtime, opinionated design language that fights against GitHub-dark theming. Not Tailwind-native. |
| Icons | Lucide React | React Icons | React Icons bundles entire icon sets. Lucide is tree-shakable by default. shadcn/ui uses Lucide, so consistency matters. |
| Hosting | Cloudflare Pages (static) | Vercel | Vercel is excellent but Cloudflare Pages is free with unlimited bandwidth. For a static export there is no advantage to Vercel's server features. |
| Hosting | Cloudflare Pages (static) | OpenNext + Cloudflare Workers | OpenNext is Cloudflare's new recommendation for full Next.js, but it is for SSR/ISR workloads. A pure static export does not need Workers. Deploy to Pages directly. |
| Package Manager | pnpm | npm | pnpm is faster, stricter, and more disk-efficient. No reason to use npm for a new project. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `framer-motion` package | Deprecated name. Still works but is a compatibility shim pointing to `motion`. Will eventually stop receiving updates. | `motion` (same API, same team, new name) |
| Contentlayer | Abandoned project. Maintainer has reduced involvement. Breaks with newer Next.js versions. | `@next/mdx` + `gray-matter` for small sites, Velite for large sites |
| `next-on-pages` | Deprecated by Cloudflare. Replaced by OpenNext adapter. | Cloudflare Pages static deploy (for static export) or OpenNext (for SSR) |
| next/image default loader | Incompatible with `output: 'export'`. Build fails. | `next-image-export-optimizer` or manual `<img>` tags with pre-optimized images |
| CSS-in-JS (styled-components, Emotion) | Hydration mismatch risks with Server Components. Runtime overhead. Conflicts with Tailwind. | Tailwind CSS v4 |
| react-icons | Bundles entire icon families. Massive bundle bloat. | Lucide React (tree-shakable) |
| Tailwind CSS v3 | v4 is stable (released Jan 2025). v3 config patterns don't apply. `tailwind.config.js` is deprecated in favor of CSS-first `@theme`. | Tailwind CSS v4.2.x |
| `next export` command | Removed in Next.js 14. | `output: 'export'` in `next.config.mjs` |
| Webpack (for dev) | Turbopack is default and stable in Next.js 16. Webpack dev server is significantly slower. | Turbopack (automatic, no config needed) |

## Stack Patterns by Variant

**If docs grow beyond 30 pages:**
- Migrate from raw `@next/mdx` to Fumadocs or Velite
- Fumadocs provides built-in search, sidebar navigation, breadcrumbs
- Because manual file-based routing becomes unwieldy at scale

**If you want full-text docs search:**
- Add Fumadocs search or Algolia DocSearch (free for open source)
- Because static sites cannot do server-side search; need client-side index or hosted search

**If Cloudflare Pages static deploy has issues:**
- Fall back to Vercel (zero config for Next.js)
- Or use OpenNext adapter for Cloudflare Workers (more complex but supports SSR features)
- Because static export to Cloudflare Pages is well-documented and stable, but edge cases exist

**If animations need to be more complex (e.g., SVG morphing, 3D):**
- Add GSAP alongside Motion for specific sections
- Because Motion handles 95% of cases; GSAP fills the remaining 5% for timeline-heavy work

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| Next.js 16.x | React 19.x, Tailwind CSS 4.x | All current and stable |
| shadcn/ui (latest) | Next.js 16, Tailwind 4, React 19 | Uses unified `radix-ui` package since Feb 2026 |
| Motion 12.x | React 18+ / React 19 | Works with both React versions |
| @next/mdx | Next.js 14+ | Stable with App Router |
| rehype-pretty-code | Shiki 1.x | ESM-only. Config must be in `.mjs` file |
| next-image-export-optimizer | Next.js 14+ | Requires `output: 'export'` |
| next-themes 0.4.6 | Next.js 13+ App Router | Stable. Works with React 19 |
| Tailwind CSS 4.2.x | PostCSS (built-in) | No separate PostCSS config needed in v4 |

## AI-Generated Image Handling Notes

The Jensen Huang AI persona images (Mentor, Therapist, Life Coach) need special handling:

1. **Format:** Save source images as high-quality PNG or JPEG. `next-image-export-optimizer` will generate WebP variants at build time.
2. **Sizing:** Provide images at 2x the display size for Retina displays. The optimizer will generate responsive srcsets.
3. **Placeholder:** Use blurred placeholder data URLs (generated at build time) for perceived performance.
4. **Legal:** AI-generated images of real people (Jensen Huang) should include clear disclosure that images are AI-generated. Consider adding a small "AI Generated" badge overlay.
5. **Storage:** Keep originals in `/public/images/personas/` directory. The optimizer reads from `public/`.

## Sources

- [Next.js Static Exports Documentation](https://nextjs.org/docs/app/guides/static-exports) -- Official, verified 2026-02-27 (HIGH confidence)
- [Next.js Release Notes](https://releasebot.io/updates/vercel/next-js) -- Next.js 16.1.6 LTS confirmed (HIGH confidence)
- [Tailwind CSS v4.0 Announcement](https://tailwindcss.com/blog/tailwindcss-v4) -- Official blog (HIGH confidence)
- [Tailwind CSS npm](https://www.npmjs.com/package/tailwindcss) -- v4.2.1 confirmed (HIGH confidence)
- [shadcn/ui Changelog](https://ui.shadcn.com/docs/changelog) -- Unified Radix UI, Feb 2026 (HIGH confidence)
- [shadcn/ui Dark Mode with Next.js](https://ui.shadcn.com/docs/dark-mode/next) -- Official guide (HIGH confidence)
- [Motion npm](https://www.npmjs.com/package/motion) -- v12.34.3 confirmed (HIGH confidence)
- [Motion Upgrade Guide](https://motion.dev/docs/react-upgrade-guide) -- framer-motion to motion migration (HIGH confidence)
- [Cloudflare Pages Static Next.js](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/) -- Official Cloudflare docs (HIGH confidence)
- [ContentLayer Abandoned](https://github.com/contentlayerdev/contentlayer/issues/429) -- GitHub issue confirming status (HIGH confidence)
- [Velite Introduction](https://velite.js.org/guide/introduction) -- Official docs (MEDIUM confidence -- project marked "not yet complete")
- [Fumadocs npm](https://www.npmjs.com/package/fumadocs-ui) -- v16.6.7 confirmed (HIGH confidence)
- [next-image-export-optimizer](https://github.com/Niels-IO/next-image-export-optimizer) -- GitHub, actively maintained (MEDIUM confidence)
- [Rehype Pretty Code](https://rehype-pretty.pages.dev/) -- Official docs (MEDIUM confidence)
- [Lucide React npm](https://www.npmjs.com/package/lucide-react) -- v0.575.0, 29M+ weekly downloads (HIGH confidence)
- [next-themes npm](https://www.npmjs.com/package/next-themes) -- v0.4.6 confirmed (HIGH confidence)
- [LogRocket: React Animation Libraries 2026](https://blog.logrocket.com/best-react-animation-libraries/) -- Comparison article (MEDIUM confidence)
- [Syncfusion: Top React Animation Libraries 2026](https://www.syncfusion.com/blogs/post/top-react-animation-libraries) -- Comparison article (MEDIUM confidence)

---
*Stack research for: mrhuang.ai marketing + documentation website*
*Researched: 2026-03-01*
