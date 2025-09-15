import { createSignal } from 'solid-js'
import { A } from '@solidjs/router'

import { Puzzle, Globe } from 'lucide-solid'
import Button from '@components/UI/Button'
import Switch from '@components/UI/Switch'

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

// Todo: make it so it picks out random plugins from the json
export default function FeaturePlugins() {
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
                    <Button style="secondary" icon={<Globe size={16} />}>
                        Explore plugins
                    </Button>
                </A>
            </div>

            <div class="flex w-full flex-col items-center justify-center py-6 max-md:px-8 max-sm:gap-3">
                <div class="opacity-50 md:translate-y-3 lg:translate-x-24">
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
            </div>
        </div>
    )
}
