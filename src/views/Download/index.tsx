"use client";

import PageBootstrap from "@components/PageBootstrap";
import Button from "@components/UI/Button";
import {
    faAndroid,
    faApple,
    faChrome,
    faEdge,
    faFirefox,
    faLinux,
    faWindows,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    detectArch,
    isAndroid,
    isChromeOS,
    isIOS,
    isLinux,
    isMac,
    isWindows,
} from "@utils/navigator";
import classNames from "classnames";
import { AlertCircle, DownloadIcon, MonitorCheck, Package } from "lucide-react";
import { useEffect, useState } from "react";

import type { Arch, DisplayServer, Platform, Section } from "@/types";
import { fetchEquibopVersion } from "@/utils";

const EquicordPlatforms: Platform[] = [
    {
        title: "Windows",
        icon: faWindows,
        downloads: [
            {
                text: "GUI",
                href: "https://github.com/Equicord/Equilotl/releases/latest/download/Equilotl.exe",
                arch: "x64",
                prioritize: true,
            },
            {
                text: "GUI",
                href: "https://github.com/Equicord/Equilotl/releases/latest/download/Equilotl-arm64.exe",
                arch: "arm64",
                prioritize: true,
            },
            {
                text: "CLI",
                href: "https://github.com/Equicord/Equilotl/releases/latest/download/EquilotlCli.exe",
                arch: "x64",
            },
            {
                text: "CLI",
                href: "https://github.com/Equicord/Equilotl/releases/latest/download/EquilotlCli-arm64.exe",
                arch: "arm64",
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
                href: "https://github.com/Equicord/Equilotl/releases/latest/download/Equilotl",
                arch: "x64",
                display: "combined",
                prioritize: true,
            },
            {
                text: "GUI",
                href: "https://github.com/Equicord/Equilotl/releases/latest/download/Equilotl-x11",
                arch: "x64",
                display: "x11",
                prioritize: true,
            },
            {
                text: "GUI",
                href: "https://github.com/Equicord/Equilotl/releases/latest/download/Equilotl-wayland",
                arch: "x64",
                display: "wayland",
                prioritize: true,
            },
            {
                text: "CLI",
                href: "https://github.com/Equicord/Equilotl/releases/latest/download/EquilotlCli-linux",
                arch: "x64",
            },
            {
                text: "GUI",
                href: "https://github.com/Equicord/Equilotl/releases/latest/download/Equilotl-arm64",
                arch: "arm64",
                display: "combined",
                prioritize: true,
            },
            {
                text: "GUI",
                href: "https://github.com/Equicord/Equilotl/releases/latest/download/Equilotl-x11-arm64",
                arch: "arm64",
                display: "x11",
                prioritize: true,
            },
            {
                text: "GUI",
                href: "https://github.com/Equicord/Equilotl/releases/latest/download/Equilotl-wayland-arm64",
                arch: "arm64",
                display: "wayland",
                prioritize: true,
            },
            {
                text: "CLI",
                href: "https://github.com/Equicord/Equilotl/releases/latest/download/EquilotlCli-linux-arm64",
                arch: "arm64",
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
                href: "https://github.com/Equicord/Equilotl/releases/latest/download/Equilotl.dmg",
                arch: "universal",
                prioritize: true,
            },
            {
                text: "GUI",
                href: "https://github.com/Equicord/Equilotl/releases/latest/download/Equilotl-arm64.dmg",
                arch: "arm64",
                prioritize: true,
            },
            {
                text: "GUI",
                href: "https://github.com/Equicord/Equilotl/releases/latest/download/Equilotl-x64.dmg",
                arch: "x64",
                prioritize: true,
            },
            {
                text: "CLI",
                href: "https://github.com/Equicord/Equilotl/releases/latest/download/EquilotlCli-universal",
                arch: "universal",
            },
            {
                text: "CLI",
                href: "https://github.com/Equicord/Equilotl/releases/latest/download/EquilotlCli-arm64",
                arch: "arm64",
            },
            {
                text: "CLI",
                href: "https://github.com/Equicord/Equilotl/releases/latest/download/EquilotlCli-x64",
                arch: "x64",
            },
        ],
        warning: "The CLIs must be made executable first: chmod +x <file>",
        isCurrent: isMac(),
    },
];

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
];

const getEquibopPlatforms = (version: string): Platform[] => [
    {
        title: "Windows",
        icon: faWindows,
        downloads: [
            {
                text: "x64",
                href: `https://github.com/Equicord/Equibop/releases/download/v${version}/Equibop-Setup-${version}.exe`,
                arch: "x64",
                prioritize: true,
            },
            {
                text: "ARM64",
                href: `https://github.com/Equicord/Equibop/releases/download/v${version}/Equibop-${version}-arm64-win.zip`,
                arch: "arm64",
                prioritize: true,
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
                arch: "x64",
                prioritize: true,
            },
            {
                text: "ARM64",
                href: `https://github.com/Equicord/Equibop/releases/download/v${version}/Equibop-${version}-arm64.AppImage`,
                arch: "arm64",
                prioritize: true,
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
            },
        ],
        isCurrent: isMac(),
    },
];

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
                text: "Kettu",
                href: "https://github.com/C0C0B01/KettuTweak/releases",
            },
        ],
    },
];

