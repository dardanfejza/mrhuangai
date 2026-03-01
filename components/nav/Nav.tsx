import { Suspense } from 'react'
import GitHubStars from './GitHubStars'

const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'Install', href: '/install/' },
  { label: 'Cost', href: '/#cost' },
  { label: 'GitHub', href: 'https://github.com/dardanfejza/mrhuang' },
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-default bg-canvas-default/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / site name */}
        <a
          href="/"
          className="text-sm font-semibold text-fg-default tracking-tight hover:text-nvidia transition-colors"
        >
          MrHuang<span className="text-nvidia">.ai</span>
        </a>

        {/* Nav links — hidden on mobile, visible sm+ */}
        <nav className="hidden items-center gap-6 sm:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-fg-muted transition-colors hover:text-fg-default"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* GitHub star CTA — always visible */}
        <Suspense
          fallback={
            <div className="h-8 w-28 animate-pulse rounded-md bg-canvas-subtle" />
          }
        >
          <GitHubStars />
        </Suspense>
      </div>
    </header>
  )
}
