import CodeBlock from '@/components/code/CodeBlock'

const installCommand = `# Clone and run MrHuang
git clone https://github.com/dardanfejza/mrhuang
cd mrhuang
cp .env.example .env
docker compose up -d`

export default async function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Placeholder heading */}
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-nvidia">
          Phase 1 — Foundation
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-fg-default sm:text-5xl">
          Design System <span className="text-nvidia">Active</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-fg-muted">
          Sticky nav, dark theme, NVIDIA green, responsive layout, and code blocks — all wired up.
          Phase 2 builds the real landing page here.
        </p>
      </div>

      {/* Color palette demo */}
      <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'canvas-default', color: 'bg-canvas-default border border-border-default' },
          { label: 'canvas-subtle', color: 'bg-canvas-subtle' },
          { label: 'nvidia', color: 'bg-nvidia' },
          { label: 'border-default', color: 'border-2 border-border-default' },
        ].map(({ label, color }) => (
          <div key={label} className={`rounded-lg p-4 ${color}`}>
            <p className="text-xs font-mono text-fg-muted">{label}</p>
          </div>
        ))}
      </div>

      {/* Code block demo — exercises INST-03 */}
      <div className="mb-6">
        <h2 className="mb-4 text-lg font-semibold text-fg-default">
          Code Block Demo (INST-03)
        </h2>
        <CodeBlock
          code={installCommand}
          lang="bash"
          filename="Quick Install"
        />
      </div>

      {/* Responsive test indicator */}
      <p className="text-center text-xs text-fg-subtle">
        <span className="sm:hidden">Mobile (&lt;640px)</span>
        <span className="hidden sm:inline md:hidden">Tablet (sm)</span>
        <span className="hidden md:inline lg:hidden">Tablet (md)</span>
        <span className="hidden lg:inline xl:hidden">Desktop (lg)</span>
        <span className="hidden xl:inline">Wide (xl+)</span>
        {' '}breakpoint active — FOUND-02 responsive check
      </p>
    </div>
  )
}
