import { createResource, createSignal, Show, For } from 'solid-js'
import { fetchPlugins, PluginCard } from '../Features/PluginCard'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Fa from 'solid-fa'
import CustomDropdown from '../Features/CustomDropdown'

export default function PluginsHero() {
    const [plugins, { refetch }] = createResource(fetchPlugins)
    const [search, setSearch] = createSignal('')
    const [pluginFilter, setPluginFilter] = createSignal<'all' | 'equicord' | 'vencord'>('all');
    const [visibleCount, setVisibleCount] = createSignal(18);

    function updateSearch(value: string) {
        setSearch(value)
    }

    function visiblePlugins() {
        return sortedPlugins().slice(0, visibleCount());
    }

    function filteredByFilePath() {
        return (
            plugins()?.filter(plugin => {
                if (pluginFilter() === 'equicord') {
                    return plugin.filePath?.includes('equicordplugins');
                }
                if (pluginFilter() === 'vencord') {
                    return plugin.filePath?.includes('plugins') && !plugin.filePath?.includes('equicordplugins');
                }
                return true;
            }) || []
        );
    }

    function sortedPlugins() {
        return (
            filteredByFilePath()
                .filter(plugin =>
                    plugin.name.toLowerCase().includes(search().toLowerCase())
                )
                .sort((a, b) => a.name.localeCompare(b.name)) || []
        );
    };

    function onScroll() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
            setVisibleCount((count) => count + 9);
        }
    }

    window.addEventListener("scroll", onScroll);

    return (
        <section class="relative pb-36">
            <div class="text-center mt-2">
                <h2 class="text-3xl font-bold text-neutral-300">Plugins</h2>
                <p class="text-neutral-400">
                    {sortedPlugins().length} plugin{sortedPlugins().length !== 1 ? 's' : ''} found
                </p>
            </div>

            <div class="mt-4 mb-6 w-full relative flex items-center gap-2">
                <div class="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search plugins..."
                        class="w-full pl-10 pr-24 py-3 rounded-lg bg-neutral-800 text-white focus:outline-none transition-colors"
                        onInput={(e) => updateSearch(e.currentTarget.value)}
                    />
                    <div class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                        <Fa icon={faSearch} />
                    </div>
                </div>

                <div class="flex justify-center">
                    <CustomDropdown selected={pluginFilter} setSelected={setPluginFilter} />
                </div>
            </div>


            <div class="mt-8 w-full">
                <Show
                    when={!plugins.loading && !plugins.error}
                    fallback={
                        <div class="text-center text-neutral-400">
                            <Show
                                when={!plugins.error}
                                fallback={
                                    <div>
                                        <p>Failed to load plugins.</p>
                                        <button
                                            onClick={() => refetch()}
                                            class="mt-2 px-4 py-2 rounded-md bg-neutral-800 text-white hover:bg-neutral-700"
                                        >
                                            Retry
                                        </button>
                                    </div>
                                }
                            >
                                <p>Loading plugins...</p>
                            </Show>
                        </div>
                    }
                >
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        <For each={visiblePlugins()}>
                            {(plugin) => (
                                <PluginCard
                                    name={plugin.name}
                                    description={plugin.description}
                                    tags={plugin.tags}
                                    authors={plugin.authors}
                                    dependencies={plugin.dependencies}
                                    hasPatches={plugin.hasPatches}
                                    hasCommands={plugin.hasCommands}
                                    commands={plugin.commands}
                                    required={plugin.required}
                                    enabledByDefault={plugin.enabledByDefault}
                                    target={plugin.target}
                                    filePath={plugin.filePath}
                                />
                            )}
                        </For>
                    </div>
                    <Show when={sortedPlugins().length === 0}>
                        <p class="text-neutral-500 mt-4">No plugins found.</p>
                    </Show>
                </Show>
            </div>
        </section>
    )
}
