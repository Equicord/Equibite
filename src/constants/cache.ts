export const CacheKeys = {
    ICONS: "cachedIcons",
    REPOS: "cachedRepos",
    COMMITS: "cachedCommits",
} as const

export const CacheTTL = {
    SHORT: 1000 * 60 * 30, // 30 minutes
    LONG: 1000 * 60 * 60 * 6, // 6 hours
} as const
