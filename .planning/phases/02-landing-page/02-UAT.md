---
status: testing
phase: 02-landing-page
source: [02-01-SUMMARY.md, 02-02-SUMMARY.md, 02-03-SUMMARY.md]
started: 2026-03-02T00:00:00Z
updated: 2026-03-02T00:00:00Z
---

## Current Test
<!-- OVERWRITE each test - shows where we are -->

number: 1
name: Hero Headline and Copy
expected: |
  The landing page root (/) shows a large headline with self-aware humorous copy — something like "Super smart. Also kinda dumb. Remarkably useful." The visual tone is bold, dark-themed, and immediately communicates MrHuang's personality.
awaiting: user response

## Tests

### 1. Hero Headline and Copy
expected: The landing page root (/) shows a large headline with self-aware humorous copy — something like "Super smart. Also kinda dumb. Remarkably useful." The visual tone is bold, dark-themed, and immediately communicates MrHuang's personality.
result: [pending]

### 2. Persona Cards
expected: Three cards appear below the headline — Mentor, Therapist, Life Coach. Each shows initials on a dark background (placeholder for future AI images), a humorous tagline, and a small disclaimer inside the card mentioning it's AI-generated and not affiliated with NVIDIA.
result: [pending]

### 3. Star on GitHub CTA
expected: An NVIDIA green button labeled "Star on GitHub" (or similar) appears prominently. It uses dark text (not white). If GitHub is reachable at build time, it shows a star count number. Clicking it navigates to the GitHub repo.
result: [pending]

### 4. Open Source Badge and GitHub Link
expected: A "100% Open Source" badge is visible near the CTA. There is also a secondary ghost-style "View on GitHub" link alongside or below the main CTA button.
result: [pending]

### 5. Features Section — Six Feature Cards
expected: Scrolling down reveals a Features section with six cards in a responsive grid (2 columns on mobile, 3 on desktop): AI Personas, Knowledge Base, Voice Input, WhatsApp Integration, Daily Journal, Dashboard. Each card has an icon, title, and short description.
result: [pending]

### 6. Features Section — Data Privacy Banner
expected: Above or within the features grid, a banner/callout is visible — something like "Your data stays on your hardware" with a shield icon. It visually stands out from the regular feature cards.
result: [pending]

### 7. Security Section — Data Flow Diagram
expected: A Security section shows a CSS-drawn data flow diagram: Browser → Cloudflare Tunnel → Home Server → Claude API. On desktop these appear horizontally; on mobile they stack vertically. The Home Server node is highlighted with a green ring/border to indicate the local data boundary.
result: [pending]

### 8. Security Section — Callout Cards
expected: Below or alongside the diagram, five security callout cards are visible explaining key security properties (e.g., data never leaves hardware, end-to-end encryption, etc.).
result: [pending]

### 9. Coming Soon Section — Platform Teasers
expected: A "Coming Soon" section shows three platform teaser cards: Mac, iOS, Android — each with a Lucide icon and brief description. There is a single CTA link to "Watch on GitHub" (no email form, no subscription input).
result: [pending]

### 10. Full Page Scroll — All Sections Present
expected: Starting from the top, scrolling through the full page reveals all four sections in order: Hero → Features → Security → Coming Soon. The page uses the dark GitHub theme throughout with NVIDIA green accents. Nav and Footer from Phase 1 are still intact above/below.
result: [pending]

## Summary

total: 10
passed: 0
issues: 0
pending: 10
skipped: 0

## Gaps

[none yet]
