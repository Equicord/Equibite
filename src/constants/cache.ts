export const CacheKeys = {
    ICONS: "cachedIcons",
    REPOS: "cachedRepos",
    COMMITS: "cachedCommits",
    EQUIBOP: "cachedEquibop",
    TEAM: "cachedTeam",
} as const

export const CacheTTL = {
    HALFHOUR: 1000 * 60 * 30, // 30 minutes
    HOUR: 1000 * 60 * 60, // 1 hour
    SIXHOURS: 1000 * 60 * 60 * 6, // 6 hours
} as const
