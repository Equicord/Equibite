import {
    onMount,
    onCleanup,
    createResource,
    createSignal,
    createMemo,
    Show,
    For,
} from 'solid-js'
import { fetchPlugins } from '@utils/plugin'
import gsap from 'gsap'

import { RotateCcw, Search, SearchX } from 'lucide-solid'
import { PluginCard } from './components/PluginCard'
import Button from '@components/UI/Button'
import Input from '@components/UI/Input'
import PluginPopover from './components/PluginPopover'

type PluginFilter = 'all' | 'equicord' | 'vencord'
type PlatformFilter = 'all' | 'desktop' | 'web'

const INITIAL_VISIBLE_COUNT = 18
const LOAD_MORE_COUNT = 9
const LOAD_MORE_THRESHOLD = 300

const DESKTOP_PLATFORMS = ['discordDesktop', 'desktop', 'vesktop', 'equibop']

export default function Plugins() {
    const [plugins, { refetch }] = createResource(() => fetchPlugins('all'))
    const [search, setSearch] = createSignal('')
    const [pluginFilter, setPluginFilter] = createSignal<PluginFilter>('all')
    const [platformFilter, setPlatformFilter] =
        createSignal<PlatformFilter>('all')
    const [filterHasCommands, setFilterHasCommands] = createSignal(false)
    const [visibleCount, setVisibleCount] = createSignal(INITIAL_VISIBLE_COUNT)

    let containerRef: HTMLDivElement | undefined

    const updateSearch = (value: string) => {
        setSearch(value)
        setVisibleCount(INITIAL_VISIBLE_COUNT)
    }

    const parseSearchQuery = (query: string) => {
        const args = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
        const filters: {
            platform?: string
            required?: boolean
            terms: string[]
        } = { terms: [] }

        args.forEach((arg) => {
            if (arg.startsWith('platform:')) {
                filters.platform = arg.slice(9).trim()
            } else if (arg.startsWith('required:')) {
                const reqQuery = arg.slice(9).trim()
                filters.required = ['true', 'yes', 'y', '1'].includes(reqQuery)
            } else {
                filters.terms.push(arg)
            }
        })

        return filters
    }

    const filteredPlugins = createMemo(() => {
        const pluginList = plugins()
        if (!pluginList) return []

        const query = search()
        let result = [...pluginList]

        // Text search
        if (query) {
            const { platform, required, terms } = parseSearchQuery(query)

            result = result.filter((plugin) => {
                // Platform search
                if (platform) {
                    const pluginPlatform = plugin.target
                        ? plugin.target
                              .replace(/([a-z])([A-Z])/g, '$1 $2')
                              .toLowerCase()
                        : 'all'
                    if (!pluginPlatform.includes(platform)) return false
                }

                // Required search
                if (
                    typeof required === 'boolean' &&
                    plugin.required !== required
                ) {
                    return false
                }

                // Text terms search
                if (terms.length > 0) {
                    return terms.every((term) => {
                        const nameMatch = plugin.name
                            .toLowerCase()
                            .includes(term)
                        const authorMatch = plugin.authors.some((author) =>
                            author.name.toLowerCase().includes(term),
                        )
                        return nameMatch || authorMatch
                    })
                }

                return true
            })
        }

        // Plugin source filter
        if (pluginFilter() === 'equicord') {
            result = result.filter((plugin) =>
                plugin.filePath.toLowerCase().startsWith('src/equicordplugins'),
            )
        } else if (pluginFilter() === 'vencord') {
            result = result.filter((plugin) =>
                plugin.filePath.toLowerCase().startsWith('src/plugins'),
            )
        }

        // Platform filter
        if (platformFilter() === 'desktop') {
            result = result.filter((plugin) =>
                DESKTOP_PLATFORMS.includes(plugin.target ?? ''),
            )
        } else if (platformFilter() === 'web') {
            result = result.filter((plugin) => plugin.target === 'web')
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

    const handleScroll = () => {
        const { innerHeight, scrollY } = window
        const { offsetHeight } = document.body

        if (
            innerHeight + scrollY >= offsetHeight - LOAD_MORE_THRESHOLD &&
            hasMorePlugins()
        ) {
            setVisibleCount((count) => count + LOAD_MORE_COUNT)
        }
    }

    onMount(() => {
        if (containerRef) {
            gsap.from(containerRef, {
                opacity: 0,
                y: 50,
                filter: 'blur(6px)',
                duration: 0.4,
            })
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
    })

    onCleanup(() => {
        window.removeEventListener('scroll', handleScroll)
    })

    return (
        <div
            class="max-w-eq-lg mx-auto flex flex-col gap-6 px-6"
            ref={containerRef}
        >
            {/* Header */}
            <header class="flex flex-col gap-1">
                <h1 class="text-3xl font-bold md:text-4xl">Plugins</h1>
                <p class="text-lg font-medium text-neutral-400">
                    {filteredPlugins().length} plugin
                    {filteredPlugins().length !== 1 ? 's' : ''} found
                </p>
            </header>

            {/* Search & Filters */}
            <div class="flex items-center gap-3">
                <Input
                    placeholder="Search plugins... (try: platform:web, required:true)"
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
                />
            </div>

            {/* Plugins List */}
            <main class="w-full">
                <Show
                    when={!plugins.loading && !plugins.error}
                    fallback={
                        <div class="flex items-center justify-center py-12">
                            <Show
                                when={plugins.error}
                                fallback={
                                    <div class="flex flex-col items-center gap-2">
                                        <div class="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-sky-500"></div>

                                        <p class="text-sm font-bold text-sky-200">
                                            Loading plugins
                                        </p>
                                    </div>
                                }
                            >
                                <div class="flex flex-col items-center gap-2">
                                    <p class="text-sm font-bold text-red-400">
                                        Failed to load plugins
                                    </p>
                                    <Button
                                        style="red"
                                        icon={<RotateCcw size={16} />}
                                        onClick={() => refetch()}
                                    >
                                        Retry
                                    </Button>
                                </div>
                            </Show>
                        </div>
                    }
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
                                {(plugin) => <PluginCard {...plugin} />}
                            </For>
                        </div>

                        <Show when={hasMorePlugins()}>
                            <div class="mt-8 flex justify-center">
                                <p class="text-sm text-neutral-400">
                                    Showing {visiblePlugins().length} of{' '}
                                    {filteredPlugins().length} plugins • Scroll
                                    down to load more
                                </p>
                            </div>
                        </Show>
                    </Show>
                </Show>
            </main>
        </div>
    )
}
