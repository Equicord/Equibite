export const CacheKeys = {
    ICONS: "cachedIcons",
    REPOS: "cachedRepos",
    COMMITS: "cachedCommits",
} as const;

export const CacheTTL = {
    HALFHOUR: 1000 * 60 * 30,
    HOUR: 1000 * 60 * 60,
    SIXHOURS: 1000 * 60 * 60 * 6,
} as const;
