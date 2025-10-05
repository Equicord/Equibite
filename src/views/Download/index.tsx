import PageBootstrap from '@components/PageBootstrap'
import Button from '@components/UI/Button'
import classNames from 'classnames'

import {
    faApple,
    faLinux,
    faWindows,
    IconDefinition,
} from '@fortawesome/free-brands-svg-icons'
import { isLinux, isMac, isWindows } from '@utils/navigator'
import { DownloadIcon, MonitorCheck } from 'lucide-solid'
import Fa from 'solid-fa'

interface Platform {
    icon: IconDefinition
    title: string
    downloads: {
        text: string
        href: string
        prioritize?: boolean
    }[]
    isCurrent: boolean
}

const Platforms: Platform[] = [
    {
        title: 'Windows',
        icon: faWindows,
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
        isCurrent: isWindows(),
    },
    {
        title: 'MacOS',
        icon: faApple,
        downloads: [
            {
                text: 'Download',
                href: 'https://github.com/Equicord/Equilotl/releases/latest/download/Equilotl.MacOS.zip',
                prioritize: true,
            },
        ],
        isCurrent: isMac(),
    },
    {
        title: 'Linux',
        icon: faLinux,
        downloads: [
            {
                text: 'Download (CLI)',
                href: 'https://github.com/Equicord/Equilotl/releases/latest/download/EquilotlCli-linux',
                prioritize: true,
            },
        ],
        isCurrent: isLinux(),
    },
]

export default function Download() {
    return (
        <PageBootstrap
            meta={{ title: 'Download' }}
            icon={<DownloadIcon />}
            fullWidth
            title="Download"
            description="Here are your download options."
        >
            <div class="flex items-center flex-wrap gap-6">
                {Platforms.map((platform) => (
                    <div
                        class={classNames(
                            'flex-1 xs:min-w-96 flex flex-col justify-between gap-6 h-64 py-6 px-6  rounded-xl border border-neutral-800',
                            platform.isCurrent
                                ? 'bg-gradient-to-tl from-neutral-900 to-green-950'
                                : 'bg-gradient-to-br from-neutral-900 to-neutral-950',
                        )}
                    >
                        <div class="flex justify-between items-center">
                            <span class="flex items-center gap-1 font-semibold">
                                <Fa icon={platform.icon} class="!size-4" />
                                {platform.title}
                            </span>

                            {platform.isCurrent && (
                                <span class="flex items-center gap-1 rounded-lg py-2 px-2 bg-gradient-to-r from-transparent to-green-900/50 text-green-200 text-sm font-medium">
                                    <MonitorCheck size={14} />
                                    For your device
                                </span>
                            )}
                        </div>

                        <div class="inline-flex items-center flex-wrap gap-3">
                            {platform.downloads.map((download) => (
                                <a
                                    href={download.href}
                                    class="flex-1"
                                    target="_blank"
                                >
                                    <Button
                                        variant={
                                            platform.isCurrent
                                                ? download.prioritize
                                                    ? 'primary'
                                                    : 'secondary'
                                                : 'secondary'
                                        }
                                        class="w-full"
                                        icon={<DownloadIcon size={14} />}
                                    >
                                        {download.text}
                                    </Button>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </PageBootstrap>
    )
}
