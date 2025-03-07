import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import Fa from 'solid-fa'
import { For, Show } from 'solid-js'

interface Props {
    // Icon
    icon: IconDefinition
    // Title
    title: string
    // Excerpt
    excerpt: string
    // Class
    class?: string
}

type Commands = {
    name: string
    description: string
}

interface Author {
    name: string
}

interface PluginProps {
    title: string
    excerpt: string
    hasCommands: boolean
    commands: Commands[]
    authors: Author[]
}

export default function Card({
    icon,
    title,
    excerpt,
    class: className,
}: Props) {
    return (
        <div
            class={`w-full p-6 flex flex-col gap-1 bg-neutral-900 rounded-2xl transition-transform duration-300 hover:bg-neutral-800 hover:outline hover:outline-dashed hover:outline-1 hover:outline-neutral-600 hover:-translate-y-1 ${className || ''}`}
        >
            <div class="flex items-center gap-3">
                <div class="size-12 p-0.5 bg-gradient-to-t from-neutral-900 to-neutral-600 rounded-full">
                    <div class="size-full flex justify-center items-center bg-neutral-950 rounded-full">
                        <Fa icon={icon} class="text-gray-300" />
                    </div>
                </div>
                <h3 class="text-xl text-neutral-200 font-bold">{title}</h3>
            </div>

            <p class="pt-1.5 text-sm text-neutral-400 font-medium">{excerpt}</p>
        </div>
    )
}

export function PluginCard({
    title,
    excerpt,
    hasCommands,
    commands,
    authors,
}: PluginProps) {
    const formatAuthors = (authors: Author[]): string => {
        const names = authors.map(author => author.name);
    
        switch (names.length) {
            case 0:
                return "";
            case 1:
                return names[0];
            case 2:
                return names.join(" & ");
            default:
                return names.join(", ");
        }
    }

    return (
        <div class="w-full p-6 flex flex-col gap-1 bg-neutral-900 rounded-2xl transition-transform duration-200 hover:outline-2 hover:bg-neutral-800 hover:outline-neutral-700 hover:-translate-y-0.5">
            <h3 class="text-lg text-neutral-300 font-bold">{title}</h3>
            <p class="text-xs text-neutral-500">by {formatAuthors(authors)}</p>
            <p class="text-sm text-neutral-400 font-medium">{excerpt}</p>

            <Show when={hasCommands && commands.length > 0}>
                <div style={{ color: '#A1A1A1' }}>
                    <span>Commands:</span>
                    <ul class="list-disc pl-5">
                        <For each={commands}>
                            {(command) => (
                                <li style={{ color: '#A1A1A1' }}>
                                    <span>{command.name}:</span>{' '}
                                    {command.description.toLowerCase()}
                                </li>
                            )}
                        </For>
                    </ul>
                </div>
            </Show>
        </div>
    )
}
