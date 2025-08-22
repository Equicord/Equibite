import { Show } from 'solid-js'
import { A } from '@solidjs/router'
import {
    type Plugin,
    formatAuthors,
    cleanDescription,
    getAvailabilityText,
} from '@utils/plugin'
import { Puzzle, Users } from 'lucide-solid'

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
        <A
            href={`/plugins/${name.toLowerCase()}`}
            class="relative flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 pb-20 transition-all active:scale-[.98]"
        >
            <div class="flex items-center gap-4">
                <div class="hidden size-10 items-center justify-center rounded-xl border border-neutral-800 bg-gradient-to-t from-neutral-900 to-neutral-800/90 outline-2 outline-offset-2 outline-neutral-600/50 md:flex">
                    <Puzzle size={16} />
                </div>

                <div class="flex flex-col">
                    <span class="text-xl font-bold text-neutral-100">
                        {name}
                    </span>

                    <p class="flex flex-wrap items-center gap-1 text-sm font-medium text-neutral-400">
                        <Users size={16} /> by {formatAuthors(authors)}
                    </p>
                </div>
            </div>

            <p class="text-sm font-medium text-neutral-300">
                {cleanDescription(description)}.{' '}
                {getAvailabilityText(name, required, target)}.
            </p>

            <Show when={hasCommands && commands.length > 0}>
                <p class="absolute bottom-6 text-sm font-medium">
                    Click to view commands.
                </p>
            </Show>
        </A>
    )
}
