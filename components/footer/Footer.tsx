import { Github } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border-default bg-canvas-default">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* GitHub repo link */}
          <a
            href="https://github.com/dardanfejza/mrhuang"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg-default"
          >
            <Github className="h-4 w-4" />
            <span>dardanfejza/mrhuang</span>
          </a>

          {/* License badge */}
          <a
            href="https://github.com/dardanfejza/mrhuang/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-border-default px-2.5 py-0.5 text-xs font-medium text-fg-muted transition-colors hover:border-nvidia hover:text-nvidia"
          >
            MIT License
          </a>

          {/* Copyright + NVIDIA disclaimer */}
          <p className="text-center text-xs text-fg-subtle sm:text-right">
            &copy; {currentYear} MrHuang &mdash;{' '}
            <span className="block sm:inline">
              AI-generated content. Not affiliated with NVIDIA or Jensen Huang.
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
