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
}

type Commands = {
    name: string;
    description: string;
};

interface PluginProps {
    title: string
    excerpt: string
    hasCommands: boolean;
    commands: Commands[];
}

export default function Card({ icon, title, excerpt }: Props) {
    return (
        <div class="w-full p-6 flex flex-col gap-1 bg-neutral-900 rounded-2xl">
            <div class="size-12 p-0.5 bg-gradient-to-t from-neutral-900 to-neutral-600 rounded-full">
                <div class="size-full flex justify-center items-center bg-neutral-950 rounded-full">
                    <Fa icon={icon} class="text-gray-300" />
                </div>
            </div>

            <h3 class="text-lg text-neutral-300 font-bold">{title}</h3>

            <p class="text-sm text-neutral-400 font-medium">{excerpt}</p>
        </div>
    )
}

export function PluginCard({ title, excerpt, hasCommands, commands }: PluginProps) {
    return (
        <div class="w-full p-6 flex flex-col gap-1 bg-neutral-900 rounded-2xl">
            <h3 class="text-lg text-neutral-300 font-bold">{title}</h3>
            <p class="text-sm text-neutral-400 font-medium">{excerpt}</p>

            {/* Plugin Commands Section */}
            <Show when={hasCommands && commands.length > 0}>
                <div style={{ "color": "#A1A1A1" }}>
                    <span>Commands:</span>
                    <ul class="list-disc pl-5">
                        <For each={commands}>
                            {(command) => (
                                <li style={{ "color": "#A1A1A1" }}>
                                    <span>{command.name}:</span> {command.description.toLowerCase()}
                                </li>
                            )}
                        </For>
                    </ul>
                </div>
            </Show>
        </div>
    );
}