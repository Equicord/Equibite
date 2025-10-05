import classNames from 'classnames'
import gsap from 'gsap'
import { ChevronUp } from 'lucide-solid'
import {
    Show,
    createEffect,
    createSignal,
    onCleanup,
    onMount,
    type JSX,
} from 'solid-js'

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
    let containerRef: HTMLDivElement | undefined
    let panelRef: HTMLDivElement | undefined
    let closeTimeout: number | undefined

    const animateIn = (el: HTMLElement) =>
        gsap.fromTo(
            el,
            { opacity: 0, y: -5 },
            { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        )

    const animateOut = (el: HTMLElement, onComplete: () => void) =>
        gsap.to(el, {
            opacity: 0,
            y: -5,
            duration: 0.2,
            ease: 'power2.in',
            onComplete,
        })

    const openPopover = () => {
        if (closeTimeout) clearTimeout(closeTimeout)
        setOpen(true)
    }

    const close = () => {
        if (closeTimeout) clearTimeout(closeTimeout)
        panelRef ? animateOut(panelRef, () => setOpen(false)) : setOpen(false)
    }

    const delayedClose = () => {
        if (closeTimeout) clearTimeout(closeTimeout)
        closeTimeout = window.setTimeout(close, 20)
    }

    const toggle = () => setOpen((prev) => !prev)

    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef && !containerRef.contains(event.target as Node))
            close()
    }

    onMount(() => document.addEventListener('click', handleClickOutside))
    onCleanup(() => document.removeEventListener('click', handleClickOutside))

    createEffect(() => {
        if (open() && panelRef) animateIn(panelRef)
    })

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
                        open() && 'rotate-180',
                        'transition-transform',
                    )}
                />
            </div>

            <Show when={open()}>
                <div
                    ref={panelRef}
                    class={classNames(
                        'absolute z-50 mt-2 rounded-2xl border border-neutral-800 bg-neutral-900 shadow-lg p-3 opacity-0',
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
