import { onMount } from 'solid-js'
import { A } from '@solidjs/router'
import gsap from 'gsap'

import Laptop from '@assets/laptop.png'
import { Download, Github } from 'lucide-solid'
import Button from '@components/UI/Button'

export default function HomeHero() {
    let textRef: HTMLDivElement | undefined
    let laptopRef: HTMLDivElement | undefined

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
            laptopRef!,
            {
                opacity: 0,
                scale: 0.9,
                filter: 'blur(6px)',
            },
            '-=0.4',
        ) // overlap a bit
    })

    return (
        <div class="flex items-center justify-between gap-24 pt-24 pb-48 max-lg:flex-col">
            <div
                class="flex flex-col gap-3 max-lg:items-center max-lg:text-center"
                ref={textRef}
            >
                {/* Text */}
                <h1 class="text-4xl font-semibold text-white lg:text-5xl">
                    An enhanced version of Vencord
                </h1>

                <p class="text-lg font-medium text-neutral-400">
                    A fork that has everything you need, third-party plugins and
                    more.
                </p>

                {/* Buttons */}
                <div class="mt-4 flex gap-2">
                    <A href="/download">
                        <Button style="primary">
                            <Download size="16" />
                            Download
                        </Button>
                    </A>

                    <A href="https://github.com/Equicord/Equicord">
                        <Button style="secondary">
                            <Github size="16" />
                            Source
                        </Button>
                    </A>
                </div>
            </div>

            {/* Laptop */}
            <div class="relative max-w-lg" ref={laptopRef}>
                <img src={Laptop} alt="Laptop" draggable={false} />
            </div>
        </div>
    )
}
