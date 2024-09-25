import { A } from '@solidjs/router'
import Button from '@/components/UI/Button'
import Laptop from '@/assets/laptop.png'

interface Props {
    ondownload: () => void
}

export default function HomeHero({ ondownload }: Props) {
    return (
        <section class="relative pt-24 pb-36">
            <div class="flex items-center justify-between gap-6 max-md:flex-col">
                <div class="flex flex-col gap-3 max-md:items-center max-md:text-center">
                    {/* Text */}
                    <h1 class="text-white text-4xl lg:text-6xl font-semibold">
                        An enhanced version of Vencord
                    </h1>

                    <p class="text-neutral-400 text-lg lg:text-xl font-medium">
                        A fork that has everything you need, third-party plugins
                        and more.
                    </p>

                    {/* Buttons */}
                    <div class="flex gap-2 max-md:mx-auto">
                        <Button
                            style="primary"
                            customClass="max-lg:text-sm"
                            onclick={ondownload}
                        >
                            Download
                        </Button>

                        <A href="/plugins">
                            <Button
                                style="secondary"
                                customClass="max-lg:text-sm"
                            >
                                Plugins
                            </Button>
                        </A>
                    </div>
                </div>

                {/* Laptop */}
                <img
                    class="max-w-lg"
                    src={Laptop}
                    alt="Laptop"
                    draggable={false}
                />
            </div>
        </section>
    )
}
