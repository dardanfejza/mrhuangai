import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import './globals.css'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'MrHuang — Self-Hosted AI Companion',
  description:
    'Open-source, self-hosted AI companion with multiple personas. Your data stays on your hardware.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="flex min-h-dvh flex-col bg-canvas-default font-sans antialiased">
        {/* Alpha banner */}
        <div className="w-full bg-nvidia/10 border-b border-nvidia/20 py-2 text-center text-xs text-nvidia">
          🚧 Alpha — not yet released. Coming soon.
        </div>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
