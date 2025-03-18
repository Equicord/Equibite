import { A } from '@solidjs/router'
import Button from '@components/UI/Button'
import Laptop from '@assets/laptop.png'

interface Props {
    ondownload: () => void
}

export default function HomeHero({ ondownload }: Props) {
    return (
        <section class="relative pb-36">
            <div class="flex items-center justify-between gap-24 max-lg:flex-col">
                <div class="flex flex-col gap-3 max-lg:items-center max-lg:text-center">
                    {/* Text */}
                    <h1 class="text-white text-4xl lg:text-5xl font-semibold">
                        An enhanced version of Vencord
                    </h1>

                    <p class="text-neutral-400 text-lg font-medium">
                        A fork that has everything you need, third-party plugins
                        and more.
                    </p>

                    {/* Buttons */}
                    <div class="mt-4 flex gap-2">
                        <Button
                            style="primary"
                            customClass="max-lg:text-sm transition-transform duration-200 hover:scale-105"
                            onclick={ondownload}
                        >
                            Download
                        </Button>

                        <A href="https://github.com/Equicord/Equicord">
                            <Button
                                style="secondary"
                                customClass="max-lg:text-sm transition-transform duration-200 hover:scale-105"
                            >
                                Source
                            </Button>
                        </A>
                    </div>
                </div>

                {/* Laptop - had to wrap it around a div otherwise it wouldnt resize properly. */}
                <div class="max-w-lg">
                    <img 
                        src={Laptop} 
                        alt="Laptop" 
                        draggable={false} 
                        class="transition-all duration-300 hover:-translate-y-2"
                    />
                </div>
            </div>
        </section>
    )
}
