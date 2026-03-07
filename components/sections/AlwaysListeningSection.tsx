import Image from 'next/image'
import { Mic, Cpu, Wifi, Zap, Volume2, Github } from 'lucide-react'
import { cn } from '@/lib/utils'

const bom = [
  { component: 'SoC',       part: 'ESP32-S3-MINI-1',       notes: 'Dual-core LX7 @ 240 MHz, WiFi, I2S, PCB antenna' },
  { component: 'Mic L',     part: 'INMP441',               notes: 'I2S MEMS, omnidirectional, 65 dB SNR' },
  { component: 'Mic R',     part: 'INMP441',               notes: 'Second mic for noise cancellation / beamforming' },
  { component: 'USB',       part: 'USB-C receptacle',      notes: 'Power only, 5 V' },
  { component: 'Regulator', part: 'AMS1117-3.3 / ME6211',  notes: '5 V → 3.3 V LDO' },
  { component: 'Passives',  part: 'Caps, resistors',       notes: 'Decoupling, pull-ups' },
]

const specs = [
  { icon: Cpu,     title: 'ESP32-S3',        desc: 'Dual-core 240 MHz with hardware SIMD. Runs Opus encoding in real time.' },
  { icon: Mic,     title: 'Dual INMP441',    desc: 'Two MEMS mics, spaced for beamforming. Picks you up across the room.' },
  { icon: Wifi,    title: 'WiFi / UDP',      desc: 'Opus-encoded audio streamed over WiFi. 16–32 kbps instead of 256 kbps raw.' },
  { icon: Zap,     title: 'USB-C Powered',   desc: 'Plug into any charger. No batteries, no maintenance, no excuses.' },
]

