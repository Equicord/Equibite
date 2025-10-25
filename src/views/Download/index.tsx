import PageBootstrap from '@components/PageBootstrap'
import Button from '@components/UI/Button'
import classNames from 'classnames'

import {
    faAndroid,
    faApple,
    faChrome,
    faFirefox,
    faLinux,
    faWindows,
    IconDefinition,
} from '@fortawesome/free-brands-svg-icons'
import { isAndroid, isLinux, isMac, isWindows } from '@utils/navigator'
import { AlertCircle, DownloadIcon, MonitorCheck, Package } from 'lucide-solid'
import Fa from 'solid-fa'

interface Download {
    text: string
    href: string
    prioritize?: boolean
    note?: string
}

interface Platform {
    icon: IconDefinition
    title: string
    downloads: Download[]
    isCurrent: boolean
    warning?: string
    subtext?: string
    subsection?: Download[]
}

interface Section {
    title: string
    description: string
    githubUrl: string
    platforms: Platform[]
    globalWarning?: string
}

const EquicordPlatforms: Platform[] = [
    {
        title: 'Windows',
        icon: faWindows,
        downloads: [
            {
                text: 'GUI',
                href: 'https://github.com/Equicord/Equilotl/releases/latest/download/Equilotl.exe',
                prioritize: true,
            },
            {
                text: 'CLI',
                href: 'https://github.com/Equicord/Equilotl/releases/latest/download/EquilotlCli.exe',
            },
        ],
        isCurrent: isWindows(),
    },
    {
        title: 'Linux',
        icon: faLinux,
        downloads: [
            {
                text: 'CLI',
                href: 'https://github.com/Equicord/Equilotl/releases/latest/download/EquilotlCli-Linux',
                prioritize: true,
            },
            {
                text: 'AUR',
                href: 'https://aur.archlinux.org/packages/equicord-installer-bin',
            },
        ],
        isCurrent: isLinux(),
        warning: 'GUI version not available on Linux',
    },
    {
        title: 'MacOS',
        icon: faApple,
        downloads: [
            {
                text: 'GUI',
                href: 'https://github.com/Equicord/Equilotl/releases/latest/download/Equilotl.MacOS.zip',
                prioritize: true,
            },
        ],
        isCurrent: isMac(),
    },
]

const BrowserPlatforms: Platform[] = [
    {
        title: 'Firefox',
        icon: faFirefox,
        downloads: [
            {
                text: 'Download',
                href: 'https://github.com/Equicord/Equicord/releases/download/latest/extension-firefox.zip',
                prioritize: true,
                note: 'Sideload only',
            },
        ],
        isCurrent: false,
    },
    {
        title: 'Chrome',
        icon: faChrome,
        downloads: [
            {
                text: 'Web Store',
                href: 'https://chromewebstore.google.com/detail/equicord-web/mcambpfmpjnncfoodejdmehedbkjepmi',
                prioritize: true,
            },
        ],
        isCurrent: false,
    },
]

const EquibopPlatforms: Platform[] = [
    {
        title: 'Windows',
        icon: faWindows,
        downloads: [
            {
                text: 'x64',
                href: 'https://github.com/Equicord/Equibop/releases/latest/download/Equibop-win-x64.exe',
                prioritize: true,
            },
            {
                text: 'x32',
                href: 'https://github.com/Equicord/Equibop/releases/latest/download/Equibop-win.exe',
            },
        ],
        isCurrent: isWindows(),
        warning: 'ARM builds not currently available',
    },
    {
        title: 'Linux',
        icon: faLinux,
        downloads: [
            {
                text: 'x86_64',
                href: 'https://github.com/Equicord/Equibop/releases/latest/download/Equibop-linux-x86_64.AppImage',
                prioritize: true,
            },
            {
                text: 'ARM64',
                href: 'https://github.com/Equicord/Equibop/releases/latest/download/Equibop-linux-arm64.AppImage',
            },
            {
                text: 'AUR',
                href: 'https://aur.archlinux.org/packages?O=0&K=equibop',
            },
            {
                text: 'Flathub',
                href: 'https://flathub.org/apps/io.github.equicord.equibop',
            },
        ],
        isCurrent: isLinux(),
    },
    {
        title: 'MacOS',
        icon: faApple,
        downloads: [
            {
                text: 'Universal',
                href: 'https://github.com/Equicord/Equibop/releases/latest/download/Equibop-mac-universal.dmg',
                prioritize: true,
                note: 'Intel & Apple Silicon',
            },
        ],
        isCurrent: isMac(),
    },
]

