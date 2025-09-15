import { Title } from '@solidjs/meta'
import gsap from 'gsap'
import { type JSX, onMount, type ParentProps } from 'solid-js'

interface Props extends ParentProps {
    meta?: {
        title: string
    }
    icon: JSX.Element
    title: string
}

/**
 * Build a simple UI that includes an icon, text and buttons.
 */
export default function SimpleBootstrap(props: Props) {
    let containerRef: HTMLDivElement | undefined
    let contentRef: HTMLDivElement | undefined

    onMount(() => {
        const tl = gsap.timeline({
            defaults: { ease: 'power3.out', duration: 0.8 },
        })

        tl.from(containerRef!.children[0], {
            opacity: 0,
            y: -30,
            scale: 0.8,
            filter: 'blur(6px)',
        })

        tl.from(
            containerRef!.children[1],
            {
                opacity: 0,
                y: 30,
                filter: 'blur(6px)',
            },
            '-=0.4',
        )

        if (contentRef) {
            tl.from(
                contentRef!.children,
                {
                    opacity: 0,
                    y: 20,
                    filter: 'blur(6px)',
                    stagger: 0.15,
                },
                '-=0.3',
            )
        }
    })

    return (
        <>
            {props.meta?.title && <Title>{props.meta.title}</Title>}
            <div
                ref={containerRef}
                class="flex w-full flex-col items-center justify-center gap-2 pt-32"
            >
                {props.icon}

                <h2 class="text-lg font-medium">{props.title}</h2>

                <div
                    ref={contentRef}
                    class="flex items-center gap-2 max-sm:flex-col"
                >
                    {props.children}
                </div>
            </div>
        </>
    )
}
