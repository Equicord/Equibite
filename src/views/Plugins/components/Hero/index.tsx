import { createResource, createSignal, Show, For } from "solid-js";
import { fetchPlugins } from "../Features";
import { PluginCard } from "@/components/UI/Card";

export default function PluginsHero() {
    const [plugins] = createResource(fetchPlugins);
    const [search, setSearch] = createSignal("");

    const sortedPlugins = () => {
        return plugins()
            ?.sort((a, b) => a.name.localeCompare(b.name))
            .filter((plugin) =>
                plugin.name.toLowerCase().includes(search().toLowerCase())
            ) || [];
    };

    return (
        <section class="relative pt-24 pb-36">
            <h2 class="text-3xl font-bold text-neutral-300">Plugins</h2>

            <div class="mt-4 mb-6 w-full">
                <input
                    type="text"
                    placeholder="Search plugins..."
                    class="w-full p-2 rounded-md border border-neutral-600 bg-neutral-800 text-white focus:outline-none"
                    onInput={(e) => setSearch(e.currentTarget.value)}
                />
            </div>

            <div class="flex flex-col gap-3 max-lg:items-center max-lg:text-center mt-8 w-full">
                <Show when={plugins()} fallback={<p>Loading plugins...</p>}>
                    <For each={sortedPlugins()}>
                        {(plugin) => (
                            <div class="w-full">
                                <PluginCard
                                    title={plugin.name}
                                    excerpt={plugin.description}
                                    hasCommands={plugin.hasCommands}
                                    commands={plugin.commands}
                                />
                            </div>
                        )}
                    </For>
                    <Show when={sortedPlugins().length === 0}>
                        <p class="text-neutral-500 mt-4">No plugins found.</p>
                    </Show>
                </Show>
            </div>
        </section>
    );
}
