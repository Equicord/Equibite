import { createResource, createSignal, Show, For } from "solid-js";
import { fetchPlugins } from "../Features";
import { PluginCard } from "@/components/UI/Card";
import { faArrowLeft, faArrowRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import Fa from "solid-fa";

export default function PluginsHero() {
    const [plugins, { refetch }] = createResource(fetchPlugins);
    const [search, setSearch] = createSignal("");
    const [currentPage, setCurrentPage] = createSignal(1);
    const itemsPerPage = 9;

    const updateSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const sortedPlugins = () => {
        return plugins()
            ?.sort((a, b) => a.name.localeCompare(b.name))
            .filter((plugin) =>
                plugin.name.toLowerCase().includes(search().toLowerCase())
            ) || [];
    };

    const paginatedPlugins = () => {
        const filtered = sortedPlugins();
        const start = (currentPage() - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filtered.slice(start, end);
    };

    const totalPages = () => Math.ceil(sortedPlugins().length / itemsPerPage);

    return (
        <section class="relative pb-36">
            <h2 class="text-3xl font-bold text-neutral-300">Plugins</h2>

            <div class="mt-4 mb-6 w-full relative">
                <div class="relative">
                    <input
                        type="text"
                        placeholder="Search plugins..."
                        class="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-600 bg-neutral-800 text-white focus:outline-none focus:border-neutral-400 transition-colors"
                        onInput={(e) => updateSearch(e.currentTarget.value)}
                    />
                    <div class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                        <Fa icon={faSearch} />
                    </div>
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
                                            class="mt-2 px-4 py-2 rounded-md border border-neutral-600 bg-neutral-800 text-white hover:bg-neutral-700"
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
                        <For each={paginatedPlugins()}>
                            {(plugin) => (
                                <PluginCard
                                    title={plugin.name}
                                    excerpt={plugin.description}
                                    hasCommands={plugin.hasCommands}
                                    commands={plugin.commands}
                                    authors={plugin.authors}
                                />
                            )}
                        </For>
                    </div>
                    <Show when={sortedPlugins().length === 0}>
                        <p class="text-neutral-500 mt-4">No plugins found.</p>
                    </Show>
                    
                    <Show when={sortedPlugins().length > 0}>
                        <div class="flex justify-center gap-2 mt-6">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage() === 1}
                                class="px-4 py-2 rounded-md border border-neutral-600 bg-neutral-800 text-white disabled:opacity-50"
                            >
                                <Fa icon={faArrowLeft} />
                            </button>
                            <span class="px-4 py-2 text-neutral-300">
                                Page {currentPage()} of {totalPages()}
                            </span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages(), p + 1))}
                                disabled={currentPage() === totalPages()}
                                class="px-4 py-2 rounded-md border border-neutral-600 bg-neutral-800 text-white disabled:opacity-50"
                            >
                                <Fa icon={faArrowRight} />
                            </button>
                        </div>
                    </Show>
                </Show>
            </div>
        </section>
    );
}