const OtherOfferings = [
    {
        name: "NixOS - Equicord",
        href: "https://search.nixos.org/packages?channel=unstable&show=equicord&from=0&size=50&sort=relevance&type=packages&query=Equicord",
    },
    {
        name: "NixOS - Equibop",
        href: "https://search.nixos.org/packages?channel=unstable&show=equibop&from=0&size=50&sort=relevance&type=packages&query=Equibop",
    },
    { name: "Legcord", href: "https://github.com/Legcord/Legcord" },
    { name: "Goofcord", href: "https://github.com/Milkshiift/GoofCord" },
    { name: "Dorion", href: "https://github.com/SpikeHD/Dorion" },
    { name: "Shelter", href: "https://shelter.uwu.network" },
];

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
];

const DISPLAYS: { value: DisplayServer, label: string; }[] = [
    { value: "combined", label: "Combined" },
    { value: "x11", label: "X11" },
    { value: "wayland", label: "Wayland" },
];

function SegmentedControl<T extends string>({
    options,
    value,
    onChange,
}: {
    options: { value: T, label: string; }[];
    value: T;
    onChange: (value: T) => void;
}) {
    return (
        <div className="w-full grid grid-flow-col auto-cols-fr gap-1 p-1 rounded-xl border border-neutral-800 bg-neutral-950/60">
            {options.map(option => (
                <button
                    key={option.value}
                    type="button"
                    aria-pressed={value === option.value}
                    onClick={() => onChange(option.value)}
                    className={classNames(
                        "py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer",
                        value === option.value
                            ? "bg-neutral-800 text-neutral-100"
                            : "text-neutral-500 hover:text-neutral-300",
                    )}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}

const ARCHES: { value: Arch, label: string; }[] = [
    { value: "universal", label: "Universal" },
    { value: "x64", label: "x64" },
    { value: "arm64", label: "ARM64" },
];

export default function Download() {
    const [version, setVersion] = useState<string | null>(null);
    const [detectedArch, setDetectedArch] = useState<Arch>("x64");
    const [archOverrides, setArchOverrides] = useState<Record<string, Arch>>(
        {},
    );
    const [displayOverrides, setDisplayOverrides] = useState<
        Record<string, DisplayServer>
    >({});

    useEffect(() => {
        fetchEquibopVersion().then(setVersion);
        detectArch().then(setDetectedArch);
    }, []);

    const sections = version ? getSections(version) : [];

    return (
        <PageBootstrap
            meta={{ title: "Download" }}
            icon={<DownloadIcon />}
            fullWidth
            title="Download"
            description="Here are your download options."
        >
            <div className="flex flex-col gap-12">
                <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-yellow-950/30 border border-yellow-900/50 text-yellow-200 text-sm">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span>
                        Only download Equicord from the links on this page. We
                        do not own or control the{" "}
                        <code>discord.gg/equicord</code> vanity invite - our
                        official Discord server can only be joined via{" "}
                        <a href="/discord" target="_blank" className="underline">
                            equicord.org/discord
                        </a>.
                    </span>
                </div>

                {sections.map(section => (
                    <div
                        key={section.title}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-bold">
                                    {section.title}
                                </h2>
                                {section.githubUrl && (
                                    <a
                                        href={section.githubUrl}
                                        target="_blank"
                                        className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
                                    >
                                        GitHub →
                                    </a>
                                )}
                            </div>
                            <p className="text-neutral-400 text-sm">
                                {section.description}
                            </p>
                            {section.globalWarning && (
                                <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-yellow-950/30 border border-yellow-900/50 text-yellow-200 text-sm">
                                    <AlertCircle
                                        size={16}
                                        className="mt-0.5 shrink-0"
                                    />
                                    <span>{section.globalWarning}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-stretch flex-wrap gap-6">
                            {section.platforms.map(platform => {
                                const cardKey = `${section.title}-${platform.title}`;
                                const archOptions = ARCHES.filter(({ value }) =>
                                    platform.downloads.some(
                                        download => download.arch === value,
                                    ),
                                );
                                const defaultArch = archOptions.some(
                                    ({ value }) => value === "universal",
                                )
                                    ? "universal"
                                    : detectedArch;
                                const arch = archOverrides[cardKey] ?? defaultArch;
                                const displayOptions = DISPLAYS.filter(
                                    ({ value }) =>
                                        platform.downloads.some(
                                            download =>
                                                download.display === value,
                                        ),
                                );
                                const display
                                    = displayOverrides[cardKey] ?? "combined";

                                return (
                                    <div
                                        key={platform.title}
                                        className="flex-1 xs:min-w-80 flex flex-col justify-between gap-4 py-6 px-6 rounded-xl border border-neutral-800 bg-linear-to-br from-neutral-900 to-neutral-950"
                                    >
                                        <div className="flex flex-col gap-3">
                                            <div className="flex justify-between items-center">
                                                <span className="flex items-center gap-1 font-semibold">
                                                    <FontAwesomeIcon
                                                        icon={platform.icon}
                                                        className="size-4!"
                                                    />
                                                    {platform.title}
                                                </span>

                                                {platform.isCurrent && (
                                                    <span className="flex items-center gap-1 rounded-lg py-2 px-2 bg-linear-to-r from-transparent to-green-900/50 text-green-200 text-sm font-medium">
                                                        <MonitorCheck
                                                            size={14}
                                                        />
                                                        For your device
                                                    </span>
                                                )}
                                            </div>

                                            {platform.warning && (
                                                <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-yellow-950/30 border border-yellow-900/50 text-yellow-200 text-xs">
                                                    <AlertCircle
                                                        size={12}
                                                        className="mt-0.5 shrink-0"
                                                    />
                                                    <span>
                                                        {platform.warning}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="inline-flex items-start flex-wrap gap-3">
                                            {(archOptions.length > 1 || displayOptions.length > 1) && (
                                                <div className="w-full flex flex-col gap-2 mb-3">
                                                    {archOptions.length > 1 && (
                                                        <SegmentedControl
                                                            options={archOptions}
                                                            value={arch}
                                                            onChange={value =>
                                                                setArchOverrides(prev => ({
                                                                    ...prev,
                                                                    [cardKey]: value,
                                                                }))}
                                                        />
                                                    )}

                                                    {displayOptions.length > 1 && (
                                                        <SegmentedControl
                                                            options={displayOptions}
                                                            value={display}
                                                            onChange={value =>
                                                                setDisplayOverrides(prev => ({
                                                                    ...prev,
                                                                    [cardKey]: value,
                                                                }))}
                                                        />
                                                    )}
                                                </div>
                                            )}

                                            {platform.downloads
                                                .filter(
                                                    download =>
                                                        (!download.arch
                                                            || download.arch === arch)
                                                        && (!download.display
                                                            || download.display === display),
                                                )
                                                .map(download => {
                                                    const isRecommended =
                                                        platform.isCurrent &&
                                                        download.prioritize &&
                                                        (!download.arch ||
                                                            download.arch === "universal" ||
                                                            download.arch === detectedArch);

                                                    return (
                                                        <div
                                                            key={
                                                                download.text +
                                                                download.href
                                                            }
                                                            className="flex-1 flex flex-col gap-1.5"
                                                        >
                                                            {download.href ? (
                                                                <a
                                                                    href={
                                                                        download.href
                                                                    }
                                                                    target="_blank"
                                                                    className="w-full"
                                                                >
                                                                    <Button
                                                                        variant={isRecommended ? "primary" : "secondary"}
                                                                        className={classNames(
                                                                            "w-full",
                                                                            isRecommended &&
                                                                            "bg-neutral-300! border-neutral-400/50! hover:enabled:bg-neutral-400!",
                                                                        )}
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
                                                                    className="w-full cursor-not-allowed opacity-60"
                                                                    disabled
                                                                >
                                                                    {download.text}
                                                                </Button>
                                                            )}

                                                            <span className="text-xs text-neutral-500 text-center px-1 min-h-4">
                                                                {download.note ??
                                                                    ""}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                        </div>

                                        <p className="text-neutral-300 text-sm">
                                            {platform.subtext}
                                        </p>

                                        <div className="inline-flex items-center flex-wrap gap-3">
                                            {platform.subsection?.map(
                                                download => (
                                                    <div
                                                        key={download.text}
                                                        className="flex-1 flex flex-col gap-1"
                                                    >
                                                        <a
                                                            href={download.href}
                                                            target="_blank"
                                                        >
                                                            <Button
                                                                variant={
                                                                    platform.isCurrent &&
                                                                        download.prioritize
                                                                        ? "primary"
                                                                        : "secondary"
                                                                }
                                                                className="w-full"
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
                                                            <span className="text-xs text-neutral-400 text-center">
                                                                {download.note}
                                                            </span>
                                                        )}
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Package size={24} />
                            Other Offerings
                        </h2>
                        <p className="text-neutral-400 text-sm">
                            Third-party Discord clients and package managers
                            that support Equicord.
                        </p>
                        <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-yellow-950/30 border border-yellow-900/50 text-yellow-200 text-sm">
                            <AlertCircle
                                size={16}
                                className="mt-0.5 shrink-0"
                            />
                            <span>
                                We may have difficulty offering support for
                                these third-party packages.
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {OtherOfferings.map(offering => (
                            <a
                                key={offering.name}
                                href={offering.href}
                                target="_blank"
                                className="px-4 py-3 rounded-lg border border-neutral-800 bg-linear-to-br from-neutral-900 to-neutral-950 hover:border-neutral-700 transition-colors"
                            >
                                <span className="text-sm font-medium">
                                    {offering.name}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </PageBootstrap>
    );
}
