import { ShieldCheck, Lock, Shield, FolderLock, CheckSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

const flowNodes = [
  { label: 'Browser',           sublabel: 'You',             highlight: false, outbound: false },
  { label: 'Cloudflare Tunnel', sublabel: 'Zero Trust',      highlight: false, outbound: false },
  { label: 'Home Server',       sublabel: 'Your hardware',   highlight: true,  outbound: false },
  { label: 'Claude API',        sublabel: 'Only outbound ↑', highlight: false, outbound: true  },
]

const securityItems = [
  {
    icon: ShieldCheck,
    title: 'Zero Trust',
    desc: 'Cloudflare Tunnel — no open ports, no exposed IP, no VPN required.',
  },
  {
    icon: Lock,
    title: 'PIN Protection',
    desc: 'JWT tokens with timing-safe compare. Brute force is not invited.',
  },
  {
    icon: Shield,
    title: 'HMAC Webhook Verification',
    desc: 'Every WhatsApp webhook verified with HMAC-SHA256. Spoofed messages get dropped.',
  },
  {
    icon: FolderLock,
    title: 'Path Traversal Protection',
    desc: 'File access is sandboxed. ../../../etc/passwd goes nowhere.',
  },
  {
    icon: CheckSquare,
    title: 'Zod Schema Validation',
    desc: 'Every API input validated at runtime. Garbage in, error out.',
  },
]

export default function SecuritySection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading + anchor message */}
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-fg-default sm:text-4xl">
            Security that doesn&apos;t rely on trusting us
          </h2>
          <p className="mb-4 text-xl font-semibold text-fg-default">
            Your data never leaves your hardware.
          </p>
          <p className="mx-auto max-w-2xl text-fg-muted">
            The only outbound call MrHuang makes is to Claude API. Everything else stays between
            you and your server.
          </p>
        </div>

        {/* CSS data flow diagram — four nodes */}
        <div className="mb-12 rounded-xl border border-border-default bg-canvas-subtle p-6">
          <div className="flex flex-col items-center gap-0 sm:flex-row sm:flex-wrap sm:justify-center">
            {flowNodes.map((node, i) => (
              <div key={node.label} className="flex flex-col items-center sm:flex-row">
                {/* Node box */}
                <div
                  className={cn(
                    'min-w-[120px] rounded-lg border px-4 py-3 text-center',
                    node.highlight
                      ? 'border-nvidia/50 bg-canvas-subtle ring-1 ring-nvidia/30'
                      : node.outbound
                      ? 'border-border-muted bg-canvas-inset opacity-70'
                      : 'border-border-default bg-canvas-inset'
                  )}
                >
                  <p className="text-sm font-semibold text-fg-default">{node.label}</p>
                  <p className="text-xs text-fg-subtle">{node.sublabel}</p>
                </div>

                {/* Arrow connector — hidden after last node */}
                {i < flowNodes.length - 1 && (
                  <div className="flex items-center py-2 sm:px-2 sm:py-0">
                    {/* Vertical arrow on mobile, horizontal on sm+ */}
                    <span className="text-lg text-border-default sm:hidden">↓</span>
                    <div className="hidden items-center sm:flex">
                      <div className="h-px w-6 bg-border-default" />
                      <div className="h-0 w-0 border-y-4 border-l-4 border-y-transparent border-l-border-default" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Five security callout cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {securityItems.map(({ icon: Icon, title, desc }) => (
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
