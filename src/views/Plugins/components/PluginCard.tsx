import { For, Show } from 'solid-js'
import type { Plugin } from '@utils/plugin'
import {
    formatAuthors,
    cleanDescription,
    getAvailabilityText,
} from '@utils/plugin'

export function PluginCard({
    name,
    description,
    authors,
    hasCommands,
    commands,
    required,
    target,
}: Plugin) {
    return (
        <div class="flex w-full flex-col gap-3 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 p-6">
            <div class="flex flex-col gap-1">
                <span class="text-xl font-bold text-neutral-100">{name}</span>
                <p class="text-xs font-medium text-neutral-400">
                    by {formatAuthors(authors)}
                </p>
            </div>

            <p class="text-sm font-medium text-neutral-300">
                {cleanDescription(description)}.{' '}
                {getAvailabilityText(name, required, target)}.
            </p>

            <Show when={hasCommands && commands.length > 0}>
                <div class="group relative mt-4">
                    <span class="cursor-help rounded text-sm font-semibold text-sky-400 underline decoration-wavy">
                        Hover to view commands
                    </span>

                    <div class="invisible absolute top-full left-0 z-10 mt-2 grid max-h-60 w-full grid-cols-1 gap-3 overflow-auto rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-3 text-neutral-300 shadow-lg transition-all group-hover:visible group-hover:opacity-100 md:max-w-xl md:grid-cols-2 md:p-6">
                        <For each={commands}>
                            {(command) => (
                                <div class="text-sm">
                                    <span class="rounded bg-neutral-800 px-2 py-1 font-semibold text-sky-300">
                                        {command.name}:
                                    </span>

                                    {command.description.toLowerCase()}
                                </div>
                            )}
                        </For>
                    </div>
                </div>
            </Show>
        </div>
    )
}
