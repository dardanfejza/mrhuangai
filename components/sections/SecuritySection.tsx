import { ShieldCheck, Lock, Shield, FolderLock, CheckSquare, KeyRound, Fingerprint, ShieldBan } from 'lucide-react'
import { cn } from '@/lib/utils'

const routes = [
  {
    label: 'WhatsApp',
    nodes: [
      { label: 'WhatsApp',           sublabel: 'Meta webhook',    highlight: false, outbound: false },
      { label: 'Cloudflare Tunnel',  sublabel: 'Zero Trust',      highlight: false, outbound: false },
      { label: 'Home Server',        sublabel: 'Your hardware',   highlight: true,  outbound: false },
      { label: 'Claude API',         sublabel: 'Only outbound ↑', highlight: false, outbound: true  },
    ],
  },
  {
    label: 'Direct',
    nodes: [
      { label: 'You',                sublabel: 'Browser / app',   highlight: false, outbound: false },
      { label: 'Tailscale',          sublabel: 'Private VPN',     highlight: false, outbound: false },
      { label: 'Home Server',        sublabel: 'Your hardware',   highlight: true,  outbound: false },
      { label: 'Claude API',         sublabel: 'Only outbound ↑', highlight: false, outbound: true  },
    ],
  },
]

const securityItems = [
  {
    icon: ShieldCheck,
    title: 'Cloudflare Tunnel (WhatsApp)',
    desc: 'WhatsApp webhooks route through Cloudflare Tunnel — no open ports, no exposed IP.',
  },
  {
    icon: Lock,
    title: 'Tailscale (Direct access)',
    desc: 'Everything else goes over Tailscale — a private encrypted mesh VPN. Only your devices.',
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
  {
    icon: KeyRound,
    title: 'Mutual TLS (mTLS)',
    desc: 'Client certificates required over Tailscale. No cert, no access — not even on the same network.',
  },
  {
    icon: Fingerprint,
    title: 'PIN + HMAC Token Auth',
    desc: 'HMAC-SHA256 signed session tokens with 24h TTL. Rate-limited PIN entry with brute force lockout.',
  },
  {
    icon: ShieldBan,
    title: 'AI Tool Sandboxing',
    desc: 'Claude\u2019s tools are restricted — no shell, no web access, file ops sandboxed to data directory only.',
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

        {/* CSS data flow diagram — two routes */}
        <div className="mb-12 space-y-3 rounded-xl border border-border-default bg-canvas-subtle p-6">
          {routes.map((route, ri) => (
            <div key={route.label}>
              {ri > 0 && <div className="my-3 border-t border-border-default" />}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                {/* Route label */}
                <span className="w-20 shrink-0 text-xs font-medium text-fg-subtle">
                  {route.label}
                </span>
                {/* Nodes */}
                <div className="flex flex-col items-start gap-0 sm:flex-row sm:items-center">
                  {route.nodes.map((node, i) => (
                    <div key={node.label} className="flex flex-col items-center sm:flex-row">
                      <div
                        className={cn(
                          'min-w-[110px] rounded-lg border px-3 py-2 text-center',
                          node.highlight
                            ? 'border-nvidia/50 bg-canvas-default ring-1 ring-nvidia/30'
                            : node.outbound
                            ? 'border-border-muted bg-canvas-inset opacity-70'
                            : 'border-border-default bg-canvas-inset'
                        )}
                      >
                        <p className="text-xs font-semibold text-fg-default">{node.label}</p>
                        <p className="text-xs text-fg-subtle">{node.sublabel}</p>
                      </div>
                      {i < route.nodes.length - 1 && (
                        <div className="flex items-center py-1 sm:px-2 sm:py-0">
                          <span className="text-border-default sm:hidden">↓</span>
                          <div className="hidden items-center sm:flex">
                            <div className="h-px w-4 bg-border-default" />
                            <div className="h-0 w-0 border-y-4 border-l-4 border-y-transparent border-l-border-default" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
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
