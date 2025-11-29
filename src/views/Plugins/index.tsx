import PageBootstrap from "@components/PageBootstrap"
import Input from "@components/UI/Input"
import LoadingState from "@components/UI/LoadingState"
import {
    DESKTOP_PLATFORMS,
    INITIAL_VISIBLE_COUNT,
    LOAD_MORE_COUNT,
    LOAD_MORE_THRESHOLD,
} from "@constants"
import { useSearchParams } from "@solidjs/router"
import { fetchPlugins } from "@utils/plugin"
import { getStored, setStored } from "@utils/storage"
import { Puzzle, Search, SearchX } from "lucide-solid"
import {
    createEffect,
    createMemo,
    createResource,
    createSignal,
    For,
    onCleanup,
    onMount,
    Show,
} from "solid-js"
import PluginCard from "./components/PluginCard"
import PluginPopover from "./components/PluginPopover"

type PluginFilter = "all" | "equicord" | "vencord" | "modified"
type PlatformFilter = "all" | "desktop" | "web"

export default function Plugins() {
    const [plugins, { refetch }] = createResource(() => fetchPlugins("all"))
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = createSignal(searchParams.search || "")

    const [compactMode, setCompactMode] = createSignal(
        getStored<boolean>("compactMode", true),
    )
    const [pluginFilter, setPluginFilter] = createSignal<PluginFilter>(
        (searchParams.source as PluginFilter) || "all",
    )
    const [platformFilter, setPlatformFilter] = createSignal<PlatformFilter>(
        (searchParams.platform as PlatformFilter) || "all",
    )
    const [filterHasCommands, setFilterHasCommands] = createSignal(
        searchParams.commands === "true",
    )

    const [visibleCount, setVisibleCount] = createSignal(INITIAL_VISIBLE_COUNT)

    createEffect(() => {
        setStored("compactMode", compactMode())
        setSearchParams({
            search: search() || undefined,
            source: pluginFilter() !== "all" ? pluginFilter() : undefined,
            platform: platformFilter() !== "all" ? platformFilter() : undefined,
            commands: filterHasCommands() ? "true" : undefined,
        })
    })

    const updateSearch = (value: string) => {
        setSearch(value)
        setVisibleCount(INITIAL_VISIBLE_COUNT)
    }

    const filteredPlugins = createMemo(() => {
        const pluginList = plugins()
        if (!pluginList) return []

        let result = [...pluginList]

        const searchQuery = search()
        const query = (
            Array.isArray(searchQuery)
                ? (searchQuery[0] ?? "")
                : (searchQuery ?? "")
        )
            .toLowerCase()
            .trim()

        if (query) {
            result = result.filter((plugin) => {
                const nameMatch = plugin.name.toLowerCase().includes(query)
                const authorMatch = plugin.authors.some((author) =>
                    author.name.toLowerCase().includes(query),
                )

                return nameMatch || authorMatch
            })
        }

        // Plugin source filter
        if (pluginFilter() === "equicord") {
            result = result.filter((plugin) =>
                plugin.filePath.toLowerCase().startsWith("src/equicordplugins"),
            )
        } else if (pluginFilter() === "vencord") {
            result = result.filter((plugin) =>
                plugin.filePath.toLowerCase().startsWith("src/plugins"),
            )
        }

        // Platform filter
        if (platformFilter() === "desktop") {
            result = result.filter((plugin) =>
                DESKTOP_PLATFORMS.includes(plugin.target ?? ""),
            )
        } else if (platformFilter() === "web") {
            result = result.filter((plugin) => plugin.target === "web")
        }

        // Commands filter
        if (filterHasCommands()) {
            result = result.filter((plugin) => plugin.hasCommands)
        }

        return result.sort((a, b) => a.name.localeCompare(b.name))
    })

    const visiblePlugins = createMemo(() =>
        filteredPlugins().slice(0, visibleCount()),
    )

    const hasMorePlugins = createMemo(
        () => visibleCount() < filteredPlugins().length,
    )

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null

    const handleScroll = () => {
        if (scrollTimeout) return

        scrollTimeout = setTimeout(() => {
            scrollTimeout = null

            const { innerHeight, scrollY } = window
            const { offsetHeight } = document.body

            if (
                innerHeight + scrollY >= offsetHeight - LOAD_MORE_THRESHOLD &&
                hasMorePlugins()
            ) {
                setVisibleCount((count) => count + LOAD_MORE_COUNT)
            }
        }, 100)
    }

    onMount(() => {
        window.addEventListener("scroll", handleScroll, { passive: true })
    })

    onCleanup(() => {
        window.removeEventListener("scroll", handleScroll)
        if (scrollTimeout) clearTimeout(scrollTimeout)
    })

    return (
        <PageBootstrap
            meta={{ title: "Plugins" }}
            fullWidth
            icon={<Puzzle />}
            title="Plugins"
            description={`${filteredPlugins().length} plugin${filteredPlugins().length !== 1 ? "s" : ""} found`}
        >
            {/* Search & Filters */}
            <div class="flex items-center gap-3">
                <Input
                    placeholder="Search plugins..."
                    value={search()}
                    onInput={(e) => updateSearch(e.currentTarget.value)}
                    icon={<Search size={18} />}
                    class="flex-1 py-1.5"
                />
                <PluginPopover
                    pluginFilter={pluginFilter}
                    setPluginFilter={setPluginFilter}
                    platformFilter={platformFilter}
                    setPlatformFilter={setPlatformFilter}
                    filterHasCommands={filterHasCommands}
                    setFilterHasCommands={setFilterHasCommands}
                    compactMode={compactMode}
                    setCompactMode={setCompactMode}
                />
            </div>

            {/* Plugins List */}
            <main class="w-full">
                <LoadingState
                    loading={plugins.loading}
                    error={plugins.error}
                    loadingText="Loading plugins"
                    errorText="Failed to load plugins"
                    onRetry={() => refetch()}
                >
                    <Show
                        when={filteredPlugins().length > 0}
                        fallback={
                            <div class="flex flex-col items-center justify-center gap-1 py-12 text-neutral-200">
                                <SearchX size={48} class="text-neutral-500" />

                                <p class="text-lg font-bold">
                                    No plugins found.
                                </p>

                                <p class="max-w-92 text-center font-medium text-neutral-300">
                                    Try adjusting your search or filters to find
                                    what you are looking for.
                                </p>
                            </div>
                        }
                    >
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <For each={visiblePlugins()}>
                                {(plugin) => (
                                    <PluginCard
                                        variant={
                                            compactMode() ? "compact" : "normal"
                                        }
                                        {...plugin}
                                    />
                                )}
                            </For>
                        </div>

                        <Show when={hasMorePlugins()}>
                            <div class="mt-8 flex justify-center">
                                <p class="text-sm text-neutral-400">
                                    Showing {visiblePlugins().length} of{" "}
                                    {filteredPlugins().length} plugins • Scroll
                                    down to load more
                                </p>
                            </div>
                        </Show>
                    </Show>
                </LoadingState>
            </main>
        </PageBootstrap>
    )
}
