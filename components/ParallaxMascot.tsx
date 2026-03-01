'use client'

import { useEffect, useRef } from 'react'

export default function ParallaxMascot() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? scrolled / maxScroll : 0
      if (ref.current) {
        ref.current.style.backgroundPositionY = `${progress * 100}%`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage: 'url(/mascot.png)',
        backgroundSize: 'auto 300%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 0%',
        opacity: 0.25,
        filter: 'invert(1)',
      }}
    />
  )
}
