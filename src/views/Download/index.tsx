import type { Platform, Section } from "@/types"
import PageBootstrap from "@components/PageBootstrap"
import Button from "@components/UI/Button"
import classNames from "classnames"

import { CacheTTL } from "@/constants"
import {
    faAndroid,
    faApple,
    faChrome,
    faEdge,
    faFirefox,
    faLinux,
    faWindows,
} from "@fortawesome/free-brands-svg-icons"
import {
    isAndroid,
    isChromeOS,
    isIOS,
    isLinux,
    isMac,
    isWindows,
} from "@utils/navigator"
import { AlertCircle, DownloadIcon, MonitorCheck, Package } from "lucide-solid"
import Fa from "solid-fa"
import { createResource } from "solid-js"

const VERSION_URL =
    "https://raw.githubusercontent.com/Equicord/Equibite/refs/heads/main/public/version"
let cachedVersion = "3.1.5"
let lastFetch = 0

const EquicordPlatforms: Platform[] = [
    {
        title: "Windows",
        icon: faWindows,
        downloads: [
            {
                text: "GUI",
                href: "https://github.com/Equicord/Equilotl/releases/latest/download/Equilotl.exe",
                prioritize: true,
            },
            {
                text: "CLI",
                href: "https://github.com/Equicord/Equilotl/releases/latest/download/EquilotlCli.exe",
            },
        ],
        isCurrent: isWindows(),
    },
    {
        title: "Linux",
        icon: faLinux,
        downloads: [
            {
                text: "GUI",
                href: "https://github.com/Equicord/Equilotl/releases/latest/download/Equilotl-x11",
                prioritize: true,
                note: "X11 only",
            },
            {
                text: "CLI",
                href: "https://github.com/Equicord/Equilotl/releases/latest/download/EquilotlCli-Linux",
            },
            {
                text: "AUR",
                href: "https://aur.archlinux.org/packages/equicord-installer-bin",
            },
        ],
        isCurrent: isLinux(),
    },
    {
        title: "MacOS",
        icon: faApple,
        downloads: [
            {
                text: "GUI",
                href: "https://github.com/Equicord/Equilotl/releases/latest/download/Equilotl.MacOS.zip",
                prioritize: true,
            },
        ],
        isCurrent: isMac(),
    },
]

const BrowserPlatforms: Platform[] = [
    {
        title: "Firefox",
        icon: faFirefox,
        downloads: [
            {
                text: "Extension",
                href: "https://addons.mozilla.org/en-US/firefox/addon/equicord-web/",
                prioritize: true,
            },
            {
                text: "Zip",
                href: "https://github.com/Equicord/Equicord/releases/download/latest/extension-firefox.zip",
                note: "Requires Firefox Developer Edition",
            },
        ],
        isCurrent: false,
    },
    {
        title: "Chrome",
        icon: faChrome,
        downloads: [
            {
                text: "Extension",
                href: "https://chromewebstore.google.com/detail/equicord-web/mcambpfmpjnncfoodejdmehedbkjepmi",
                prioritize: true,
            },
            {
                text: "Zip",
                href: "https://github.com/Equicord/Equicord/releases/download/latest/extension-chrome.zip",
            },
        ],
        isCurrent: isChromeOS(),
    },
    {
        title: "Edge",
        icon: faEdge,
        downloads: [
            {
                text: "Extension",
                href: "https://microsoftedge.microsoft.com/addons/detail/equicord-web/nelknkpngcgdndlgikhfmldidjdjljgd",
                prioritize: true,
            },
            {
                text: "Zip",
                href: "https://github.com/Equicord/Equicord/releases/download/latest/extension-chrome.zip",
            },
        ],
        isCurrent: false,
    },
]

