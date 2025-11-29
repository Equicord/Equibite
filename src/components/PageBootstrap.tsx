import { Title } from "@solidjs/meta"
import classNames from "classnames"
import { createSignal, type JSX, onMount, type ParentProps } from "solid-js"

interface Props extends ParentProps {
    meta?: {
        title: string
    }
    icon?: JSX.Element
    fullWidth?: boolean
    title: string
    description: string
}

export default function PageBootstrap(props: Props) {
    const [mounted, setMounted] = createSignal(false)

    onMount(() => {
        requestAnimationFrame(() => setMounted(true))
    })

    return (
        <>
            {props.meta?.title && <Title>{props.meta.title} | Equicord</Title>}
            <div
                class={classNames(
                    props.fullWidth ? "max-w-eq-lg" : "max-w-eq-sm",
                    "mx-auto flex flex-col gap-6 px-6 py-12 transition-all duration-400 ease-out",
                )}
                classList={{
                    "opacity-0 translate-y-12 blur-sm": !mounted(),
                    "opacity-100 translate-y-0 blur-0": mounted(),
                }}
            >
                <header class="flex flex-col gap-1">
                    <h1 class="inline-flex items-center gap-2 text-3xl font-bold md:text-4xl">
                        {props.icon} {props.title}
                    </h1>
                    <p class="max-w-xl text-lg font-medium text-neutral-400">
                        {props.description}
                    </p>
                </header>

                {props.children}
            </div>
        </>
    )
}