export default function AlwaysListeningSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header with peeking illustration */}
        <div className="relative mb-10">
          {/* Peeking MrHuang — positioned to the right, overlapping the header */}
          <div className="pointer-events-none absolute -right-4 -top-8 hidden w-36 sm:block lg:-right-8 lg:-top-12 lg:w-48">
            <Image
              src="/listening-peek.png"
              alt="MrHuang peeking around a corner"
              width={192}
              height={288}
              className="opacity-60 drop-shadow-lg"
            />
          </div>

          <div className="text-center">
            <p className="mb-3 inline-block rounded-full border border-nvidia/30 bg-nvidia/10 px-4 py-1 font-mono text-xs font-semibold tracking-widest text-nvidia">
              MRHUANG_IS_ALWAYS_LISTENING
            </p>
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-fg-default sm:text-4xl">
              Put it everywhere. He&apos;ll hear you.
            </h2>
            <p className="mx-auto max-w-2xl text-fg-muted">
              A tiny open-source USB mic you scatter around your home. Ask MrHuang anything,
              from any room — he&apos;ll respond the way you like it.{' '}
              <span className="text-fg-subtle">Smaller than a USB stick. Slightly more intrusive.</span>
            </p>
          </div>
        </div>

        {/* Architecture diagram */}
        <div className="mb-8 rounded-xl border border-border-default bg-canvas-subtle p-6">
          <p className="mb-4 text-xs font-medium text-fg-subtle">Signal path</p>
          <div className="flex flex-col items-start gap-0 sm:flex-row sm:items-center sm:justify-center">
            {/* Mics */}
            <div className="flex flex-col gap-1">
              <div className="min-w-[110px] rounded-lg border border-border-default bg-canvas-inset px-3 py-2 text-center">
                <p className="text-xs font-semibold text-fg-default">MEMS Mic L</p>
                <p className="text-xs text-fg-subtle">INMP441</p>
              </div>
              <div className="min-w-[110px] rounded-lg border border-border-default bg-canvas-inset px-3 py-2 text-center">
                <p className="text-xs font-semibold text-fg-default">MEMS Mic R</p>
                <p className="text-xs text-fg-subtle">INMP441</p>
              </div>
            </div>
            {/* Arrow: I2S */}
            <div className="flex items-center py-1 sm:px-2 sm:py-0">
              <span className="text-border-default sm:hidden">↓</span>
              <div className="hidden items-center sm:flex">
                <div className="h-px w-4 bg-border-default" />
                <div className="h-0 w-0 border-y-4 border-l-4 border-y-transparent border-l-border-default" />
              </div>
            </div>
            {/* ESP32 — highlighted */}
            <div className="min-w-[110px] rounded-lg border border-nvidia/50 bg-canvas-default px-3 py-2 text-center ring-1 ring-nvidia/30">
              <p className="text-xs font-semibold text-fg-default">ESP32-S3</p>
              <p className="text-xs text-fg-subtle">Opus encode</p>
            </div>
            {/* Arrow: WiFi/UDP */}
            <div className="flex items-center py-1 sm:px-2 sm:py-0">
              <span className="text-border-default sm:hidden">↓</span>
              <div className="hidden items-center sm:flex">
                <div className="h-px w-4 bg-border-default" />
                <div className="h-0 w-0 border-y-4 border-l-4 border-y-transparent border-l-border-default" />
              </div>
            </div>
            {/* mrhuang.ai */}
            <div className="min-w-[110px] rounded-lg border border-nvidia/50 bg-canvas-default px-3 py-2 text-center ring-1 ring-nvidia/30">
              <p className="text-xs font-semibold text-fg-default">Home Server</p>
              <p className="text-xs text-fg-subtle">mrhuang.ai</p>
            </div>
            {/* Arrow */}
            <div className="flex items-center py-1 sm:px-2 sm:py-0">
              <span className="text-border-default sm:hidden">↓</span>
              <div className="hidden items-center sm:flex">
                <div className="h-px w-4 bg-border-default" />
                <div className="h-0 w-0 border-y-4 border-l-4 border-y-transparent border-l-border-default" />
              </div>
            </div>
            {/* Speaker / Response */}
            <div className="min-w-[110px] rounded-lg border border-border-muted bg-canvas-inset px-3 py-2 text-center opacity-70">
              <p className="text-xs font-semibold text-fg-default">Speaker</p>
              <p className="text-xs text-fg-subtle">TTS response</p>
            </div>
          </div>

          {/* Labels below diagram */}
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-fg-subtle">
            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full border border-nvidia/50 ring-1 ring-nvidia/30" />
              Your hardware
            </span>
            <span>~30 mm × 14 mm — smaller than a USB stick</span>
          </div>
        </div>

        {/* Spec cards */}
        <div className={cn('mb-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4')}>
          {specs.map(({ icon: Icon, title, desc }) => (
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

        {/* BOM table */}
        <div className="mb-8 overflow-x-auto rounded-xl border border-border-default bg-canvas-subtle">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-default">
                <th className="px-4 py-3 font-semibold text-fg-default">Component</th>
                <th className="px-4 py-3 font-semibold text-fg-default">Part</th>
                <th className="px-4 py-3 font-semibold text-fg-default">Notes</th>
              </tr>
            </thead>
            <tbody>
              {bom.map(({ component, part, notes }) => (
                <tr key={component} className="border-b border-border-muted last:border-0">
                  <td className="px-4 py-2.5 font-medium text-fg-default">{component}</td>
                  <td className="px-4 py-2.5 font-mono text-nvidia">{part}</td>
                  <td className="px-4 py-2.5 text-fg-muted">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PCB layout ASCII art */}
        <div className="mb-8 rounded-xl border border-border-default bg-canvas-inset p-5 font-mono text-xs leading-relaxed text-fg-subtle">
          <p className="mb-2 text-fg-muted">PCB layout (30 mm × 14 mm)</p>
          <pre className="overflow-x-auto">
{`USB-C side                             Front
┌────────────────────────────────────────┐
│  [USB-C]   [ESP32-S3]          [MIC1] │
│               [LDO]            [MIC2] │
└────────────────────────────────────────┘
             ← power    beamforming →`}
          </pre>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="mb-4 text-sm text-fg-muted">
            Open-source hardware. Order the PCB, solder six components, flash the firmware.
            MrHuang does the rest.
          </p>
          <a
            href="https://github.com/dardanfejza/mrhuang"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-nvidia px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
          >
            <Github className="h-4 w-4" />
            Build your own on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