const getEquibopPlatforms = (version: string): Platform[] => [
    {
        title: "Windows",
        icon: faWindows,
        downloads: [
            {
                text: "x64",
                href: `https://github.com/Equicord/Equibop/releases/download/v${version}/Equibop-Setup-${version}.exe`,
                prioritize: true,
            },
            {
                text: "ARM64",
                href: `https://github.com/Equicord/Equibop/releases/download/v${version}/Equibop-${version}-arm64-win.zip`,
            },
        ],
        isCurrent: isWindows(),
    },
    {
        title: "Linux",
        icon: faLinux,
        downloads: [
            {
                text: "x64",
                href: `https://github.com/Equicord/Equibop/releases/download/v${version}/Equibop-${version}.AppImage`,
                prioritize: true,
            },
            {
                text: "ARM64",
                href: `https://github.com/Equicord/Equibop/releases/download/v${version}/Equibop-${version}-arm64.AppImage`,
            },
            {
                text: "AUR",
                href: "https://aur.archlinux.org/packages?O=0&K=equibop",
            },
            {
                text: "Flathub",
                href: "https://flathub.org/apps/io.github.equicord.equibop",
            },
        ],
        isCurrent: isLinux(),
    },
    {
        title: "MacOS",
        icon: faApple,
        downloads: [
            {
                text: "Universal",
                href: `https://github.com/Equicord/Equibop/releases/download/v${version}/Equibop-${version}-universal.dmg`,
                prioritize: true,
                note: "Intel & Apple Silicon",
            },
        ],
        isCurrent: isMac(),
        warning: "Currently not signed due to financial reasons.",
    },
]

const EquidroidPlatforms: Platform[] = [
    {
        title: "Android",
        icon: faAndroid,
        downloads: [
            {
                text: "Equidroid",
                href: "https://github.com/Equicord/Equidroid/releases",
                note: "Not recommended for actual use",
                prioritize: true,
            },
            {
                text: "VendroidEnhanced",
                href: "https://vendroid.nin0.dev",
                note: "If you still want an experience like Equidroid but better use this",
            },
        ],
        isCurrent: isAndroid(),
        subtext: "Alternatives to Equidroid",
        subsection: [
            {
                text: "Kettu",
                href: "https://github.com/C0C0B01/KettuManager/releases",
                note: "Built on the React Native Revision",
            },
            {
                text: "Revenge",
                href: "https://github.com/revenge-mod/revenge-manager/releases",
                note: "Built on the React Native Revision",
            },
            {
                text: "Aliucord",
                href: "https://github.com/Aliucord/Manager/releases",
                note: "Built on the Kotlin Revision",
            },
        ],
    },
    {
        title: "IOS",
        icon: faApple,
        downloads: [
            {
                text: "None Currently",
                href: "",
            },
        ],
        isCurrent: isIOS(),
        subtext: "Alternatives for IOS",
        subsection: [
            {
                text: "BTLoader",
                href: "https://github.com/CloudySn0w/BTLoader/releases",
                note: "Use if Non-Jailbroken",
            },
            {
                text: "Kettu",
                href: "https://github.com/C0C0B01/KettuTweak/releases",
                note: "Use if Jailbroken",
            },
        ],
    },
]

const OtherOfferings = [
    {
        name: "NixOS - Equicord",
        href: "https://search.nixos.org/packages?channel=unstable&show=equicord&from=0&size=50&sort=relevance&type=packages&query=Equicord",
    },
    {
        name: "NixOS - Equibop",
        href: "https://search.nixos.org/packages?channel=unstable&show=equibop&from=0&size=50&sort=relevance&type=packages&query=Equibop",
    },
    {
        name: "Legcord",
        href: "https://github.com/Legcord/Legcord",
    },
    {
        name: "Goofcord",
        href: "https://github.com/Milkshiift/GoofCord",
    },
    {
        name: "Dorion",
        href: "https://github.com/SpikeHD/Dorion",
    },
    {
        name: "Shelter",
        href: "https://shelter.uwu.network",
    },
]

const getSections = (version: string): Section[] => [
    {
        title: "Equicord",
        description:
            "An enhanced version of Vencord with more of 100+ extra plugins.",
        githubUrl: "https://github.com/Equicord/Equicord",
        platforms: EquicordPlatforms,
    },
    {
        title: "Browser Extensions",
        description:
            "Equicord won't be providing support for extensions whether official sources or sideloaded.",
        githubUrl: "",
        platforms: BrowserPlatforms,
        globalWarning:
            "Safari not supported (Apple restrictions). Opera may work via sideloading but is not officially supported.",
    },
    {
        title: "Equibop",
        description:
            "A Vesktop fork aiming to give you a snappier Discord experience with additional plugins, custom splashes, and extra features.",
        githubUrl: "https://github.com/Equicord/Equibop",
        platforms: getEquibopPlatforms(version),
    },
    {
        title: "Equidroid",
        description:
            "An enhanced version of Vendroid with more of 100+ extra plugins.",
        githubUrl: "https://github.com/Equicord/Equidroid",
        platforms: EquidroidPlatforms,
        globalWarning:
            "iOS isn't supported and unlikely to ever be supported. Please don't actually use Equidroid - use Kettu, Revenge, or Aliucord instead. Due to current limitations, we cannot provide support for Equidroid.",
    },
]

