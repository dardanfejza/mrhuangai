import Image from 'next/image'
import { Star, Github } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeroSectionProps {
  stars?: number
}

const personas = [
  {
    role: 'Mentor',
    initials: 'M',
    tagline: 'Tells you what you need to hear, not what you want.',
  },
  {
    role: 'Therapist',
    initials: 'T',
    image: '/persona-therapist.png',
    tagline: 'Listens. Also judges. Mostly listens.',
  },
  {
    role: 'Life Coach',
    initials: 'LC',
    tagline: "Calls you out when you're being a coward.",
  },
]

export default function HeroSection({ stars }: HeroSectionProps) {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Headline + sub-copy */}
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-fg-default sm:text-6xl">
            Meet MrHuang
          </h1>
          <p className="mx-auto mb-2 max-w-2xl text-xl text-fg-muted">
            Your self-hosted AI companion. Super smart. Also kinda dumb. Remarkably useful.
          </p>
          <p className="text-sm text-fg-subtle">
            Yes, this site was also written with MrHuang.
          </p>
        </div>

        {/* CTA buttons row */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/dardanfejza/mrhuang"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-nvidia px-6 py-3 text-sm font-semibold text-gray-950 transition-opacity hover:opacity-90"
          >
            <Star className="h-4 w-4" />
            Star on GitHub
            {stars && stars > 0 ? (
              <span className="ml-1 opacity-80">({stars.toLocaleString()})</span>
            ) : null}
          </a>
          <a
            href="https://github.com/dardanfejza/mrhuang"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-2 rounded-lg border border-border-default px-6 py-3',
              'text-sm font-semibold text-fg-default transition-colors hover:border-fg-muted hover:text-fg-default'
            )}
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </a>
        </div>

        {/* Open Source badge */}
        <div className="mb-10 flex justify-center">
          <a
            href="https://github.com/dardanfejza/mrhuang"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-nvidia/40 px-3 py-1 text-xs font-medium text-nvidia transition-colors hover:border-nvidia/70"
          >
            <Github className="h-3 w-3" />
            100% Open Source
          </a>
        </div>

        {/* Persona cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {personas.map((persona) => (
            <div
              key={persona.role}
              className="relative flex min-h-96 flex-col overflow-hidden rounded-xl border border-border-default bg-canvas-subtle"
            >
              {'image' in persona && persona.image ? (
                <>
                  {/* Full-bleed image */}
                  <Image
                    src={persona.image}
                    alt={persona.role}
                    fill
                    className="object-cover object-top"
                  />
                  {/* Edge + bottom gradient: fades image into card bg */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: [
                        'linear-gradient(to bottom, rgba(22,27,34,0) 35%, rgba(22,27,34,0.98) 72%)',
                        'linear-gradient(to right, rgba(22,27,34,0.75) 0%, rgba(22,27,34,0) 18%)',
                        'linear-gradient(to left, rgba(22,27,34,0.75) 0%, rgba(22,27,34,0) 18%)',
                        'linear-gradient(to bottom, rgba(22,27,34,0.55) 0%, rgba(22,27,34,0) 14%)',
                      ].join(', '),
                    }}
                  />
                  {/* Text overlay at bottom */}
                  <div className="relative z-10 mt-auto p-6">
                    <p className="text-xs font-medium uppercase tracking-widest text-nvidia">
                      {persona.role}
                    </p>
                    <p className="mt-1 text-sm text-fg-muted">{persona.tagline}</p>
                    <p className="mt-4 text-xs text-fg-subtle">
                      AI-generated, not affiliated with NVIDIA or Jensen Huang
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* Initials placeholder */}
                  <div className="flex flex-1 items-center justify-center py-16">
                    <span className="text-5xl font-bold text-nvidia">{persona.initials}</span>
                  </div>
                  <div className="p-6 pt-0">
                    <p className="text-xs font-medium uppercase tracking-widest text-nvidia">
                      {persona.role}
                    </p>
                    <p className="mt-1 text-sm text-fg-muted">{persona.tagline}</p>
                    <p className="mt-6 text-xs text-fg-subtle">
                      AI-generated, not affiliated with NVIDIA or Jensen Huang
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
