export async function getStarCount(): Promise<number> {
  try {
    const res = await fetch('https://api.github.com/repos/dardanfejza/mrhuang', {
      next: { revalidate: false }, // Static: fetch once at build time
      headers: {
        Accept: 'application/vnd.github+json',
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
    })
    if (!res.ok) return 0
    const data = (await res.json()) as { stargazers_count?: number }
    return data.stargazers_count ?? 0
  } catch {
    return 0 // Graceful degradation if API is unreachable at build time
  }
}
