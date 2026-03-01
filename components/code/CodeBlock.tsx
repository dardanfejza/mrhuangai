import { codeToHtml } from 'shiki'
import CopyButton from './CopyButton'

interface CodeBlockProps {
  code: string
  lang?: string
  filename?: string
}

export default async function CodeBlock({
  code,
  lang = 'bash',
  filename,
}: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), {
    lang,
    theme: 'github-dark',
  })

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border-default bg-canvas-subtle">
      {/* Optional filename header */}
      {filename && (
        <div className="flex items-center justify-between border-b border-border-default px-4 py-2">
          <span className="text-xs font-mono text-fg-muted">{filename}</span>
        </div>
      )}

      {/* Copy button — top right, visible on hover */}
      <div className="absolute right-2 top-2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
        <CopyButton code={code.trim()} />
      </div>

      {/* Highlighted code — override shiki's background with our canvas-subtle */}
      <div
        className="overflow-x-auto text-sm [&_pre]:!bg-transparent [&_pre]:p-4"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: shiki output is trusted build-time HTML
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
