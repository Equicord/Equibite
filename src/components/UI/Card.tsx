import classNames from "classnames"
import type { LucideProps } from "lucide-solid"
import type { Component } from "solid-js"

interface Props {
    customClass?: string
    icon: Component<LucideProps>
    title: string
    excerpt: string
}

export default function Card({
    customClass,
    icon: Icon,
    title,
    excerpt,
}: Props) {
    return (
        <div
            class={classNames(
                customClass,
                "flex w-full flex-col gap-2 rounded-2xl bg-neutral-900 p-6",
            )}
        >
            <div class="flex items-center gap-3">
                <span class="flex items-center gap-2 text-xl font-bold text-neutral-200">
                    <Icon size="18" fill="#ffffff10" />
                    {title}
                </span>
            </div>
            <p class="text-sm font-medium text-neutral-400">{excerpt}</p>
        </div>
    )
}
