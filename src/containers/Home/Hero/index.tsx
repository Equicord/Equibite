import Button from '~/components/Button'
import _Laptop from '~/assets/laptop.png'

import Fa from 'solid-fa'
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons'

const HomeHero = () => {
    return (
        <section class="relative py-32 flex max-md:flex-col justify-between items-center gap-6">
            <div class="flex-grow flex flex-col gap-3">
                <h1 class="text-white text-4xl md:text-6xl font-semibold leading-tight">
                    An enhanced version of Vencord
                </h1>

                <p class="text-neutral-400 text-lg md:text-xl font-medium">
                    A fork that has everything you need, third-party plugins and
                    more.
                </p>

                <div class="mt-4 flex items-center gap-4">
                    <a href="/">
                        <Button style="primary">Download</Button>
                    </a>

                    <a href="/">
                        <Button style="secondary">
                            <Fa icon={faPuzzlePiece} class="size-4" />
                            Plugins
                        </Button>
                    </a>
                </div>

                <div class="max-md:hidden absolute -top-32 left-24 -rotate-45">
                    <div class="h-24 w-[512px] bg-gradient-to-r from-white/0 to-white/15 rounded-full blur-2xl" />
                </div>
            </div>

            <div class="max-w-lg">
                <img src={_Laptop} draggable={false} />
            </div>
        </section>
    )
}

export default HomeHero