export async function fetchEquibopVersion() {
    const now = Date.now()

    if (now - lastFetch < CacheTTL.HOUR) return cachedVersion

    try {
        const res = await fetch(VERSION_URL)
        if (!res.ok) throw new Error("Fetch failed")

        cachedVersion = (await res.text()).trim()
        lastFetch = now
    } catch (err) {
        console.error("Version fetch failed:", err)
    }

    return cachedVersion
}

export default function Download() {
    const [version] = createResource(fetchEquibopVersion)

    return (
        <PageBootstrap
            meta={{ title: "Download" }}
            icon={<DownloadIcon />}
            fullWidth
            title="Download"
            description="Here are your download options."
        >
            <div class="flex flex-col gap-12">
                {version() &&
                    getSections(version()!).map((section) => (
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
                                            "flex-1 xs:min-w-80 flex flex-col justify-between gap-4 py-6 px-6 rounded-xl border border-neutral-800",
                                            platform.isCurrent
                                                ? "bg-gradient-to-tl from-neutral-900 to-green-950"
                                                : "bg-gradient-to-br from-neutral-900 to-neutral-950",
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
                                                        <MonitorCheck
                                                            size={14}
                                                        />
                                                        For your device
                                                    </span>
                                                )}
                                            </div>

                                            {platform.warning && (
                                                <div class="flex items-start gap-2 px-3 py-2 rounded-lg bg-yellow-950/30 border border-yellow-900/50 text-yellow-200 text-xs">
                                                    <AlertCircle
                                                        size={12}
                                                        class="mt-0.5 flex-shrink-0"
                                                    />
                                                    <span>
                                                        {platform.warning}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div class="inline-flex items-start flex-wrap gap-3">
                                            {platform.downloads.map(
                                                (download) => (
                                                    <div class="flex-1 flex flex-col gap-1.5">
                                                        {download.href ? (
                                                            <a
                                                                href={
                                                                    download.href
                                                                }
                                                                target="_blank"
                                                                class="w-full"
                                                            >
                                                                <Button
                                                                    variant={
                                                                        platform.isCurrent &&
                                                                        download.prioritize
                                                                            ? "primary"
                                                                            : "secondary"
                                                                    }
                                                                    class="w-full"
                                                                    icon={
                                                                        <DownloadIcon
                                                                            size={
                                                                                14
                                                                            }
                                                                        />
                                                                    }
                                                                >
                                                                    {
                                                                        download.text
                                                                    }
                                                                </Button>
                                                            </a>
                                                        ) : (
                                                            <Button
                                                                variant="secondary"
                                                                class="w-full cursor-not-allowed opacity-60"
                                                                disabled
                                                            >
                                                                {download.text}
                                                            </Button>
                                                        )}

                                                        <span class="text-xs text-neutral-500 text-center px-1 min-h-4">
                                                            {download.note ??
                                                                ""}
                                                        </span>
                                                    </div>
                                                ),
                                            )}
                                        </div>

                                        <p class="text-neutral-300 text-sm">
                                            {platform.subtext}
                                        </p>

                                        <div class="inline-flex items-center flex-wrap gap-3">
                                            {platform.subsection?.map(
                                                (download) => (
                                                    <div class="flex-1 flex flex-col gap-1">
                                                        <a
                                                            href={download.href}
                                                            target="_blank"
                                                        >
                                                            <Button
                                                                variant={
                                                                    platform.isCurrent
                                                                        ? download.prioritize
                                                                            ? "primary"
                                                                            : "secondary"
                                                                        : "secondary"
                                                                }
                                                                class="w-full"
                                                                icon={
                                                                    <DownloadIcon
                                                                        size={
                                                                            14
                                                                        }
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
                                                ),
                                            )}
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
                        <div class="flex items-start gap-2 px-4 py-3 rounded-lg bg-yellow-950/30 border border-yellow-900/50 text-yellow-200 text-sm">
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
