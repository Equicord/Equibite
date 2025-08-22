import { onMount } from 'solid-js'
import { A } from '@solidjs/router'
import gsap from 'gsap'

import Settings from '@assets/settings.png'
import { BookCheck, Download, Github } from 'lucide-solid'
import Button from '@components/UI/Button'

export default function HomeHero() {
    let textRef: HTMLDivElement | undefined
    let screenRef: HTMLImageElement | undefined

    onMount(() => {
        const tl = gsap.timeline({
            defaults: { ease: 'power3.out', duration: 0.8 },
        })

        tl.from(textRef!.children, {
            opacity: 0,
            y: 40,
            filter: 'blur(6px)',
            stagger: 0.15,
        })

        tl.from(
            screenRef!,
            {
                opacity: 0,
                scale: 0.9,
                filter: 'blur(6px)',
            },
            '-=0.4',
        ) // overlap a bit
    })

    return (
        <div class="pt-24 pb-24">
            <div class="max-w-eq-sm mx-auto flex flex-col items-center px-6">
                <div
                    class="flex max-w-[460px] flex-col items-center justify-center gap-3 text-center"
                    ref={textRef}
                >
                    {/* Text */}
                    <h1 class="text-4xl font-semibold text-white lg:text-5xl">
                        An enhanced version of Vencord
                    </h1>

                    <p class="text-xl font-medium text-neutral-400">
                        A fork that has everything you need, third-party plugins
                        and more.
                    </p>

                    {/* Buttons */}
                    <div class="mt-4 flex gap-2">
                        <A href="/download">
                            <Button
                                style="primary"
                                icon={<Download size="16" />}
                            >
                                Download
                            </Button>
                        </A>

                        <A href="https://docs.equicord.org/">
                            <Button
                                style="secondary"
                                icon={<BookCheck size="16" />}
                            >
                                Documentation
                            </Button>
                        </A>
                    </div>
                </div>

                <img
                    ref={screenRef}
                    src={Settings}
                    class="mt-12 rounded-t-2xl mask-b-from-50% select-none"
                    draggable="false"
                />
            </div>
        </div>
    )
}
