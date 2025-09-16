import { A } from '@solidjs/router'
import {
    type Plugin,
    cleanDescription,
    formatAuthors,
    getAvailabilityText,
} from '@utils/plugin'
import classNames from 'classnames'
import { Puzzle, Users } from 'lucide-solid'
import { Show } from 'solid-js'

interface Props extends Plugin {
    variant: CardVariant
}

type CardVariant = 'compact' | 'normal'

export default function PluginCard(props: Props) {
    return (
        <A
            href={`/plugins/${props.name.toLowerCase()}`}
            class={classNames(
                'relative flex w-full flex-col gap-3 rounded-xl border border-neutral-800',
                'bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 transition-transform active:scale-[.98]',
                {
                    'pb-20': props.variant === 'normal',
                },
            )}
        >
            <div class="flex items-center gap-4">
                <div
                    class={classNames(
                        'hidden size-10 items-center justify-center rounded-xl border border-neutral-800',
                        'bg-gradient-to-t from-neutral-900 to-neutral-800/90',
                        'outline-2 outline-offset-2 outline-neutral-600/50 md:flex',
                    )}
                >
                    <Puzzle size={16} />
                </div>

                <div class="flex flex-col">
                    <span class="text-xl font-bold text-neutral-100">
                        {props.name}
                    </span>

                    <Show when={props.variant === 'normal'}>
                        <p class="flex flex-wrap items-center gap-1 text-sm font-medium text-neutral-400">
                            <Users size={16} /> by{' '}
                            {formatAuthors(props.authors)}
                        </p>
                    </Show>
                </div>
            </div>

            <p class="text-sm font-medium text-neutral-300">
                {cleanDescription(props.description)}.{' '}
                {getAvailabilityText(props.name, props.required, props.target)}.
            </p>

            <Show
                when={
                    props.variant === 'normal' &&
                    props.hasCommands &&
                    props.commands.length > 0
                }
            >
                <p class="absolute bottom-6 text-sm font-medium">
                    Click to view commands.
                </p>
            </Show>
        </A>
    )
}
