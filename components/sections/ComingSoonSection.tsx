import { Monitor, Smartphone, Github } from 'lucide-react'

const platforms = [
  { icon: Monitor,    label: 'Mac',     desc: 'Native menu bar app. Always there when you need it.' },
  { icon: Smartphone, label: 'iOS',     desc: 'iPhone and iPad. MrHuang in your pocket.' },
  { icon: Smartphone, label: 'Android', desc: 'Android native. Because choice matters.' },
]

export default function ComingSoonSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading + sub-copy */}
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-fg-default sm:text-4xl">
          What&apos;s next. Allegedly.
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-fg-muted">
          Native apps for the platforms you actually use. Mac, iOS, Android — because the browser
          isn&apos;t always where you need your AI companion.
        </p>

        {/* Three platform teasers */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {platforms.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-xl border border-border-default bg-canvas-subtle p-6 text-center w-full sm:w-48"
            >
              <Icon className="mb-2 h-6 w-6 text-nvidia" />
              <p className="text-sm font-semibold text-fg-default">{label}</p>
              <p className="mt-1 text-xs text-fg-muted">{desc}</p>
            </div>
          ))}
        </div>

        {/* GitHub watch CTA */}
        <a
          href="https://github.com/dardanfejza/mrhuang"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-lg border border-border-default bg-canvas-subtle px-5 py-3 text-sm font-medium text-fg-default transition-colors hover:border-nvidia/50 hover:text-nvidia"
        >
          <Github className="h-4 w-4" />
          Watch on GitHub for updates
        </a>
      </div>
    </section>
  )
}
