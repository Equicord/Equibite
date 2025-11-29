import { Title } from "@solidjs/meta"
import classNames from "classnames"
import gsap from "gsap"
import { type JSX, onMount, type ParentProps } from "solid-js"

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
    let containerRef: HTMLDivElement | undefined

    onMount(() => {
        gsap.from(containerRef!, {
            opacity: 0,
            y: 50,
            filter: "blur(6px)",
            duration: 0.4,
        })
    })

    return (
        <>
            {props.meta?.title && <Title>{props.meta.title} | Equicord</Title>}
            <div
                class={classNames(
                    props.fullWidth ? "max-w-eq-lg" : "max-w-eq-sm",
                    "mx-auto flex flex-col gap-6 px-6 py-12",
                )}
                ref={containerRef}
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
