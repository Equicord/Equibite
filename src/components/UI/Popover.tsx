import { useLocation } from "@solidjs/router"
import classNames from "classnames"
import { ChevronUp } from "lucide-solid"
import {
    Show,
    createEffect,
    createSignal,
    onCleanup,
    onMount,
    type JSX,
} from "solid-js"

interface Props {
    trigger: JSX.Element
    children: JSX.Element
    hover?: boolean
    popoverClass?: string
}

export default function Popover({
    trigger,
    children,
    hover,
    popoverClass,
}: Props) {
    const [open, setOpen] = createSignal(false)
    const [visible, setVisible] = createSignal(false)
    const location = useLocation()
    let containerRef: HTMLDivElement | undefined
    let closeTimeout: number | undefined
    let prevPathname = location.pathname

    createEffect(() => {
        const currentPath = location.pathname
        if (currentPath !== prevPathname) {
            prevPathname = currentPath
            if (open()) {
                close()
            }
        }
    })

    createEffect(() => {
        if (open()) {
            requestAnimationFrame(() => setVisible(true))
        }
    })

    const openPopover = () => {
        if (closeTimeout) clearTimeout(closeTimeout)
        setOpen(true)
    }

    const close = () => {
        if (closeTimeout) clearTimeout(closeTimeout)
        setVisible(false)
        setTimeout(() => setOpen(false), 200)
    }

    const delayedClose = () => {
        if (closeTimeout) clearTimeout(closeTimeout)
        closeTimeout = window.setTimeout(close, 20)
    }

    const toggle = () => {
        if (open()) {
            close()
        } else {
            openPopover()
        }
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef && !containerRef.contains(event.target as Node))
            close()
    }

    onMount(() => document.addEventListener("click", handleClickOutside))
    onCleanup(() => document.removeEventListener("click", handleClickOutside))

    return (
        <div
            ref={containerRef}
            class="relative inline-block"
            onMouseEnter={hover ? openPopover : undefined}
            onMouseLeave={hover ? delayedClose : undefined}
        >
            <div
                onClick={!hover ? toggle : undefined}
                class="flex cursor-pointer items-center hover:bg-neutral-900 py-2 px-3 rounded-xl gap-1 font-medium text-neutral-400 transition-colors hover:text-white"
            >
                {trigger}

                <ChevronUp
                    size={16}
                    class={classNames(
                        open() && "rotate-180",
                        "transition-transform",
                    )}
                />
            </div>

            <Show when={open()}>
                <div
                    class={classNames(
                        "absolute z-50 mt-2 rounded-2xl border border-neutral-800 bg-neutral-900 shadow-lg p-3 transition-all duration-200 ease-out",
                        visible()
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-1",
                        popoverClass,
                    )}
                    onMouseEnter={hover ? openPopover : undefined}
                    onMouseLeave={hover ? delayedClose : undefined}
                >
                    {children}
                </div>
            </Show>
        </div>
    )
}
