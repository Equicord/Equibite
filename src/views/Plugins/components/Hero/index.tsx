import { createResource, Show, For } from "solid-js";
import { fetchPlugins } from "../Features";
import { PluginCard } from "@/components/UI/Card";

export default function PluginsHero() {
    const [plugins] = createResource(fetchPlugins);

    const sortedPlugins = () => {
        return plugins()?.sort((a, b) => a.name.localeCompare(b.name)) || [];
    };

    return (
        <section class="relative pb-36">
            <h2 class="text-3xl font-bold text-neutral-300">Plugins</h2>
            <div class="flex items-center justify-between gap-24 max-lg:flex-col">
                <div class="flex flex-col gap-3 max-lg:items-center max-lg:text-center">
                    <Show when={plugins()} fallback={<p>Loading plugins...</p>}>
                        <For each={sortedPlugins()}>
                            {(plugin) => (
                                <div>
                                    <PluginCard
                                        title={plugin.name}
                                        excerpt={plugin.description}
                                        hasCommands={plugin.hasCommands}
                                        commands={plugin.commands}
                                    />
                                </div>
                            )}
                        </For>
                    </Show>
                </div>
            </div>
        </section>
    );
}