const EquidroidPlatforms: Platform[] = [
    {
        title: 'Android',
        icon: faAndroid,
        downloads: [
            {
                text: 'Equidroid',
                href: 'https://github.com/Equicord/Equidroid/releases',
                note: 'Not recommended for actual use',
                prioritize: true,
            },
            {
                text: 'VendroidEnhanced',
                href: 'https://vendroid.nin0.dev',
                note: 'If you still want an experience like Equidroid but better use this',
            },
        ],
        isCurrent: isAndroid(),
        subtext: 'Alternatives to Equidroid',
        subsection: [
            {
                text: 'Revenge',
                href: 'https://github.com/revenge-mod/revenge-manager/releases',
            },
            {
                text: 'Kettu',
                href: 'https://github.com/C0C0B01/KettuManager/releases',
            },
            {
                text: 'Aliucord',
                href: 'https://github.com/Aliucord/Manager/releases',
            }
        ]
    },
]

const OtherOfferings = [
    {
        name: 'NixOS - Equicord',
        href: 'https://search.nixos.org/packages?channel=unstable&show=equicord&from=0&size=50&sort=relevance&type=packages&query=Equicord',
    },
    {
        name: 'NixOS - Equibop',
        href: 'https://search.nixos.org/packages?channel=unstable&show=equibop&from=0&size=50&sort=relevance&type=packages&query=Equibop',
    },
    {
        name: 'Legcord',
        href: 'https://github.com/Legcord/Legcord',
    },
    {
        name: 'Goofcord',
        href: 'https://github.com/Milkshiift/GoofCord',
    },
    {
        name: 'Dorion',
        href: 'https://github.com/SpikeHD/Dorion',
    },
    {
        name: 'Shelter',
        href: 'https://shelter.uwu.network',
    },
]

