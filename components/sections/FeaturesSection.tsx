import {
  Brain, BookOpen, Mic, MessageCircle, BookHeart, LayoutDashboard,
  Shield, Users, TrendingUp, BellRing, FolderKanban, Archive,
  MessageSquare, Palette, Radio,
} from 'lucide-react'
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
    desc: 'Deepgram Nova-3 transcription — speak, it listens. Works in the browser and over WhatsApp voice notes.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Integration',
    desc: 'Text, voice notes, check-ins — MrHuang lives in the app you already have open.',
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
  {
    icon: Users,
    title: 'Meeting Assistant',
    desc: 'Real-time transcript de-fragmentation, auto-generated minutes, participant tracking. Three-panel UI.',
  },
  {
    icon: TrendingUp,
    title: 'Pattern Recognition',
    desc: 'Weekly behavioral scans — stalled goals, recurring themes, values misalignment. MrHuang sees the patterns you don\u2019t.',
  },
  {
    icon: BellRing,
    title: 'Proactive Check-ins',
    desc: 'Disappear for 14 days and MrHuang texts you on WhatsApp. Not clingy — just concerned.',
  },
  {
    icon: FolderKanban,
    title: 'Project Tracking',
    desc: 'Registry-driven project dashboard. MrHuang updates status and blockers directly from chat.',
  },
  {
    icon: Archive,
    title: 'Conversation Memory',
    desc: 'Auto-archives significant conversations with summaries, key points, and goal references. Thread titles generated on the fly.',
  },
  {
    icon: Palette,
    title: 'Kindle Themes',
    desc: 'Four TUI variants — White, Sepia, Green, Black. Because staring at a terminal should feel like reading.',
  },
  {
    icon: Radio,
    title: 'Real-time Streaming',
    desc: 'Server-Sent Events, not polling. Responses stream in as they\u2019re generated — instant, not batched.',
  },
  {
    icon: MessageSquare,
    title: 'Thread Summaries',
    desc: 'SQLite-backed thread metadata with auto-generated titles and hover tooltips. Find old conversations without scrolling.',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-fg-default sm:text-4xl">
            Everything MrHuang actually does
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

        {/* Feature cards in 2-col / 3-col grid */}
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
