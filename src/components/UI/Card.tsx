import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import Fa from 'solid-fa'

interface Props {
    icon: IconDefinition
    title: string
    excerpt: string
    class?: string
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
