import { Star } from 'lucide-react'
import { getStarCount } from '@/lib/github'

export default async function GitHubStars() {
  const stars = await getStarCount()

  return (
    <a
      href="https://github.com/dardanfejza/mrhuang"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 rounded-md border border-border-default px-3 py-1.5 text-sm text-fg-muted transition-colors hover:border-nvidia hover:text-fg-default"
      aria-label="Star MrHuang on GitHub"
    >
      <Star className="h-4 w-4" />
      <span>
        {stars > 0 ? (
          <>
            <span className="text-nvidia font-medium">{stars.toLocaleString()}</span>
            {' '}stars
          </>
        ) : (
          'Star on GitHub'
        )}
      </span>
    </a>
  )
}
