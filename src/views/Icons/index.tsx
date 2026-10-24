"use client";

import PageBootstrap from "@components/PageBootstrap";
import Input from "@components/UI/Input";
import LoadingState from "@components/UI/LoadingState";
import { CacheKeys, CacheTTL, CLIENT_MODS, Urls } from "@constants";
import {
    capitalizeArtist,
    capitalizeWords,
    splitCamelCase,
} from "@utils/formatting";
import classNames from "classnames";
import { ChevronRight, Download, Image as ImageIcon, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import type { DisplayImage, FolderImages } from "@/types";

interface IconEntry {
    name: string;
    artist: string | null;
    file: string;
    url: string;
}

function formatTitle({ name, artist }: IconEntry): string {
    const title = capitalizeWords(splitCamelCase(name));
    return artist ? `${title} by ${capitalizeArtist(artist)}` : title;
}

const FOLDER_DISPLAY_NAMES: Record<string, string> = {
    betterdiscord: "BetterDiscord",
};

function formatFolderName(name: string): string {
    return FOLDER_DISPLAY_NAMES[name] ?? capitalizeWords(splitCamelCase(name));
}

const EQUICORD_FOLDERS = ["equicord", "equibop", "equidocs"];
const PINNED_MODS = ["vencord", "suncord"];

function folderRank(folder: string): number {
    if (folder === "general") return 0;
    if (folder === "equicord") return 1;
    if (PINNED_MODS.includes(folder)) return 3;
    if (CLIENT_MODS.includes(folder)) return 4;
    return 2;
}

function getTopFolder(key: string): string {
    const parts = key.split("/");
    const folder = parts[0] === "clientmods" && parts[1] ? parts[1] : parts[0];
    return EQUICORD_FOLDERS.includes(folder) ? "equicord" : folder;
}

async function fetchImagesRecursiveInternal(
    jsonUrl: string,
): Promise<FolderImages[]> {
    const res = await fetch(jsonUrl);
    if (!res.ok) return [];

    const data: Record<string, IconEntry[]> = await res.json();
    const folders = new Map<string, DisplayImage[]>();

    for (const [key, entries] of Object.entries(data)) {
        const folder = getTopFolder(key);
        if (!folders.has(folder)) folders.set(folder, []);

        folders
            .get(folder)!
            .push(...entries.map(e => ({ title: formatTitle(e), url: e.url })));
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
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = title.replace(/\s+/g, "_") + ".png";
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

function IconCard({ title, url }: { title: string; url: string }) {
    return (
        <div
            className={classNames(
                "group relative flex flex-col items-center gap-3 rounded-xl border border-neutral-800 bg-linear-to-br from-neutral-900 to-neutral-950 p-4",
                "hover:border-neutral-700 hover:shadow-lg hover:shadow-neutral-900/50 transition-all duration-200",
            )}
        >
            <div className="relative w-full aspect-square">
                <Image
                    src={url}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
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
            <span className="text-center text-xs font-medium text-neutral-300 line-clamp-2 w-full">
                {title}
            </span>
        </div>
    );
}

function FolderSection({
    folder,
    images,
    level = 2,
}: FolderImages & { level?: 2 | 3 }) {
    const Heading = level === 2 ? "h2" : "h3";

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
                <Heading
                    className={level === 2 ? "text-2xl font-bold" : "text-xl font-semibold"}
                >
                    {formatFolderName(folder)}
                </Heading>
                <span className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-400 text-sm font-medium">
                    {images.length}
                </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {images.map(({ title, url }) => (
                    <IconCard key={url} title={title} url={url} />
                ))}
            </div>
        </div>
    );
}

export default function Icons() {
    const [folders, setFolders] = useState<FolderImages[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
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
                images: folder.images.filter(img =>
                    img.title.toLowerCase().includes(query),
                ),
            }))
            .filter(folder => folder.images.length > 0);
    }, [folders, searchQuery]);

    const isOtherMod = (folder: string) =>
        CLIENT_MODS.includes(folder) && !PINNED_MODS.includes(folder);
    const mainFolders = filteredFolders.filter(f => !isOtherMod(f.folder));
    const otherModFolders = filteredFolders.filter(f => isOtherMod(f.folder));

    const totalIcons = folders.reduce(
        (acc, folder) => acc + folder.images.length,
        0,
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
                                placeholder="Search icons..."
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

                <LoadingState loading={loading} loadingText="Loading icons">
                    {filteredFolders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <ImageIcon className="text-neutral-600" size={64} />
                            <p className="text-neutral-400">
                                No icons found matching &quot;{searchQuery}
                                &quot;
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-16">
                            {mainFolders.map(({ folder, images }) => (
                                <FolderSection
                                    key={folder}
                                    folder={folder}
                                    images={images}
                                />
                            ))}

                            {otherModFolders.length > 0 && (
                                <details
                                    className="group flex flex-col gap-6"
                                    open={searchQuery !== ""}
                                >
                                    <summary className="flex cursor-pointer select-none items-center gap-3 list-none [&::-webkit-details-marker]:hidden">
                                        <ChevronRight
                                            size={24}
                                            className="text-neutral-400 transition-transform group-open:rotate-90"
                                        />
                                        <h2 className="text-2xl font-bold">
                                            Other Client Mods
                                        </h2>
                                        <span className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-400 text-sm font-medium">
                                            {otherModFolders.length}
                                        </span>
                                    </summary>

                                    <div className="mt-6 flex flex-col gap-10">
                                        {otherModFolders.map(
                                            ({ folder, images }) => (
                                                <FolderSection
                                                    key={folder}
                                                    folder={folder}
                                                    images={images}
                                                    level={3}
                                                />
                                            ),
                                        )}
                                    </div>
                                </details>
                            )}
                        </div>
                    )}
                </LoadingState>
            </div>
        </PageBootstrap>
    );
}
