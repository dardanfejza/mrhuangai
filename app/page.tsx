import { getStarCount } from '@/lib/github'
import HeroSection from '@/components/sections/HeroSection'

export default async function HomePage() {
  const stars = await getStarCount()

  return <HeroSection stars={stars} />
}