const Sections: Section[] = [
    {
        title: 'Equicord',
        description:
            'An enhanced version of Vencord with more of 100+ extra plugins.',
        githubUrl: 'https://github.com/Equicord/Equicord',
        platforms: EquicordPlatforms,
    },
    {
        title: 'Browser Extensions',
        description:
            "Equicord won't be providing support for extensions whether official sources or sideloaded.",
        githubUrl: '',
        platforms: BrowserPlatforms,
        globalWarning:
            'Safari not supported (Apple restrictions). Edge/Opera may work via sideload but are not officially supported.',
    },
    {
        title: 'Equibop',
        description:
            'A Vesktop fork aiming to give you a snappier Discord experience with additional plugins, custom splashes, and extra features.',
        githubUrl: 'https://github.com/Equicord/Equibop',
        platforms: EquibopPlatforms,
    },
    {
        title: 'Equidroid',
        description:
            'An enhanced version of Vendroid with more of 100+ extra plugins.',
        githubUrl: 'https://github.com/Equicord/Equidroid',
        platforms: EquidroidPlatforms,
        globalWarning:
            "iOS not supported and unlikely to ever be supported. Please don't actually use Equidroid - use Revenge, Kettu, or Aliucord instead. Due to current limitations, we cannot provide support for Equidroid.",
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
            <div class="flex flex-col gap-12">
                {Sections.map((section) => (
                    <div class="flex flex-col gap-4">
                        <div class="flex flex-col gap-2">
                            <div class="flex items-center gap-3">
                                <h2 class="text-2xl font-bold">
                                    {section.title}
                                </h2>
                                {section.githubUrl && (
                                    <a
                                        href={section.githubUrl}
                                        target="_blank"
                                        class="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
                                    >
                                        GitHub →
                                    </a>
                                )}
                            </div>
                            <p class="text-neutral-400 text-sm">
                                {section.description}
                            </p>
                            {section.globalWarning && (
                                <div class="flex items-start gap-2 px-4 py-3 rounded-lg bg-yellow-950/30 border border-yellow-900/50 text-yellow-200 text-sm">
                                    <AlertCircle
                                        size={16}
                                        class="mt-0.5 flex-shrink-0"
                                    />
                                    <span>{section.globalWarning}</span>
                                </div>
                            )}
                        </div>

                        <div class="flex items-stretch flex-wrap gap-6">
                            {section.platforms.map((platform) => (
                                <div
                                    class={classNames(
                                        'flex-1 xs:min-w-80 flex flex-col justify-between gap-4 py-6 px-6 rounded-xl border border-neutral-800',
                                        platform.isCurrent
                                            ? 'bg-gradient-to-tl from-neutral-900 to-green-950'
                                            : 'bg-gradient-to-br from-neutral-900 to-neutral-950',
                                    )}
                                >
                                    <div class="flex flex-col gap-3">
                                        <div class="flex justify-between items-center">
                                            <span class="flex items-center gap-1 font-semibold">
                                                <Fa
                                                    icon={platform.icon}
                                                    class="!size-4"
                                                />
                                                {platform.title}
                                            </span>

                                            {platform.isCurrent && (
                                                <span class="flex items-center gap-1 rounded-lg py-2 px-2 bg-gradient-to-r from-transparent to-green-900/50 text-green-200 text-sm font-medium">
                                                    <MonitorCheck size={14} />
                                                    For your device
                                                </span>
                                            )}
                                        </div>

                                        {platform.warning && (
                                            <div class="flex items-start gap-2 px-3 py-2 rounded-lg bg-neutral-800/50 text-neutral-300 text-xs">
                                                <AlertCircle
                                                    size={12}
                                                    class="mt-0.5 flex-shrink-0"
                                                />
                                                <span>{platform.warning}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div class="inline-flex items-center flex-wrap gap-3">
                                        {platform.downloads.map((download) => (
                                            <div class="relative flex-1 flex flex-col gap-1">
                                                <a
                                                    href={download.href}
                                                    target="_blank"
                                                    class="w-full"
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
                                                        icon={
                                                            <DownloadIcon
                                                                size={14}
                                                            />
                                                        }
                                                    >
                                                        {download.text}
                                                    </Button>
                                                </a>
                                                {download.note && (
                                                     <span class="absolute bottom-0 text-xs text-neutral-400 text-center w-full translate-y-full">
                                                        {download.note}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <p class="text-neutral-300 text-sm">
                                        {platform.subtext}
                                    </p>

                                    <div class="inline-flex items-center flex-wrap gap-3">
                                        {platform.subsection?.map((download) => (
                                            <div class="flex-1 flex flex-col gap-1">
                                                <a
                                                    href={download.href}
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
                                                        icon={
                                                            <DownloadIcon
                                                                size={14}
                                                            />
                                                        }
                                                    >
                                                        {download.text}
                                                    </Button>
                                                </a>
                                                {download.note && (
                                                    <span class="text-xs text-neutral-400 text-center">
                                                        {download.note}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <h2 class="text-2xl font-bold flex items-center gap-2">
                            <Package size={24} />
                            Other Offerings
                        </h2>
                        <p class="text-neutral-400 text-sm">
                            Third-party Discord clients and package managers
                            that support Equicord.
                        </p>
                        <div class="flex items-start gap-2 px-4 py-3 rounded-lg bg-neutral-800/50 border border-neutral-700 text-neutral-300 text-sm">
                            <AlertCircle
                                size={16}
                                class="mt-0.5 flex-shrink-0"
                            />
                            <span>
                                We may have difficulty offering support for
                                these third-party packages.
                            </span>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {OtherOfferings.map((offering) => (
                            <a
                                href={offering.href}
                                target="_blank"
                                class="px-4 py-3 rounded-lg border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 hover:border-neutral-700 transition-colors"
                            >
                                <span class="text-sm font-medium">
                                    {offering.name}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </PageBootstrap>
    )
}
