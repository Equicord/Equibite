import { A } from "@solidjs/router"
import { createResource, createSignal, Show } from "solid-js"

import Button from "@components/UI/Button"
import Switch from "@components/UI/Switch"
import {
    cleanDescription,
    fetchPlugins,
    getAvailabilityText,
    type Plugin,
} from "@utils/plugin"
import { Globe, Puzzle } from "lucide-solid"

interface PluginProps {
    title: string
    description: string
}

function DiscordPlugin(props: PluginProps) {
    const [enabled, setEnabled] = createSignal<boolean>(false)

    return (
        <div class="w-full max-w-92 rounded-xl bg-neutral-900 px-4 py-6 md:px-6">
            <div class="flex items-center justify-between">
                <h1 class="text-lg font-bold">{props.title}</h1>

                <Switch
                    onclick={() => setEnabled(!enabled())}
                    checked={enabled()}
                />
            </div>

            <p class="text-sm font-medium text-neutral-400">
                {props.description}
            </p>
        </div>
    )
}

function getRandomPlugins(plugins: Plugin[], count: number): Plugin[] {
    const equicordPlugins = plugins.filter(
        (p) =>
            p.filePath.toLowerCase().startsWith("src/equicordplugins") &&
            p.description &&
            p.description.length > 20 &&
            p.description.length < 150,
    )

    const shuffled = [...equicordPlugins].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
}

export default function FeaturePlugins() {
    const [plugins] = createResource(() => fetchPlugins("equicord"))

    const randomPlugins = () => {
        const list = plugins()
        if (!list || list.length === 0) return null
        return getRandomPlugins(list, 2)
    }

    return (
        <div class="flex justify-between gap-6 max-md:flex-col">
            <div class="flex w-full flex-col gap-6 rounded-xl bg-neutral-900 px-8 py-12 md:w-2/3 md:justify-between">
                <div class="flex flex-col gap-2">
                    <span class="flex items-center gap-2 text-xl font-semibold">
                        <Puzzle fill="#ffffff10" size={24} />
                        Third-party plugins
                    </span>

                    <p class="font-medium text-neutral-400">
                        Access a wide variety of plugins, including 150+ plugins
                        alongside the existing ones in Vencord.
                    </p>
                </div>

                <A href="/plugins" class="w-fit">
                    <Button variant="secondary" icon={<Globe size={16} />}>
                        Explore plugins
                    </Button>
                </A>
            </div>

            <div class="flex w-full flex-col items-center justify-center py-6 max-md:px-8 max-sm:gap-3">
                <Show
                    when={randomPlugins()}
                    fallback={
                        <>
                            <div class="scale-95 brightness-75 md:translate-y-3 lg:translate-x-24">
                                <DiscordPlugin
                                    title="ShowBadgesInChat"
                                    description="Shows the message author's badges beside their name in chat. Available on all platforms."
                                />
                            </div>
                            <div class="-translate-y-6 shadow-lg md:-translate-y-3 lg:-translate-x-24">
                                <DiscordPlugin
                                    title="BetterActivities"
                                    description="Shows activity icons in the member list and allows showing all activities. Available on all platforms."
                                />
                            </div>
                        </>
                    }
                >
                    {(pluginList) => (
                        <>
                            <div class="scale-95 brightness-75 md:translate-y-3 lg:translate-x-24">
                                <DiscordPlugin
                                    title={pluginList()[0].name}
                                    description={`${cleanDescription(pluginList()[0].description)}. ${getAvailabilityText(pluginList()[0].name, pluginList()[0].required, pluginList()[0].target)}.`}
                                />
                            </div>
                            <div class="-translate-y-6 shadow-lg md:-translate-y-3 lg:-translate-x-24">
                                <DiscordPlugin
                                    title={pluginList()[1].name}
                                    description={`${cleanDescription(pluginList()[1].description)}. ${getAvailabilityText(pluginList()[1].name, pluginList()[1].required, pluginList()[1].target)}.`}
                                />
                            </div>
                        </>
                    )}
                </Show>
            </div>
        </div>
    )
}
