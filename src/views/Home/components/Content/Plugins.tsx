import { createSignal } from 'solid-js'
import { A } from '@solidjs/router'
import classNames from 'classnames'

import { Puzzle, Globe } from 'lucide-solid'
import Button from '@components/UI/Button'

interface PluginProps {
    title: string
    description: string
}

function DiscordPlugin(props: PluginProps) {
    const [enabled, setEnabled] = createSignal<boolean>(false)

    return (
        <div class="w-full max-w-92 rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-6 md:px-6">
            <div class="flex items-center justify-between">
                <h1 class="text-lg font-bold">{props.title}</h1>

                <div
                    onClick={() => setEnabled(!enabled())}
                    class={classNames(
                        'flex h-6 w-10 cursor-pointer items-center rounded-full p-1 transition-all',
                        enabled()
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-neutral-800 hover:bg-neutral-700',
                    )}
                >
                    <div
                        class={classNames(
                            'size-4 rounded-full bg-white transition-transform',
                            enabled() && 'translate-x-4',
                        )}
                    />
                </div>
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
        <div class="flex justify-between gap-6 border-t border-b border-neutral-900 max-md:flex-col">
            <div class="flex w-full flex-col gap-6 bg-neutral-900 px-8 py-12 md:w-2/3 md:justify-between">
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
                    <Button style="secondary" customClass="gap-2 font-medium">
                        <Globe fill="#ffffff10" size={16} />
                        Explore plugins
                    </Button>
                </A>
            </div>

            <div class="flex w-full flex-col items-center justify-center py-6 max-md:px-8 max-sm:gap-3">
                <div class="opacity-50 md:translate-x-24 md:translate-y-3">
                    <DiscordPlugin
                        title="BetterCommands"
                        description="Enhances the command system with miscellaneous improvements. Available on all platforms."
                    />
                </div>

                <div class="-translate-y-6 shadow-lg md:-translate-x-24 md:-translate-y-3">
                    <DiscordPlugin
                        title="BetterCommands"
                        description="Enhances the command system with miscellaneous improvements. Available on all platforms."
                    />
                </div>
            </div>
        </div>
    )
}
