import type { Repository } from "@/types"
import PageBootstrap from "@components/PageBootstrap"
import Input from "@components/UI/Input"
import LoadingState from "@components/UI/LoadingState"
import { CacheKeys, CacheTTL, LanguageColors, Urls } from "@constants"
import { A } from "@solidjs/router"
import { cleanDescription } from "@utils/plugin"
import { Book, BookMarked, Search, Star } from "lucide-solid"
import { createMemo, createResource, createSignal, For, Show } from "solid-js"

const fetchRepos = async (): Promise<Repository[]> => {
    try {
        const cached = localStorage.getItem(CacheKeys.REPOS)
        if (cached) {
            const { timestamp, data } = JSON.parse(cached)
            if (Date.now() - timestamp < CacheTTL.SIXHOURS) {
                return data
            }
        }
    } catch {}

    const res = await fetch(Urls.GITHUB_REPOS)
    let data: Repository[] = await res.json()

    data = data
        .filter((repo) => !repo.archived)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)

    try {
        localStorage.setItem(
            CacheKeys.REPOS,
            JSON.stringify({ timestamp: Date.now(), data }),
        )
    } catch {}

    return data
}

const LanguageTag = (props: { lang: string | null }) => {
    if (!props.lang)
        return (
            <span class="flex items-center gap-2 text-sm font-medium text-neutral-400">
                Unknown
            </span>
        )

    const color = LanguageColors[props.lang] || LanguageColors.default

    return (
        <span class="flex items-center gap-2 text-sm font-medium text-neutral-300">
            <span class={`w-2 h-2 rounded-full ${color}`} /> {props.lang}
        </span>
    )
}

export default function Projects() {
    const [repos, { refetch }] = createResource(fetchRepos)
    const [search, setSearch] = createSignal("")

    const filteredRepos = createMemo(() => {
        const repoList = repos()
        if (!repoList) return []

        const query = search().toLowerCase().trim()
        if (!query) return repoList

        return repoList.filter(
            (repo) =>
                repo.name.toLowerCase().includes(query) ||
                repo.description?.toLowerCase().includes(query) ||
                repo.language?.toLowerCase().includes(query),
        )
    })

    return (
        <PageBootstrap
            meta={{ title: "Projects" }}
            icon={<BookMarked />}
            fullWidth
            title="Projects"
            description={`${filteredRepos().length} active repositor${filteredRepos().length !== 1 ? "ies" : "y"}`}
        >
            <div class="flex flex-col gap-6">
                <Input
                    placeholder="Search projects..."
                    value={search()}
                    onInput={(e) => setSearch(e.currentTarget.value)}
                    icon={<Search size={18} />}
                    class="max-w-md"
                />

                <div class="flex items-center flex-wrap gap-6">
                    <LoadingState
                        loading={repos.loading}
                        error={repos.error}
                        loadingText="Loading repositories"
                        errorText="Failed to load repositories"
                        onRetry={() => refetch()}
                    >
                        <Show
                            when={filteredRepos().length > 0}
                            fallback={
                                <div class="flex flex-col items-center justify-center gap-1 py-12 text-neutral-200 w-full">
                                    <BookMarked
                                        size={48}
                                        class="text-neutral-500"
                                    />
                                    <p class="text-lg font-bold">
                                        No projects found
                                    </p>
                                    <p class="text-neutral-400 text-sm">
                                        Try a different search term
                                    </p>
                                </div>
                            }
                        >
                            <For each={filteredRepos()}>
                                {(repo) => (
                                    <A
                                        href={
                                            "https://github.com/" +
                                            repo.full_name
                                        }
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
                                                {cleanDescription(
                                                    repo.description,
                                                ) || "No description"}
                                            </p>
                                        </div>

                                        <LanguageTag lang={repo.language} />
                                    </A>
                                )}
                            </For>
                        </Show>
                    </LoadingState>
                </div>
            </div>
        </PageBootstrap>
    )
}
