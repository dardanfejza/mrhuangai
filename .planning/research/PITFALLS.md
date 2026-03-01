# Pitfalls Research

**Domain:** Next.js open-source marketing and documentation website (dark-themed, static export)
**Researched:** 2026-03-01
**Confidence:** HIGH (verified against official Next.js docs, WCAG specs, computed contrast ratios)

## Critical Pitfalls

### Pitfall 1: White/Light Text on NVIDIA Green Backgrounds Fails Accessibility

**What goes wrong:**
NVIDIA green (#76b900) used as a background color for buttons, badges, or CTAs with white or light text (#e6edf3) produces a contrast ratio of only 2.04:1 -- far below WCAG AA's 4.5:1 requirement for normal text and even below the 3:1 requirement for large text. This means primary CTA buttons like "Star on GitHub" or "Get Started" would be inaccessible to users with low vision, and the site would fail automated accessibility audits.

**Why it happens:**
NVIDIA green is a medium-luminance color (relative luminance 0.39). It works brilliantly as foreground text on dark backgrounds (7.85:1 on #0d1117) but becomes a problematic background color. Developers assume that if green-on-dark is readable, white-on-green must also be readable. It is not.

**How to avoid:**
- Use dark text (#0d1117 or #1a1a1a) on NVIDIA green backgrounds. Dark-on-green yields 7.85:1 contrast -- WCAG AAA compliant.
- For green buttons: `bg-brand text-gray-950` not `bg-brand text-white`.
- Never use NVIDIA green as a background for light text anywhere on the site.
- Establish a color usage rule in the design system: green is a foreground/accent color on dark surfaces, or a background color only with dark text.

**Warning signs:**
- Any `bg-[#76b900] text-white` or equivalent in the codebase.
- Lighthouse accessibility audit flags on button elements.
- axe-core contrast violations on CTA components.

**Phase to address:**
Phase 1 (Foundation/Design System) -- this must be codified before any UI components are built.

---

### Pitfall 2: Next.js Static Export Breaks Default Image Optimization

**What goes wrong:**
Next.js `output: 'export'` disables the default image optimization loader entirely. The `next/image` component requires a server to optimize images on-demand. With static export, using `<Image>` without configuration produces a build error. The common "fix" of setting `images: { unoptimized: true }` ships full-size, unoptimized images to all devices, destroying Core Web Vitals LCP scores -- particularly devastating for a hero-heavy landing page with large AI-generated Jensen Huang images.

**Why it happens:**
Next.js image optimization is designed as a runtime server feature, not a build-time feature. Static export has no server. Developers either hit the build error and set `unoptimized: true` as a band-aid, or skip `next/image` entirely and use raw `<img>` tags, losing all responsive image benefits.

**How to avoid:**
- Use `next-image-export-optimizer` (npm package) which runs image optimization as a post-build step, generating multiple sizes and formats (WebP/AVIF) at build time.
- Alternatively, define a custom image loader pointing to a CDN service (Cloudinary, Imgix) if a third-party service is acceptable.
- Pre-optimize Jensen Huang persona images at multiple breakpoints (640w, 1024w, 1920w) with WebP format before adding to the repo.
- Set `priority` on hero/above-fold images and `loading="lazy"` on below-fold images.
- Use `fetchpriority="high"` on the hero LCP element.

**Warning signs:**
- `images: { unoptimized: true }` in next.config.js without a compensating optimization strategy.
- Hero images larger than 200KB served to mobile.
- LCP score above 2.5 seconds in Lighthouse.
- Missing `width` and `height` attributes on images (causes layout shift / CLS issues).

**Phase to address:**
Phase 1 (Foundation) -- image strategy must be decided before building the hero section.

---

### Pitfall 3: Static Export Client-Side Routing Returns 404 on Page Refresh

**What goes wrong:**
Next.js static export generates individual HTML files (e.g., `/install/index.html`, `/features/index.html`). When deployed to static hosts like Cloudflare Pages or GitHub Pages, direct URL access or page refresh on a route like `/install` returns a 404 because the server looks for `/install` as a directory or file, not `/install.html` or `/install/index.html`. Client-side navigation works fine because the JavaScript router handles it, but any direct link, bookmark, or refresh breaks.

**Why it happens:**
Static file servers do not know about Next.js's routing conventions. Without server-side rewrite rules, the host cannot map clean URLs to the actual generated HTML files. This is especially problematic with dynamic routes (e.g., install guide tiers) where `generateStaticParams` must be used.

**How to avoid:**
- Set `trailingSlash: true` in `next.config.js` -- this generates `/install/index.html` instead of `/install.html`, which most static hosts resolve correctly.
- For Cloudflare Pages: add a `_redirects` file or configure `_headers` to handle fallback routing.
- For Vercel: this is handled automatically (but the project should work on any static host per requirements).
- Test deployment with direct URL access to every route, not just client-side navigation.
- Use `generateStaticParams()` for any dynamic segments (e.g., install guide tiers).

**Warning signs:**
- 404 errors when refreshing any page other than the homepage.
- Working in `next dev` but broken in production.
- Links shared on social media or Discord leading to 404s.

**Phase to address:**
Phase 1 (Foundation) -- `trailingSlash` and deployment configuration must be set before any routes are created.

---

### Pitfall 4: AI-Generated Celebrity Likeness Legal Exposure

**What goes wrong:**
Using AI-generated images of Jensen Huang (NVIDIA CEO) as the visual mascot across the site creates right-of-publicity legal risk. In the U.S., the right of publicity protects a person's ability to control commercial use of their name, image, and likeness. Even AI-generated images that depict a recognizable real person can trigger right-of-publicity claims. An open-source project with a public website makes this usage highly visible.

**Why it happens:**
The project's concept intentionally uses Jensen Huang as a satirical/humorous mascot. The irreverent tone ("MrHuang") makes it feel like fair use or parody, but commercial-adjacent use on a marketing website is legally ambiguous. The images are AI-generated (not copyrightable by the creator) but still depict a recognizable public figure.

**How to avoid:**
- Accept the risk knowingly -- many open-source projects use celebrity references satirically and rely on the low likelihood of enforcement from a CEO whose brand benefits from community engagement.
- Include a clear disclaimer that the site is not affiliated with NVIDIA or Jensen Huang, and that images are AI-generated.
- Design the site so the Jensen Huang imagery is modular and swappable -- if a C&D arrives, the images and name references can be replaced without rebuilding the entire site.
- Avoid any implication of endorsement.
- Do NOT use official NVIDIA photos or trademarks (the NVIDIA logo, wordmark, etc.).

**Warning signs:**
- DMCA takedown notices or C&D letters.
- Using the actual NVIDIA logo rather than just the color scheme.
- Language that implies official endorsement or partnership.

**Phase to address:**
Phase 2 (Content/Assets) -- disclaimer text and modular image architecture should be established when content is created.

---

### Pitfall 5: Hydration Mismatches in Interactive Calculator Component

**What goes wrong:**
The cost calculator (interactive monthly cost breakdown for Anthropic API, hosting, optional services) involves client-side state (sliders, inputs, computed values). If the calculator renders different initial HTML on the server vs. the client -- for instance, showing "$0.00" server-side but computing a default value client-side -- React throws a hydration mismatch error. In static export mode, the HTML is generated at build time, so any dynamic default (like current date, locale-specific number formatting, or browser-dependent rendering) causes mismatches.

**Why it happens:**
Static export pre-renders components at build time. The calculator is inherently interactive and stateful. If any part of the initial render depends on client-only APIs (localStorage for saved preferences, `Intl.NumberFormat` locale differences, `window.matchMedia` for responsive defaults), the server-rendered HTML will not match the client hydration.

**How to avoid:**
- Mark the calculator as a Client Component with `'use client'` directive.
- Use `dynamic(() => import('./Calculator'), { ssr: false })` to skip server-side rendering entirely for the calculator -- it will show a loading skeleton until JS hydrates.
- Never use browser APIs (`window`, `localStorage`, `navigator`) in the initial render of any component. Gate them behind `useEffect`.
- Use consistent initial state that does not depend on the client environment.
- Provide a static placeholder/skeleton that matches what the server renders.

**Warning signs:**
- Console errors: "Text content did not match" or "Hydration failed because the initial UI does not match."
- Calculator showing a flash of different content on page load.
- Numbers formatting differently between build output and browser display.

**Phase to address:**
Phase 3 (Interactive Features) -- when the calculator is built, hydration strategy must be decided upfront.

---

### Pitfall 6: Tailwind CSS v4 Configuration Migration Confusion

**What goes wrong:**
Tailwind CSS v4 fundamentally changed how configuration works. The JavaScript-based `tailwind.config.js` is replaced with CSS-first `@theme` directives in your stylesheet. Custom brand colors (#76b900 green, dark background colors) defined in the old `tailwind.config.js` format will not work. Additionally, v4 defaults to OKLCH color space, and the entire default color palette changed. Projects started with v3 tutorials/boilerplate will have broken configurations.

**Why it happens:**
Most Next.js + Tailwind tutorials, starter templates, and Stack Overflow answers still reference v3 configuration patterns. The migration is non-trivial: `@tailwind base; @tailwind components; @tailwind utilities;` is replaced by `@import "tailwindcss";`, and all theme customization moves to CSS `@theme` blocks. Developers copy v3 patterns and get silent failures or missing utilities.

**How to avoid:**
- Start fresh with Tailwind v4 from day one. Do NOT copy any `tailwind.config.js` from v3 projects.
- Define the brand color system using `@theme` in your global CSS file:
  ```css
  @import "tailwindcss";
  @theme {
    --color-brand: #76b900;
    --color-surface: #0d1117;
    --color-surface-raised: #161b22;
    --color-border: #30363d;
  }
  ```
- Use `@tailwindcss/postcss` instead of the old `tailwindcss` PostCSS plugin.
- Reference only Tailwind v4 documentation (tailwindcss.com, not v3.tailwindcss.com).

**Warning signs:**
- `tailwind.config.js` or `tailwind.config.ts` present in the project root (may indicate v3 patterns being used).
- `@tailwind base; @tailwind components; @tailwind utilities;` in CSS files (v3 syntax).
- Custom color utilities like `bg-brand` not generating any CSS.
- Import errors related to PostCSS plugin resolution.

**Phase to address:**
Phase 1 (Foundation) -- Tailwind v4 with correct CSS-first config must be the starting point.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| `images: { unoptimized: true }` | Fixes build error immediately | Ships 2-5MB hero images to mobile, destroys LCP, kills SEO | Never for production. Only for initial dev while setting up image pipeline |
| Hardcoding install guide content in JSX | Fast to build | Impossible to maintain 3 tiers of instructions, duplicated markup, merge conflicts | MVP only, must extract to MDX/data files before adding more content |
| Skipping `generateStaticParams` for tier routes | Avoids understanding static export model | 404s on direct links, broken SEO, broken social sharing | Never |
| Inline styles instead of Tailwind design tokens | Quick one-off fixes | Inconsistent colors, impossible to theme, accessibility regressions | Never for colors/spacing. Acceptable for truly one-off animation values |
| Suppressing hydration warnings (`suppressHydrationWarning`) | Silences console errors | Hides real bugs, SSR/client mismatch visible to users as content flash | Only for timestamps or truly ephemeral content, never for layout |

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Cloudflare Pages deployment | Assuming clean URLs work automatically with static export | Set `trailingSlash: true` and add `_redirects` file for fallback. Test direct URL access to every route |
| GitHub API (star count, contributors) | Fetching at runtime from client, hitting rate limits for unauthenticated requests (60/hour per IP) | Fetch at build time in a Server Component. Display a static count that updates on each deploy. Or use a cached client-side fetch with SWR and long `revalidate` |
| Open Graph / social previews | Assuming `opengraph-image.tsx` (dynamic OG generation via `next/og`) works with static export | It does work -- OG images are generated at build time for static export. But verify the generated images exist in the `out` directory after build. Use static OG image files as fallback |
| Google Analytics / Plausible | Loading analytics script synchronously, blocking render | Use `next/script` with `strategy="afterInteractive"` or `strategy="lazyOnload"`. For privacy-respecting open source: prefer Plausible over GA |
| External fonts (Inter, JetBrains Mono) | Using Google Fonts `<link>` tag, causing render-blocking request and layout shift | Use `next/font/google` which self-hosts fonts and eliminates external requests. Works with static export |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Unoptimized AI persona images (3 large PNGs) | LCP > 4 seconds on mobile, page feels sluggish | Convert to WebP/AVIF at multiple breakpoints, use `next/image` with custom loader or `next-image-export-optimizer` | Immediately on any mobile device or slow connection |
| Animating hero section with JS instead of CSS | Janky animations, high CPU usage, poor INP | Use CSS transforms and opacity animations. Use `will-change` sparingly. Avoid JS-driven scroll animations for core layout | On lower-end devices, noticeable from day one |
| Loading all 3 install guide tiers on a single page | Large DOM, slow initial render, poor time-to-interactive | Use tabbed interface that lazy-loads tier content, or separate routes per tier with `generateStaticParams` | When install guides grow beyond ~500 lines total |
| Not preloading hero LCP image | LCP delayed because browser discovers image late (in CSS or lazy-loaded JS) | Use `<link rel="preload" as="image">` or `priority` prop on `next/image`. Hero image must be in the initial HTML, not injected by JS | Immediately -- every first visit is affected |
| CSS background-image for hero | Cannot use responsive images, browser cannot optimize, hurts LCP | Use `<Image>` or `<img>` with `object-fit: cover` and absolute positioning instead of CSS `background-image` | From day one on all devices |

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Embedding API keys or secrets in client-side calculator code | Keys exposed in browser DevTools, abused by anyone | This is a static marketing site with no backend. The calculator should use local computation only -- no API calls. If fetching pricing data, do it at build time |
| Linking directly to raw GitHub files for install scripts | Users may `curl \| bash` a URL that could be modified by a malicious PR before merge | Link to tagged releases, not `main` branch. Consider hosting install scripts as verified static assets |
| Not setting Content Security Policy headers | XSS risk if any user-generated content is ever introduced | Add CSP headers via `_headers` file on Cloudflare Pages or via `next.config.js` headers (note: `headers` config does not work with static export -- must use host-level config) |
| Serving site over HTTP | Man-in-the-middle attacks, "Not Secure" browser warning destroys trust for a security-focused product | Cloudflare Pages enforces HTTPS by default. Verify the deployment host does too. Add `Strict-Transport-Security` header |

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Install guide assumes user knows their tier | Users pick wrong tier, get stuck or frustrated | Add a quick "Which tier am I?" quiz (3 questions) at the top: "Have you used a terminal before?" / "Do you know what npm is?" / "Can you configure PATH variables?" Route to appropriate tier |
| Dark theme with no option to switch | Users with photosensitivity, users in bright environments, users who simply prefer light mode cannot use the site comfortably | For v1, dark-only is acceptable for brand identity. But ensure the site is printable (add `@media print` styles with light background). Consider light mode in v2 |
| Wall of text in documentation sections | Users bounce, cannot find specific information | Use collapsible sections, code blocks with copy buttons, step numbers, and visual progress indicators in install guides |
| Humor/irreverent tone alienates some users | "Super smart. Also kinda retarded." -- some users will close the tab immediately | Keep the edgy humor in clearly opt-in areas (About page, easter eggs). The install guide and core documentation should be professional and clear. Separate "personality" from "utility" |
| Calculator lacks context for costs | Users see "$47/month" but don't know if that's good or bad | Add comparisons: "That's less than a Netflix subscription" or "ChatGPT Plus costs $20/month with less capability." Anchor the cost against familiar alternatives |
| No "copy to clipboard" on code blocks | Users must manually select and copy terminal commands -- error-prone and frustrating | Add copy buttons to every code block. This is table stakes for developer documentation in 2026 |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Hero section:** Often missing responsive images -- verify hero looks correct on 360px mobile, 768px tablet, and 1920px desktop. Check that LCP image loads in under 2.5 seconds on 3G throttle
- [ ] **Install guide:** Often missing "what if this step fails?" troubleshooting -- verify each step has error handling guidance and a "this didn't work" expandable section
- [ ] **Cost calculator:** Often missing edge cases -- verify $0 inputs, maximum values, negative numbers are handled. Verify the math is actually correct against current Anthropic API pricing
- [ ] **SEO metadata:** Often missing per-page Open Graph images and descriptions -- verify every route has unique `<title>`, `<meta description>`, and OG tags. Check with Facebook Sharing Debugger and Twitter Card Validator
- [ ] **Accessibility:** Often missing keyboard navigation -- verify all interactive elements (tabs, calculator sliders, mobile menu) are keyboard-accessible. Verify focus states are visible on the dark background
- [ ] **Static export:** Often missing 404 page -- verify `not-found.tsx` generates a styled 404 page in the `out` directory, not a blank or default host 404
- [ ] **Mobile navigation:** Often missing a working hamburger menu -- verify nav works on mobile, has proper focus trapping, and can be dismissed with Escape key
- [ ] **Code blocks:** Often missing syntax highlighting and copy functionality -- verify code blocks in install guide have proper syntax highlighting, horizontal scroll for long lines, and a working copy button
- [ ] **Link to GitHub:** Often missing or buried -- the primary CTA ("Star on GitHub") should be in the hero, navbar, and footer. Verify the link goes to the correct repo URL

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| White text on green buttons (accessibility failure) | LOW | Global search-replace `text-white` with `text-gray-950` on green backgrounds. Single PR, ~1 hour |
| Unoptimized images shipped to production | MEDIUM | Add `next-image-export-optimizer`, re-export existing images at multiple sizes, update all `<Image>` components to use optimized loader. 1-2 days |
| 404 on page refresh (missing trailing slash config) | LOW | Add `trailingSlash: true` to next.config.js, redeploy. May need to add redirects for any already-indexed URLs without trailing slashes. 1-2 hours |
| Hydration mismatches in calculator | MEDIUM | Wrap calculator in `dynamic(() => import(...), { ssr: false })`, add loading skeleton. 2-4 hours plus testing |
| Tailwind v3 config used instead of v4 | HIGH | Full migration of config file to CSS @theme, audit all utility classes for deprecated/renamed utilities, update PostCSS config. 1-2 days depending on project size |
| Legal C&D for Jensen Huang imagery | MEDIUM | If images are modular (component prop-based), swap images and update copy. If hardcoded throughout, painful find-and-replace across all pages. 1 day if modular, 1 week if not |
| Install guide has wrong commands for a platform | LOW | Fix the command, redeploy. But damage is done if users already followed broken steps. Add "last verified" dates to each guide section |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Green-on-white accessibility failure | Phase 1: Design System | Run axe-core on every component. Automated contrast checks in CI. No `text-white` or `text-gray-100` on `bg-brand` anywhere |
| Image optimization with static export | Phase 1: Foundation | LCP < 2.5s on Lighthouse mobile audit. `images: { unoptimized: true }` must NOT be in final config |
| 404 on refresh / static hosting | Phase 1: Foundation | Deploy to target host (Cloudflare Pages). Test direct URL access to every route. Test page refresh on every route |
| Celebrity likeness legal risk | Phase 2: Content & Assets | Disclaimer present on site. Jensen Huang images passed as props (swappable). No NVIDIA trademarks used |
| Hydration mismatch in calculator | Phase 3: Interactive Features | Zero hydration warnings in browser console. Calculator renders identically on server and client (or skips SSR entirely) |
| Tailwind v4 configuration | Phase 1: Foundation | No `tailwind.config.js` in project. `@theme` block in CSS with brand tokens. All brand utilities (`bg-brand`, `text-brand`) resolve correctly |
| SEO metadata completeness | Phase 2: Content & Assets | Every route has unique title, description, OG image. Validated with og-image debugger tools |
| Install guide UX | Phase 3: Interactive Features | User testing with one person from each tier. Each tier completable without external help |
| Mobile responsiveness | Phase 2: Content & Assets | Visual regression tests at 360px, 768px, 1024px, 1920px breakpoints |
| Keyboard accessibility | Phase 2: Content & Assets | Tab through entire site without mouse. All interactive elements reachable and operable |

## Sources

- [Next.js Static Exports Guide (official, updated 2026-02-27)](https://nextjs.org/docs/app/guides/static-exports) -- HIGH confidence
- [Next.js Image Optimization docs](https://nextjs.org/docs/app/api-reference/components/image) -- HIGH confidence
- [next-image-export-optimizer (GitHub)](https://github.com/Niels-IO/next-image-export-optimizer) -- MEDIUM confidence
- [Vercel Blog: Common Next.js App Router Mistakes](https://vercel.com/blog/common-mistakes-with-the-next-js-app-router-and-how-to-fix-them) -- HIGH confidence
- [App Router Pitfalls (imidef.com, 2026-02-11)](https://imidef.com/en/2026-02-11-app-router-pitfalls) -- MEDIUM confidence
- [Next.js Hydration Error docs](https://nextjs.org/docs/messages/react-hydration-error) -- HIGH confidence
- [WCAG 2.1 Contrast Requirements (W3C)](https://www.w3.org/WAI/GL/WCAG3/2022/how-tos/visual-contrast-of-text/) -- HIGH confidence
- [Accessibility Checker: Dark Mode Accessibility Guide](https://www.accessibilitychecker.org/blog/dark-mode-accessibility/) -- MEDIUM confidence
- [BOIA: Dark Mode and WCAG Contrast](https://www.boia.org/blog/offering-a-dark-mode-doesnt-satisfy-wcag-color-contrast-requirements) -- MEDIUM confidence
- [Tailwind CSS v4.0 Release Notes](https://tailwindcss.com/blog/tailwindcss-v4) -- HIGH confidence
- [Tailwind CSS v4 Migration Discussion (GitHub)](https://github.com/tailwindlabs/tailwindcss/discussions/16517) -- MEDIUM confidence
- [Cloudflare Pages Next.js Static Site Guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/) -- HIGH confidence
- [MDN: Fix LCP by Optimizing Image Loading](https://developer.mozilla.org/en-US/blog/fix-image-lcp/) -- HIGH confidence
- [AI Marketing and Copyright Legal Risks](https://www.techcxo.com/ai-marketing-copyright-legal-risks/) -- MEDIUM confidence
- [Right of Publicity and AI Likeness](https://www.identity.org/protecting-public-figures-and-artists-likeness-in-the-age-of-ai/) -- MEDIUM confidence
- WCAG contrast ratios computed directly using the W3C relative luminance formula -- HIGH confidence (mathematical verification)

---
*Pitfalls research for: Next.js open-source marketing/docs site (dark theme, static export, AI imagery)*
*Researched: 2026-03-01*
