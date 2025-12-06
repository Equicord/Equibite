import { Title } from "@solidjs/meta"
import { createSignal, type JSX, onMount, type ParentProps } from "solid-js"

interface Props extends ParentProps {
    meta?: {
        title: string
    }
    icon: JSX.Element
    title: string
}

export default function SimpleBootstrap(props: Props) {
    const [mounted, setMounted] = createSignal(false)

    onMount(() => {
        requestAnimationFrame(() => setMounted(true))
    })

    return (
        <>
            {props.meta?.title && <Title>{props.meta.title}</Title>}
            <div class="flex w-full flex-col items-center justify-center gap-2 pt-32">
                <div
                    class="transition-all duration-700 ease-out"
                    classList={{
                        "opacity-0 -translate-y-8 scale-90 blur-sm": !mounted(),
                        "opacity-100 translate-y-0 scale-100 blur-0": mounted(),
                    }}
                >
                    {props.icon}
                </div>

                <h2
                    class="text-lg font-medium transition-all duration-700 ease-out"
                    classList={{
                        "opacity-0 translate-y-8 blur-sm": !mounted(),
                        "opacity-100 translate-y-0 blur-0": mounted(),
                    }}
                    style={{ "transition-delay": "150ms" }}
                >
                    {props.title}
                </h2>

                <div
                    class="flex items-center gap-2 max-sm:flex-col transition-all duration-700 ease-out"
                    classList={{
                        "opacity-0 translate-y-5 blur-sm": !mounted(),
                        "opacity-100 translate-y-0 blur-0": mounted(),
                    }}
                    style={{ "transition-delay": "300ms" }}
                >
                    {props.children}
                </div>
            </div>
        </>
    )
}
