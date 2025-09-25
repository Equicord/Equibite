import { Title } from '@solidjs/meta'
import { A, useSearchParams } from '@solidjs/router'
import gsap from 'gsap'
import { createSignal, For, onMount } from 'solid-js'

import {
    type IconDefinition,
    faApple,
    faLinux,
    faWindows,
} from '@fortawesome/free-brands-svg-icons'
import { isLinux, isMac, isWindows } from '@utils/navigator'
import {
    BookOpen,
    CircleQuestionMark,
    Download as DownloadIcon,
    HardDriveDownload,
} from 'lucide-solid'
import Fa from 'solid-fa'

import Button from '@components/UI/Button'
import Dropdown from '@components/UI/Dropdown'

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
    const [searchParams] = useSearchParams()
    const [platform, setPlatform] = createSignal(
        Platforms.find((p) => p.default) || Platforms[0],
    )

    let containerRef: HTMLDivElement | undefined

    const updatePlatform = () => {
        const param = [searchParams.platform].flat()[0]?.toLowerCase()
        const match = Platforms.find((p) => p.title.toLowerCase() === param)

        if (match) setPlatform(match)
    }

    onMount(() => {
        // Animate on mount
        gsap.from(containerRef!, {
            opacity: 0,
            y: 50,
            filter: 'blur(6px)',
            duration: 0.4,
        })

        updatePlatform()
    })

    const dropdownItems = Platforms.map((p) => ({
        label: p.title,
        value: p.title,
        icon: <Fa icon={p.icon} class="!size-4" />,
        onSelect: () => setPlatform(p),
    }))

    const selectedDropdownItem = () => {
        const current = platform()
        return {
            label: current.title,
            value: current.title,
            icon: <Fa icon={current.icon} class="!size-4" />,
        }
    }

    return (
        <>
            <Title>Download | Equicord</Title>

            <div class="max-w-eq-lg mx-auto px-6">
                <div class="flex flex-col gap-6" ref={containerRef}>
                    {/** Header */}
                    <div class="flex flex-col gap-1">
                        <h1 class="text-3xl font-bold md:text-4xl">
                            Download Equicord
                        </h1>
                        <p class="text-lg font-medium text-neutral-400">
                            A fork that has everything you need, third-party
                            plugins and more.
                        </p>
                    </div>

                    {/** Documentation */}
                    <div class="flex items-center gap-4 rounded-xl bg-neutral-900 p-4">
                        <div class="hidden size-10 items-center justify-center rounded-lg border border-neutral-800 bg-gradient-to-t from-neutral-900 to-neutral-800/90 outline-2 outline-offset-2 outline-neutral-600/50 md:flex">
                            <BookOpen size={16} />
                        </div>

                        <div class="flex flex-col">
                            <span class="font-bold">Documentation</span>
                            <p class="text-sm font-medium text-neutral-400">
                                Encountering problems or need some guidance?
                                Read the{' '}
                                <a
                                    href="https://docs.equicord.org/"
                                    target="_blank"
                                    class="text-green-200 underline decoration-wavy"
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

                            <Dropdown
                                icon={<HardDriveDownload size="16" />}
                                items={dropdownItems}
                                placeholder="Platform"
                                selected={selectedDropdownItem()}
                                onSelect={(item) => {
                                    const selectedPlatform = Platforms.find(
                                        (p) => p.title === item.value,
                                    )
                                    if (selectedPlatform)
                                        setPlatform(selectedPlatform)
                                }}
                            />

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
                                                buttonColor={
                                                    item.prioritize
                                                        ? 'primary'
                                                        : 'secondary'
                                                }
                                                class="w-full"
                                                icon={
                                                    <DownloadIcon size="16" />
                                                }
                                            >
                                                {item.text}
                                            </Button>
                                        </A>
                                    )}
                                </For>
                            </div>
                        </div>

                        {/* FAQ */}
                        <div class="flex w-full flex-col gap-4 rounded-xl bg-neutral-900 p-6">
                            <span class="flex items-center gap-2 text-xl font-bold">
                                <CircleQuestionMark
                                    size="16"
                                    fill="#ffffff10"
                                />
                                FAQ
                            </span>

                            <p>Will be added later.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
