// app/page.tsx — async Server Component (no "use client")
// Phase 2: Real landing page replacing Phase 1 placeholder stub
import HeroSection from '@/components/sections/HeroSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import SecuritySection from '@/components/sections/SecuritySection'
import ComingSoonSection from '@/components/sections/ComingSoonSection'
import ParallaxMascot from '@/components/ParallaxMascot'
import { getStarCount } from '@/lib/github'

export default async function HomePage() {
  const stars = await getStarCount() // build-time fetch, falls back to 0

  return (
    <div>
      <ParallaxMascot />
      <div className="relative z-10">
        <HeroSection stars={stars} />
        <FeaturesSection />
        <SecuritySection />
        <ComingSoonSection />
      </div>
    </div>
  )
}
