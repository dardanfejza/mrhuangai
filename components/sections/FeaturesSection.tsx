import { Brain, BookOpen, Mic, MessageCircle, BookHeart, LayoutDashboard, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: Brain,
    title: 'AI Personas',
    desc: 'Mentor, Therapist, Life Coach — each with its own voice and no filter.',
  },
  {
    icon: BookOpen,
    title: 'Knowledge Base',
    desc: 'Persistent memory that actually remembers. Unlike you.',
  },
  {
    icon: Mic,
    title: 'Voice Input',
    desc: 'Deepgram transcription — speak, it listens. Mostly correctly.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Integration',
    desc: 'Chat with MrHuang on the app you already have open anyway.',
  },
  {
    icon: BookHeart,
    title: 'Daily Journal',
    desc: 'Track your thoughts. MrHuang will have opinions about them.',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard',
    desc: 'Habit tracking. It notices when you stop showing up.',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-fg-default sm:text-4xl">
            Six ways MrHuang makes itself useful
          </h2>
          <p className="text-fg-muted">Not always perfectly. But consistently.</p>
        </div>

        {/* "Your data stays on your hardware" callout banner */}
        <div className="mb-8 flex items-center gap-3 rounded-lg border border-border-default bg-canvas-subtle px-5 py-4">
          <Shield className="h-5 w-5 shrink-0 text-nvidia" />
          <p className="text-sm font-medium text-fg-default">
            Your data stays on your hardware.{' '}
            <span className="text-fg-muted">No cloud sync. No data mining. Just yours.</span>
          </p>
        </div>

        {/* Six feature cards in 2-col / 3-col grid */}
        <div className={cn('grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3')}>
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl border border-border-default bg-canvas-subtle p-5"
            >
              <Icon className="mb-3 h-5 w-5 text-nvidia" />
              <h3 className="text-sm font-semibold text-fg-default">{title}</h3>
              <p className="mt-1 text-xs text-fg-muted">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
