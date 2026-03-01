'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface CopyButtonProps {
  code: string
}

export default function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API not available (e.g., non-HTTPS) — fail silently
    }
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Copied!' : 'Copy code'}
      className="rounded p-1.5 text-fg-subtle transition-colors hover:bg-canvas-default hover:text-fg-muted"
    >
      {copied ? (
        <Check className="h-4 w-4 text-nvidia" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  )
}
