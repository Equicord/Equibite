"use client";

import PageBootstrap from "@components/PageBootstrap";
import Input from "@components/UI/Input";
import LoadingState from "@components/UI/LoadingState";
import { CacheKeys, CacheTTL, Urls } from "@constants";
import {
    capitalizeArtist,
    capitalizeWords,
    splitCamelCase,
} from "@utils/formatting";
import classNames from "classnames";
import { ChevronRight, Download, Image as ImageIcon, Search } from "lucide-react";
import Image from "next/image";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import type { DisplayImage, FolderImages } from "@/types";

interface IconEntry {
    name: string;
    artist: string | null;
    file: string;
    holiday?: boolean;
}

interface Tab {
    id: string;
    label: string;
    count: number;
}

const MAIN_TAB = "main";
const DESKTOP_TAB = "desktop-mods";
const MOBILE_TAB = "mobile-mods";

const FOLDER_DISPLAY_NAMES: Record<string, string> = {
    betterdiscord: "BetterDiscord",
};

const PRIMARY_GROUPS = ["equicord", "vencord"];
const EQUICORD_KEY_ORDER = ["equicord", "equicord/old", "equibop", "equidocs", "general"];
const MOBILE_VENDETTA_MODS = ["vendetta", "bunny", "kettu", "revenge"];
const MOBILE_OTHER_MODS = ["aliucord", "enmity", "raincord", "valenced"];
const MOBILE_MODS = [...MOBILE_VENDETTA_MODS, ...MOBILE_OTHER_MODS];
const HOLIDAY_PATTERN
    = /christmas|halloween|pride|april\s?fools|valentine|easter|new\s?year|thanksgiving/i;

const GRID_CLASSES
    = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3";

function formatFolderName(name: string): string {
    return FOLDER_DISPLAY_NAMES[name] ?? capitalizeWords(splitCamelCase(name));
}

function folderRank(folder: string): number {
    const index = PRIMARY_GROUPS.indexOf(folder);
    return index === -1 ? PRIMARY_GROUPS.length : index;
}

function getTopFolder(key: string): string {
    const parts = key.split("/");
    return parts[0] === "clientmods" && parts[1] ? parts[1] : "equicord";
}

function keyRank(key: string): number {
    const index = EQUICORD_KEY_ORDER.indexOf(key);
    return index === -1 ? EQUICORD_KEY_ORDER.length : index;
}

async function fetchImagesRecursiveInternal(
    jsonUrl: string,
): Promise<FolderImages[]> {
    const res = await fetch(jsonUrl);
    if (!res.ok) return [];

    const data: Record<string, IconEntry[]> = await res.json();
    const folders = new Map<string, DisplayImage[]>();

    for (const [key, entries] of Object.entries(data).sort(
        ([a], [b]) => keyRank(a) - keyRank(b),
    )) {
        const folder = getTopFolder(key);
        if (!folders.has(folder)) folders.set(folder, []);

        folders.get(folder)!.push(
            ...entries.map(e => ({
                title: capitalizeWords(splitCamelCase(e.name)),
                artist: e.artist ? capitalizeArtist(e.artist) : undefined,
                url: `${Urls.EQUIBORED_RAW_URL}/${e.file}`,
                holiday: e.holiday ?? HOLIDAY_PATTERN.test(e.name),
            })),
        );
    }

    return Array.from(folders.entries()).map(([folder, images]) => ({
        folder,
        images,
    }));
}

async function fetchImagesRecursive(apiUrl: string): Promise<FolderImages[]> {
    try {
        const cached = localStorage.getItem(CacheKeys.ICONS);
        if (cached) {
            const { timestamp, data } = JSON.parse(cached);
            if (Date.now() - timestamp < CacheTTL.SIXHOURS) {
                return data;
            }
        }
    } catch {}

    const data = await fetchImagesRecursiveInternal(apiUrl);

    try {
        localStorage.setItem(
            CacheKeys.ICONS,
            JSON.stringify({ timestamp: Date.now(), data }),
        );
    } catch {}

    return data;
}

