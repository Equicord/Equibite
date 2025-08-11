import {
    onMount,
    onCleanup,
    createResource,
    createSignal,
    Show,
    For,
} from 'solid-js'
import { fetchPlugins } from '@utils/plugin'
import classNames from 'classnames'
import gsap from 'gsap'

import { Search, SlidersHorizontal, SearchX } from 'lucide-solid'
import Dropdown from '@components/UI/Dropdown'
import { PluginCard } from './components/PluginCard'
import Button from '@components/UI/Button'

export default function Plugins() {
    const [plugins, { refetch }] = createResource(() => fetchPlugins(true))
    const [search, setSearch] = createSignal('')
    const [pluginFilter, setPluginFilter] = createSignal<
        'all' | 'equicord' | 'vencord'
    >('all')
    const [platformFilter, setPlatformFilter] = createSignal<
        'all' | 'desktop' | 'web'
    >('all')

    const [filterHasCommands, setFilterHasCommands] = createSignal(false)

    const [visibleCount, setVisibleCount] = createSignal(18)

    let containerRef: HTMLDivElement | undefined

    const pluginOptions = [
        {
            value: 'all',
            label: 'Show All Plugins',
        },
        {
            value: 'equicord',
            label: 'Show Equicord Plugins',
        },
        {
            value: 'vencord',
            label: 'Show Vencord Plugins',
        },
    ]

    const platformOptions = [
        {
            value: 'all',
            label: 'All Platforms',
        },
        {
            value: 'desktop',
            label: 'Desktop',
        },
        {
            value: 'web',
            label: 'Web',
        },
    ]

    const updateSearch = (value: string) => {
        setSearch(value)
        setVisibleCount(18)
    }

    const sortedPlugins = () => {
        let result = plugins() || []
        const query = search().toLowerCase()

        result = result.filter((plugin) => {
            const nameMatch = plugin.name.toLowerCase().includes(query)
            const authorMatch = plugin.authors?.some((author) =>
                author.name.toLowerCase().includes(query),
            )
            const platform = plugin.target
                ? plugin.target
                      .replace(/([a-z])([A-Z])/g, '$1 $2')
                      .toLowerCase()
                : 'all platforms'

            const platformMatch =
                platform.includes(query) ||
                ('all platforms'.startsWith(query) &&
                    platform === 'all platforms')

            const requiredMatch =
                'required'.startsWith(query) && plugin.required

            return nameMatch || authorMatch || platformMatch || requiredMatch
        })

        if (pluginFilter() === 'equicord') {
            result = result.filter((plugin) =>
                plugin.filePath.toLowerCase().startsWith('src/equicordplugins'),
            )
        } else if (pluginFilter() === 'vencord') {
            result = result.filter((plugin) =>
                plugin.filePath.toLowerCase().startsWith('src/plugins'),
            )
        }

        // Use platformFilter dropdown instead of separate desktop/web flags
        if (platformFilter() === 'desktop') {
            result = result.filter((plugin) =>
                ['discordDesktop', 'desktop', 'vesktop', 'equibop'].includes(
                    plugin.target ?? '',
                ),
            )
        } else if (platformFilter() === 'web') {
            result = result.filter((plugin) => plugin.target === 'web')
        }

        // Filter by hasCommands
        if (filterHasCommands()) {
            result = result.filter((plugin) => plugin.hasCommands)
        }

        return result.sort((a, b) => a.name.localeCompare(b.name))
    }

    const visiblePlugins = () => sortedPlugins().slice(0, visibleCount())

    const onScroll = () => {
        if (
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 300
        ) {
            setVisibleCount((count) => count + 9)
        }
    }

    onMount(() => {
        // prettier-ignore - Why is it doing that lmao
        gsap.from(containerRef!, {
            opacity: 0,
            y: 50,
            filter: 'blur(6px)',
            duration: 0.4,
        })

        window.addEventListener('scroll', onScroll)
    })

    onCleanup(() => window.removeEventListener('scroll', onScroll))

    return (
        <div class="flex flex-col gap-6" ref={containerRef}>
            {/** Header */}
            <div class="flex flex-col gap-1">
                <h1 class="text-3xl font-bold md:text-4xl">Plugins</h1>
                <p class="text-lg font-medium text-neutral-400">
                    We found {sortedPlugins().length} plugins.
                </p>
            </div>

            <div class="flex flex-col gap-3">
                <div class="flex h-16 w-full items-center gap-3 rounded-lg bg-neutral-900 px-4">
                    <Search size="18" />

                    <input
                        type="text"
                        placeholder="Search plugins..."
                        class="w-full outline-none"
                        onInput={(e) => updateSearch(e.currentTarget.value)}
                    />
                </div>

                <div class="flex gap-3 rounded-lg bg-neutral-900 p-4 max-md:flex-col md:justify-between">
                    <div class="flex items-center gap-2 font-semibold text-neutral-300">
                        <SlidersHorizontal size="18" fill="#ffffff80" />
                        <span>Filters</span>
                    </div>

                    <div class="md:items-right flex gap-3 max-md:flex-wrap md:w-full md:justify-end">
                        <Dropdown
                            customClass="!w-full max-md:max-w-none"
                            options={pluginOptions}
                            selected={pluginFilter}
                            setSelected={setPluginFilter}
                        />

                        <Dropdown
                            customClass="!w-full sm:!max-w-[180px] max-md:max-w-none"
                            options={platformOptions}
                            selected={platformFilter}
                            setSelected={setPlatformFilter}
                        />

                        <button
                            class={classNames(
                                filterHasCommands()
                                    ? 'bg-sky-900 text-sky-200'
                                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700',
                                'cursor-pointer rounded-lg px-4 py-2 font-medium transition-colors',
                            )}
                            onClick={() =>
                                setFilterHasCommands(!filterHasCommands())
                            }
                        >
                            Has Commands
                        </button>
                    </div>
                </div>
            </div>

            <div class="w-full">
                <Show
                    when={!plugins.loading && !plugins.error}
                    fallback={
                        <div class="text-center text-neutral-400">
                            <Show
                                when={!plugins.error}
                                fallback={
                                    <Button
                                        style="primary"
                                        onclick={() => refetch()}
                                    >
                                        Retry
                                    </Button>
                                }
                            >
                                <p>Loading plugins...</p>
                            </Show>
                        </div>
                    }
                >
                    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <For each={visiblePlugins()}>
                            {(plugin) => <PluginCard {...plugin} />}
                        </For>
                    </div>

                    <Show when={sortedPlugins().length === 0}>
                        <span class="flex items-center gap-1 text-center font-medium text-neutral-300">
                            <SearchX size="18" />
                            No plugins found.
                        </span>
                    </Show>
                </Show>
            </div>
        </div>
    )
}
