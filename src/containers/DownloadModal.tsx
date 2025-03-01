import { createSignal, For } from 'solid-js'
import { A } from '@solidjs/router'
import classNames from 'classnames'

import { isWindows, isMac, isLinux } from '@utils/navigator'
import Fa from 'solid-fa'
import {
    type IconDefinition,
    faWindows,
    faApple,
    faLinux,
} from '@fortawesome/free-brands-svg-icons'

import Modal from '@components/UI/Modal'
import Button from '@components/UI/Button'

interface Props {
    onclose: () => void
}

interface Platform {
    // Default
    default: boolean
    // Icon
    icon: IconDefinition
    // Title
    title: string
    // Downloads
    downloads: {
        text: string
        href: string
    }[]
}

const platforms: Platform[] = [
    {
        default: isWindows(),
        icon: faWindows,
        title: 'Windows',
        downloads: [
            {
                text: 'Download',
                href: 'https://github.com/Equicord/Equilotl/releases/latest/download/Equilotl.exe',
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
            },
        ],
    },
]

export default function DownloadModal({ onclose }: Props) {
    const [platform, setPlatform] = createSignal(
        platforms.find((platform) => platform.default) || platforms[0],
    )

    return (
        <Modal onclose={onclose}>
            <div class="px-12 py-8 flex flex-col items-center gap-2 bg-neutral-900 rounded-xl">
                <h1 class="text-lg font-semibold">Select your platform</h1>

                {/** Tabs */}
                <div class="flex items-center bg-neutral-800 rounded-xl">
                    <For each={platforms}>
                        {(item) => (
                            <button
                                onclick={() => setPlatform(item)}
                                class={classNames(
                                    'px-4 py-3 flex items-center gap-2 rounded-xl transition-colors',
                                    { 'bg-neutral-700': platform() === item },
                                )}
                            >
                                <Fa icon={item.icon} class="!size-4" />
                                <h4 class="font-semibold">{item.title}</h4>
                            </button>
                        )}
                    </For>
                </div>

                {/** Downloads */}
                <div class="flex items-center gap-2">
                    <For each={platform().downloads}>
                        {(item) => (
                            <A href={item.href}>
                                <Button style="secondary">{item.text}</Button>
                            </A>
                        )}
                    </For>
                </div>
            </div>
        </Modal>
    )
}