const downloadIcon = async (url: string, title: string) => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const extension = url.split(".").pop() ?? "png";
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `${title.replace(/\s+/g, "_")}.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
        toast.success(`Downloaded ${title}`);
    } catch (error) {
        console.error("Failed to download icon:", error);
        toast.error("Failed to download icon");
    }
};

function IconCard({ title, artist, url }: DisplayImage) {
    return (
        <div
            className={classNames(
                "group relative flex flex-col items-center gap-2 rounded-xl border border-neutral-800 bg-linear-to-br from-neutral-900 to-neutral-950 p-3",
                "hover:border-neutral-700 hover:shadow-lg hover:shadow-neutral-900/50 transition-all duration-200",
            )}
        >
            <div className="relative w-full aspect-square">
                <Image
                    src={url}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12vw"
                    className="object-contain rounded-lg cursor-pointer"
                    onClick={() => window.open(url, "_blank")}
                    unoptimized
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-200 rounded-lg flex items-center justify-center">
                    <button
                        onClick={() => downloadIcon(url, title)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                        title="Download icon"
                    >
                        <Download size={20} className="text-white" />
                    </button>
                </div>
            </div>
            <div className="w-full text-center">
                <p className="text-xs font-medium text-neutral-200 line-clamp-2">
                    {title}
                </p>
                {artist && (
                    <p className="text-[11px] text-neutral-500 truncate">
                        by {artist}
                    </p>
                )}
            </div>
        </div>
    );
}

function CountBadge({ count }: { count: number }) {
    return (
        <span className="px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-400 text-sm font-medium">
            {count}
        </span>
    );
}

function HolidaysToggle({
    count,
    forceOpen,
    children,
}: {
    count: number;
    forceOpen: boolean;
    children: ReactNode;
}) {
    const [open, setOpen] = useState(true);
    const isOpen = open || forceOpen;

    return (
        <div className="flex flex-col gap-4">
            <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(!isOpen)}
                className="flex w-fit cursor-pointer items-center gap-3 text-left"
            >
                <ChevronRight
                    size={20}
                    className={classNames(
                        "text-neutral-400 transition-transform",
                        isOpen && "rotate-90",
                    )}
                />
                <h3 className="text-lg font-semibold">Holidays</h3>
                <CountBadge count={count} />
            </button>
            {isOpen && children}
        </div>
    );
}

function FolderSection({
    folder,
    images,
    heading,
    forceOpen,
}: FolderImages & { heading?: "h2" | "h3"; forceOpen: boolean }) {
    const Heading = heading;
    const regular = images.filter(i => !i.holiday);
    const holidays = images.filter(i => i.holiday);

    return (
        <section className="flex flex-col gap-6">
            {Heading && (
                <div className="flex items-center gap-3">
                    <Heading
                        className={Heading === "h2" ? "text-2xl font-bold" : "text-xl font-semibold"}
                    >
                        {formatFolderName(folder)}
                    </Heading>
                    <CountBadge count={images.length} />
                </div>
            )}

            {regular.length > 0 && (
                <div className={GRID_CLASSES}>
                    {regular.map(image => (
                        <IconCard key={image.url} {...image} />
                    ))}
                </div>
            )}

            {holidays.length > 0 && (
                <HolidaysToggle count={holidays.length} forceOpen={forceOpen}>
                    <div className={GRID_CLASSES}>
                        {holidays.map(image => (
                            <IconCard key={image.url} {...image} />
                        ))}
                    </div>
                </HolidaysToggle>
            )}
        </section>
    );
}

export default function Icons() {
    const [folders, setFolders] = useState<FolderImages[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchImagesRecursive(Urls.ICONS_JSON_URL).then(images => {
            images.sort(
                (a, b) =>
                    folderRank(a.folder) - folderRank(b.folder)
                    || a.folder.localeCompare(b.folder),
            );

            setFolders(images);
            setLoading(false);
        });
    }, []);

    const filteredFolders = useMemo(() => {
        const query = searchQuery.toLowerCase();
        if (!query) return folders;

        return folders
            .map(folder => ({
                ...folder,
                images: folder.images.filter(
                    img =>
                        img.title.toLowerCase().includes(query)
                        || img.artist?.toLowerCase().includes(query),
                ),
            }))
            .filter(folder => folder.images.length > 0);
    }, [folders, searchQuery]);

    const isOtherMod = (folder: string) => !PRIMARY_GROUPS.includes(folder);
    const mainFolders = filteredFolders.filter(f => !isOtherMod(f.folder));
    const desktopModFolders = filteredFolders.filter(
        f => !PRIMARY_GROUPS.includes(f.folder) && !MOBILE_MODS.includes(f.folder),
    );
    const mobileModFolders = filteredFolders.filter(f =>
        MOBILE_MODS.includes(f.folder),
    );
    const vendettaModFolders = mobileModFolders
        .filter(f => MOBILE_VENDETTA_MODS.includes(f.folder))
        .sort(
            (a, b) =>
                MOBILE_VENDETTA_MODS.indexOf(a.folder)
                - MOBILE_VENDETTA_MODS.indexOf(b.folder),
        );
    const otherMobileModFolders = mobileModFolders
        .filter(f => !MOBILE_VENDETTA_MODS.includes(f.folder))
        .sort(
            (a, b) =>
                MOBILE_OTHER_MODS.indexOf(a.folder)
                - MOBILE_OTHER_MODS.indexOf(b.folder),
        );
    const searching = searchQuery !== "";

    const tabs: Tab[] = [
        ...(mainFolders.length > 0
            ? [{
                id: MAIN_TAB,
                label: "Equicord & Vencord",
                count: mainFolders.reduce((acc, f) => acc + f.images.length, 0),
            }]
            : []),
        ...(desktopModFolders.length > 0
            ? [{
                id: DESKTOP_TAB,
                label: "Desktop Mods",
                count: desktopModFolders.reduce((acc, f) => acc + f.images.length, 0),
            }]
            : []),
        ...(mobileModFolders.length > 0
            ? [{
                id: MOBILE_TAB,
                label: "Mobile Mods",
                count: mobileModFolders.reduce((acc, f) => acc + f.images.length, 0),
            }]
            : []),
    ];
    const currentTab = tabs.find(t => t.id === activeTab) ?? tabs[0];

    const totalIcons = folders.reduce(
        (acc, folder) => acc + folder.images.length,
        0,
    );

    const renderDesktopSections = () => (
        <div className="flex flex-col gap-12">
            {desktopModFolders.map(({ folder, images }) => (
                <FolderSection
                    key={folder}
                    folder={folder}
                    images={images}
                    heading="h3"
                    forceOpen={searching}
                />
            ))}
        </div>
    );

    const renderMobileSections = () => (
        <div className="flex flex-col gap-12">
            {vendettaModFolders.length > 0 && (
                <div className="flex flex-col gap-6">
                    <h2 className="text-2xl font-bold">Vendetta-Based</h2>
                    <div className="flex flex-col gap-10">
                        {vendettaModFolders.map(({ folder, images }) => (
                            <FolderSection
                                key={folder}
                                folder={folder}
                                images={images}
                                heading="h3"
                                forceOpen={searching}
                            />
                        ))}
                    </div>
                </div>
            )}
            {otherMobileModFolders.length > 0 && (
                <div className="flex flex-col gap-6">
                    <h2 className="text-2xl font-bold">Other Mobile Mods</h2>
                    <div className="flex flex-col gap-10">
                        {otherMobileModFolders.map(({ folder, images }) => (
                            <FolderSection
                                key={folder}
                                folder={folder}
                                images={images}
                                heading="h3"
                                forceOpen={searching}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <PageBootstrap
            meta={{ title: "Icons" }}
            icon={<ImageIcon />}
            fullWidth
            title="Icon Gallery"
            description="Browse and download custom Discord icons for Equicord"
        >
            <div className="flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1 max-w-md w-full">
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                                size={18}
                            />
                            <Input
                                type="text"
                                placeholder="Search icons or artists..."
                                value={searchQuery}
                                onInput={e =>
                                    setSearchQuery(
                                        (e.target as HTMLInputElement).value,
                                    )
                                }
                                className="pl-10 w-full"
                            />
                        </div>
                    </div>
                    {!loading && (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800/50 border border-neutral-700">
                            <ImageIcon size={16} className="text-neutral-400" />
                            <span className="text-sm text-neutral-300">
                                {totalIcons} icons available
                            </span>
                        </div>
                    )}
                </div>

                {!loading && !searching && tabs.length > 1 && (
                    <div
                        role="tablist"
                        aria-label="Icon groups"
                        className="flex flex-wrap gap-2"
                    >
                        {tabs.map(tab => {
                            const selected = tab.id === currentTab?.id;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={selected}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={classNames(
                                        "flex cursor-pointer items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                                        selected
                                            ? "border-neutral-600 bg-neutral-800 text-neutral-100"
                                            : "border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200",
                                    )}
                                >
                                    {tab.label}
                                    <span className="text-xs text-neutral-500">
                                        {tab.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}

                <LoadingState loading={loading} loadingText="Loading icons">
                    {filteredFolders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <ImageIcon className="text-neutral-600" size={64} />
                            <p className="text-neutral-400">
                                No icons found matching &quot;{searchQuery}
                                &quot;
                            </p>
                        </div>
                    ) : searching ? (
                        <div className="flex flex-col gap-14">
                            {mainFolders.length > 0 && (
                                <div className="flex flex-col gap-14">
                                    {mainFolders.map(({ folder, images }) => (
                                        <FolderSection
                                            key={folder}
                                            folder={folder}
                                            images={images}
                                            heading="h2"
                                            forceOpen
                                        />
                                    ))}
                                </div>
                            )}
                            {desktopModFolders.length > 0 && (
                                <div className="flex flex-col gap-8">
                                    <h2 className="text-2xl font-bold">
                                        Desktop Mods
                                    </h2>
                                    {renderDesktopSections()}
                                </div>
                            )}
                            {mobileModFolders.length > 0 && (
                                <div className="flex flex-col gap-8">
                                    <h2 className="text-2xl font-bold">
                                        Mobile Mods
                                    </h2>
                                    {renderMobileSections()}
                                </div>
                            )}
                        </div>
                    ) : currentTab?.id === DESKTOP_TAB ? (
                        renderDesktopSections()
                    ) : currentTab?.id === MOBILE_TAB ? (
                        renderMobileSections()
                    ) : (
                        <div className="flex flex-col gap-14">
                            {mainFolders.map(({ folder, images }) => (
                                <FolderSection
                                    key={folder}
                                    folder={folder}
                                    images={images}
                                    heading="h2"
                                    forceOpen={false}
                                />
                            ))}
                        </div>
                    )}
                </LoadingState>
            </div>
        </PageBootstrap>
    );
}
