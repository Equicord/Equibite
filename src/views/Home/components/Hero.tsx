import { A } from "@solidjs/router"
import { createSignal, For, onMount } from "solid-js"

import { faApple, faLinux, faWindows } from "@fortawesome/free-brands-svg-icons"
import { Download } from "lucide-solid"
import Fa from "solid-fa"

import Button from "@components/UI/Button"
import { isLinux, isMac, isWindows } from "@utils/navigator"

export default function HomeHero() {
    const [mounted, setMounted] = createSignal(false)
    const headerWords = "An enhanced version of Vencord".split(" ")

    const getPlatform = () => {
        if (isWindows()) {
            return {
                label: "Download for Windows",
                href: "/download?platform=windows",
                icon: <Fa icon={faWindows} class="!size-4" />,
            }
        }

        if (isMac()) {
            return {
                label: "Download for macOS",
                href: "/download?platform=macos",
                icon: <Fa icon={faApple} class="!size-4" />,
            }
        }

        if (isLinux()) {
            return {
                label: "Download for Linux",
                href: "/download?platform=linux",
                icon: <Fa icon={faLinux} class="!size-4" />,
            }
        }

        return {
            label: "Download",
            href: "/download",
            icon: <Download size="16" />,
        }
    }

    const platform = getPlatform()

    onMount(() => {
        requestAnimationFrame(() => setMounted(true))
    })

    return (
        <div class="max-w-eq-lg mx-auto flex flex-col items-center px-6 pt-24">
            <div class="flex max-w-[700px] flex-col items-center justify-center gap-4 text-center">
                <h1 class="text-4xl font-bold text-white lg:text-7xl lg:leading-18">
                    <For each={headerWords}>
                        {(word, index) => (
                            <span
                                class="mr-2 inline-block transition-all duration-700 ease-out"
                                classList={{
                                    "opacity-0 translate-y-10 blur-sm":
                                        !mounted(),
                                    "opacity-100 translate-y-0 blur-0":
                                        mounted(),
                                }}
                                style={{
                                    "transition-delay": `${index() * 100}ms`,
                                }}
                            >
                                {word}
                            </span>
                        )}
                    </For>
                </h1>

                <p
                    class="text-lg font-semibold text-neutral-400 transition-all duration-700 ease-out"
                    classList={{
                        "opacity-0 translate-y-10 blur-sm": !mounted(),
                        "opacity-100 translate-y-0 blur-0": mounted(),
                    }}
                    style={{ "transition-delay": "400ms" }}
                >
                    A fork that offers a wider selection of plugins from the community.
                </p>
                <p
                    class="text-xs font-semibold text-neutral-400 transition-all duration-700 ease-out"
                    classList={{
                        "opacity-0 translate-y-10 blur-sm": !mounted(),
                        "opacity-100 translate-y-0 blur-0": mounted(),
                    }}
                    style={{ "transition-delay": "400ms" }}
                >
                    The unstable fork of Vencord.
                </p>

                <div
                    class="mt-6 flex flex-col items-center gap-3 transition-all duration-700 ease-out"
                    classList={{
                        "opacity-0 translate-y-10 blur-sm": !mounted(),
                        "opacity-100 translate-y-0 blur-0": mounted(),
                    }}
                    style={{ "transition-delay": "600ms" }}
                >
                    <A href={platform.href}>
                        <Button variant="primary" icon={platform.icon}>
                            {platform.label}
                        </Button>
                    </A>

                    <span class="inline-flex items-center gap-1 text-xs font-bold text-neutral-400">
                        Available on <Fa icon={faWindows} /> Windows,{" "}
                        <Fa icon={faApple} /> macOS and <Fa icon={faLinux} />{" "}
                        Linux.
                    </span>
                </div>
            </div>

            <img
                src="/assets/home/settings.png"
                alt="Equicord Settings Interface"
                loading="lazy"
                class="mt-12 rounded-t-2xl mask-b-from-75% select-none transition-all duration-700 ease-out"
                classList={{
                    "opacity-0 scale-95 blur-md": !mounted(),
                    "opacity-100 scale-100 blur-0": mounted(),
                }}
                style={{ "transition-delay": "800ms" }}
                draggable="false"
            />
        </div>
    )
}
