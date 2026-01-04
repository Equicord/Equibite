import type { Commit } from "@/types"
import Button from "@components/UI/Button"
import { CacheKeys, CacheTTL, Urls } from "@constants"
import { A } from "@solidjs/router"
import { formatTimeAgo, truncateText } from "@utils/formatting"
import { Check, Github, Merge, TrafficCone } from "lucide-solid"
import { createResource, For, Show } from "solid-js"

async function fetchCommits(): Promise<Commit[]> {
    try {
        const cached = localStorage.getItem(CacheKeys.COMMITS)
        if (cached) {
            const { timestamp, data } = JSON.parse(cached)
            if (Date.now() - timestamp < CacheTTL.HALFHOUR) {
                return data
            }
        }
    } catch {}

    const res = await fetch(`${Urls.GITHUB_COMMITS}?per_page=4`)
    if (!res.ok) return []

    const data: Commit[] = await res.json()

    try {
        localStorage.setItem(
            CacheKeys.COMMITS,
            JSON.stringify({ timestamp: Date.now(), data }),
        )
    } catch {}

    return data
}

function isMergeCommit(message: string): boolean {
    return message.toLowerCase().startsWith("merge")
}

function Commits() {
    const [commits] = createResource(fetchCommits)

    return (
        <div class="flex h-64 border-l border-neutral-800 pl-4 sm:pl-8">
            <div class="flex flex-col rounded-xl border border-neutral-800 bg-neutral-900 mask-b-from-80% md:w-72">
                <Show
                    when={commits() && commits()!.length > 0}
                    fallback={
                        <div class="flex items-center justify-center h-full">
                            <div class="h-6 w-6 animate-spin rounded-full border-b-2 border-sky-500" />
                        </div>
                    }
                >
                    <For each={commits()}>
                        {(commit) => (
                            <div class="flex flex-col gap-1 border-b border-neutral-800 py-3 pr-6 pl-4">
                                <span class="font-semibold">
                                    {truncateText(commit.commit.message)}
                                </span>

                                <p class="flex items-center gap-2 text-sm font-medium text-neutral-400">
                                    Committed{" "}
                                    {formatTimeAgo(commit.commit.author.date)}
                                    {isMergeCommit(commit.commit.message) ? (
                                        <Merge
                                            class="text-purple-500"
                                            size={16}
                                        />
                                    ) : (
                                        <Check
                                            class="text-green-500"
                                            size={16}
                                        />
                                    )}
                                </p>
                            </div>
                        )}
                    </For>
                </Show>
            </div>
        </div>
    )
}

export default function FeatureMaintained() {
    return (
        <div class="flex justify-between gap-6 max-md:flex-col md:flex-row-reverse">
            <div class="flex w-full flex-col gap-6 rounded-xl bg-neutral-900 px-8 py-12 md:w-2/3 md:justify-between">
                <div class="flex flex-col gap-2">
                    <span class="flex items-center gap-2 text-xl font-semibold">
                        <TrafficCone fill="#ffffff10" size={24} />
                        Actively Maintained
                    </span>

                    <p class="font-medium text-neutral-400">
                        Active maintenance ensures every plugin remains safe and
                        compatible with any Discord changes.
                    </p>
                </div>

                <A
                    href="https://github.com/Equicord/Equicord"
                    target="_blank"
                    class="w-fit"
                >
                    <Button variant="secondary" icon={<Github size={16} />}>
                        View repository
                    </Button>
                </A>
            </div>

            <div class="flex w-full items-center justify-center py-6 max-md:px-8 max-sm:gap-3">
                <Commits />
            </div>
        </div>
    )
}
