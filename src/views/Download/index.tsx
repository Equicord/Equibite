import { createSignal, For, onMount } from 'solid-js'
import { A } from '@solidjs/router'
import classNames from 'classnames'
import gsap from 'gsap'

import { isWindows, isMac, isLinux } from '@utils/navigator'
import Fa from 'solid-fa'
import {
    type IconDefinition,
    faWindows,
    faApple,
    faLinux,
} from '@fortawesome/free-brands-svg-icons'
import {
    Download as DownloadIcon,
    BookOpen,
    HardDriveDownload,
    CircleQuestionMark,
} from 'lucide-solid'

import Button from '@components/UI/Button'

interface Platform {
    default: boolean
    icon: IconDefinition
    title: string
    downloads: {
        text: string
        href: string
        prioritize?: boolean
    }[]
}

const Platforms: Platform[] = [
    {
        default: isWindows(),
        icon: faWindows,
        title: 'Windows',
        downloads: [
            {
                text: 'Download',
                href: 'https://github.com/Equicord/Equilotl/releases/latest/download/Equilotl.exe',
                prioritize: true,
            },
            {
                text: 'Download (CLI)',
                href: 'https://github.com/Equicord/Equilotl/releases/latest/download/EquilotlCli.exe',
            },
        ],
    },
    {
        default: isMac(),
        icon: faApple,
        title: 'MacOS',
        downloads: [
            {
                text: 'Download',
                href: 'https://github.com/Equicord/Equilotl/releases/latest/download/Equilotl.MacOS.zip',
                prioritize: true,
            },
        ],
    },
    {
        default: isLinux(),
        icon: faLinux,
        title: 'Linux',
        downloads: [
            {
                text: 'Download (CLI)',
                href: 'https://github.com/Equicord/Equilotl/releases/latest/download/EquilotlCli-linux',
                prioritize: true,
            },
        ],
    },
]

export default function Download() {
    const [platform, setPlatform] = createSignal(
        Platforms.find((p) => p.default) || Platforms[0],
    )

    let containerRef: HTMLDivElement | undefined

    onMount(() => {
        gsap.from(containerRef!, {
            opacity: 0,
            y: 50,
            filter: 'blur(6px)',
            duration: 0.4,
        })
    })

    return (
        <div class="flex flex-col gap-6" ref={containerRef}>
            {/** Header */}
            <div class="flex flex-col gap-1">
                <h1 class="text-3xl font-bold md:text-4xl">
                    Download Equicord
                </h1>
                <p class="text-lg font-medium text-neutral-400">
                    A fork that has everything you need, third-party plugins and
                    more.
                </p>
            </div>

            {/** Documentation */}
            <div class="flex items-center gap-3 rounded-xl bg-neutral-900 p-3">
                <div class="rounded-lg bg-sky-900 p-3 text-sky-200">
                    <BookOpen size="16" />
                </div>
                <div class="flex flex-col">
                    <span class="font-bold">Documentation</span>
                    <p class="text-sm font-medium text-neutral-400">
                        Encountering problems or need some guidance? Read the{' '}
                        <a
                            href="https://docs.equicord.org/"
                            target="_blank"
                            class="text-sky-200 underline decoration-wavy"
                        >
                            documentation
                        </a>
                        .
                    </p>
                </div>
            </div>

            <div class="flex gap-6 max-md:flex-col">
                {/* Downloads */}
                <div class="flex w-full flex-col gap-4 rounded-xl bg-neutral-900 p-6">
                    <span class="flex items-center gap-2 text-xl font-bold">
                        <HardDriveDownload size="16" fill="#ffffff10" />
                        Choose your platform
                    </span>

                    <div class="flex items-center gap-2 max-md:flex-wrap">
                        <For each={Platforms}>
                            {(item) => (
                                <button
                                    onclick={() => setPlatform(item)}
                                    class={classNames(
                                        'flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold transition-all',
                                        platform() === item
                                            ? 'bg-sky-900 text-sky-200'
                                            : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200',
                                    )}
                                >
                                    <Fa icon={item.icon} class="!size-4" />
                                    {item.title}
                                </button>
                            )}
                        </For>
                    </div>

                    <hr class="border-neutral-800" />

                    {/* Options */}
                    <div class="flex items-center justify-between gap-2 max-md:flex-wrap">
                        <For
                            each={[...platform().downloads].sort(
                                (a, b) =>
                                    (b.prioritize ? 1 : 0) -
                                    (a.prioritize ? 1 : 0),
                            )}
                        >
                            {(item) => (
                                <A href={item.href} class="w-full">
                                    <Button
                                        customClass="w-full"
                                        style={
                                            item.prioritize
                                                ? 'primary'
                                                : 'secondary'
                                        }
                                    >
                                        <DownloadIcon size="16" />
                                        {item.text}
                                    </Button>
                                </A>
                            )}
                        </For>
                    </div>
                </div>

                {/* Reasons */}
                <div class="flex w-full flex-col gap-4 rounded-xl bg-neutral-900 p-6">
                    <span class="flex items-center gap-2 text-xl font-bold">
                        <CircleQuestionMark size="16" fill="#ffffff10" />
                        FAQ
                    </span>

                    <p>Will be added later.</p>
                </div>
            </div>
        </div>
    )
}
