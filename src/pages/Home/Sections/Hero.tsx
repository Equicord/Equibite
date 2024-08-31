import Button from '~/components/Button'
import Animate from '~/components/Animate'
import _Laptop from '~/assets/laptop.png'

import Fa from 'solid-fa'
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons'

export default function HomeHero() {
    return (
        <div class="relative max-w-page-sm mx-auto py-36 flex max-md:flex-col justify-between items-center gap-6">
            <div class="flex-grow flex flex-col gap-3">
                <Animate direction="down">
                    <h1 class="text-white text-4xl md:text-6xl font-semibold leading-tight">
                        An enhanced version of Vencord
                    </h1>
                </Animate>

                <Animate direction="down" delay={0.1}>
                    <p class="text-neutral-400 text-lg md:text-xl font-medium">
                        A fork that has everything you need, third-party plugins
                        and more.
                    </p>
                </Animate>

                <Animate
                    direction="down"
                    customClass="mt-4 flex items-center gap-4"
                    delay={0.2}
                >
                    <a href="/download">
                        <Button style="primary">Download</Button>
                    </a>

                    <a href="/plugins">
                        <Button style="secondary">
                            <Fa icon={faPuzzlePiece} />
                            Plugins
                        </Button>
                    </a>
                </Animate>

                <div class="max-md:hidden absolute -top-32 left-24 -rotate-45">
                    <div class="h-24 w-[512px] bg-gradient-to-r from-white/0 to-white/15 rounded-full blur-2xl" />
                </div>
            </div>

            <Animate direction="down" delay={0.3} customClass="max-w-lg">
                <img src={_Laptop} draggable={false} />
            </Animate>
        </div>
    )
}
