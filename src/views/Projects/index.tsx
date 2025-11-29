import { A } from "@solidjs/router"
import { cleanDescription } from "@utils/plugin"
import { createResource, For } from "solid-js"

import PageBootstrap from "@components/PageBootstrap"

import LoadingState from "@components/UI/LoadingState"
import { Book, BookMarked, Star } from "lucide-solid"

type Language = "Rust" | "TypeScript" | "Java" | "JavaScript" | "Go" | string

interface Repository {
    name: string
    full_name: string
    description: string
    archived: boolean
    stargazers_count: number
    language: Language
}

const CACHE_KEY = "cachedRepos"
const CACHE_TTL = 1000 * 60 * 60 * 6 // 6 hours

const fetchRepos = async (): Promise<Repository[]> => {
    try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
            const { timestamp, data } = JSON.parse(cached)
            if (Date.now() - timestamp < CACHE_TTL) {
                return data
            }
        }
    } catch {}

    const res = await fetch("https://api.github.com/orgs/equicord/repos")
    let data: Repository[] = await res.json()

    data = data
        .filter((repo) => !repo.archived)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)

    try {
        localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), data }),
        )
    } catch {}

    return data
}

const languageColors: Record<string, string> = {
    Rust: "bg-orange-300",
    TypeScript: "bg-blue-500",
    Java: "bg-amber-600",
    JavaScript: "bg-amber-300",
    Go: "bg-sky-400",
    default: "bg-neutral-500",
}

const LanguageTag = (props: { lang?: string }) => {
    if (!props.lang)
        return (
            <span class="flex items-center gap-2 text-sm font-medium text-neutral-400">
                Unknown
            </span>
        )

    const color = languageColors[props.lang] || languageColors.default

    return (
        <span class="flex items-center gap-2 text-sm font-medium text-neutral-300">
            <span class={`w-2 h-2 rounded-full ${color}`} /> {props.lang}
        </span>
    )
}

export default function Projects() {
    const [repos, { refetch }] = createResource(fetchRepos)

    return (
        <PageBootstrap
            meta={{ title: "Projects" }}
            icon={<BookMarked />}
            fullWidth
            title="Projects"
            description="List of Equicord's active repositories."
        >
            <div class="flex items-center flex-wrap gap-6">
                <LoadingState
                    loading={repos.loading}
                    error={repos.error}
                    loadingText="Loading repositories"
                    errorText="Failed to load repositories"
                    onRetry={() => refetch()}
                >
                    <For each={repos()}>
                        {(repo) => (
                            <A
                                href={"https://github.com/" + repo.full_name}
                                target="_blank"
                                class="flex-1 min-w-full sm:min-w-96 flex flex-col justify-between gap-6 h-52 py-6 px-6 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 transition-transform active:scale-[.98]"
                            >
                                <div class="flex flex-col gap-3">
                                    <div class="flex justify-between items-center">
                                        <div class="flex items-center gap-3">
                                            <div class="items-center justify-center bg-gradient-to-t from-neutral-900 to-neutral-800/90 outline-2 outline-offset-2 outline-neutral-600/50 flex size-10 rounded-lg border border-neutral-800">
                                                <Book size={16} />
                                            </div>

                                            <div class="inline-block leading-tight">
                                                <span class="text-xs text-neutral-400 font-medium">
                                                    {repo.full_name}
                                                </span>
                                                <h2 class="text-xl font-semibold">
                                                    {repo.name}
                                                </h2>
                                            </div>
                                        </div>

                                        <span class="inline-flex items-center text-neutral-300 font-medium gap-1">
                                            <Star size={16} />
                                            {repo.stargazers_count}
                                        </span>
                                    </div>

                                    <p class="text-sm font-medium text-neutral-300">
                                        {cleanDescription(repo.description) ||
                                            "No description"}
                                    </p>
                                </div>

                                <LanguageTag lang={repo.language} />
                            </A>
                        )}
                    </For>
                </LoadingState>
            </div>
        </PageBootstrap>
    )
}
