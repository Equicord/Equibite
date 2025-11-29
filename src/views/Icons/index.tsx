import PageBootstrap from "@components/PageBootstrap"
import Input from "@components/UI/Input"
import LoadingState from "@components/UI/LoadingState"
import classNames from "classnames"
import { Download, Image as ImageIcon, Search } from "lucide-solid"
import { createMemo, createSignal, For, onMount, Show } from "solid-js"

interface DisplayImage {
    title: string
    url: string
}

interface FolderImages {
    folder: string
    images: DisplayImage[]
}

const ICONS_CACHE_KEY = "cachedIcons"
const ICONS_CACHE_TTL = 1000 * 60 * 60 * 6 // 6 hours

function splitCamelCase(str: string): string {
    return str
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/([a-zA-Z])(\d)/g, "$1 $2")
        .replace(/(\d)([a-zA-Z])/g, "$1 $2")
}

function capitalizeWords(str: string): string {
    return str
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
}

function capitalizeArtist(str: string): string {
    return str
        .split(/[\s-]+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
}

function formatTitle(name: string): string {
    const base = name.replace(/\.[^/.]+$/, "")
    const parts = base.split("-")

    if (parts.length === 2) {
        return `${capitalizeWords(splitCamelCase(parts[0]))} by ${capitalizeArtist(parts[1])}`
    }

    return capitalizeWords(splitCamelCase(base))
}

function formatFolderName(name: string): string {
    return capitalizeWords(splitCamelCase(name))
}

async function fetchImagesRecursiveInternal(
    apiUrl: string,
    currentFolder = "",
): Promise<FolderImages[]> {
    const res = await fetch(apiUrl)
    if (!res.ok) return []

    const data = await res.json()
    const folders = new Map<string, DisplayImage[]>()

    for (const item of data) {
        if (item.type === "file" && item.download_url) {
            const title = formatTitle(item.name)

            if (!folders.has(currentFolder)) {
                folders.set(currentFolder, [])
            }

            folders.get(currentFolder)!.push({ title, url: item.download_url })
        } else if (item.type === "dir") {
            const subFolders = await fetchImagesRecursiveInternal(
                item.url,
                item.name,
            )
            subFolders.forEach(({ folder, images }) => {
                if (!folders.has(folder)) {
                    folders.set(folder, [])
                }
                folders.get(folder)!.push(...images)
            })
        }
    }

    return Array.from(folders.entries()).map(([folder, images]) => ({
        folder,
        images,
    }))
}

async function fetchImagesRecursive(apiUrl: string): Promise<FolderImages[]> {
    try {
        const cached = localStorage.getItem(ICONS_CACHE_KEY)
        if (cached) {
            const { timestamp, data } = JSON.parse(cached)
            if (Date.now() - timestamp < ICONS_CACHE_TTL) {
                return data
            }
        }
    } catch {}

    const data = await fetchImagesRecursiveInternal(apiUrl)

    try {
        localStorage.setItem(
            ICONS_CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), data }),
        )
    } catch {}

    return data
}

export default function Icons() {
    const [folders, setFolders] = createSignal<FolderImages[]>([])
    const [searchQuery, setSearchQuery] = createSignal("")
    const [loading, setLoading] = createSignal(true)

    onMount(async () => {
        const images = await fetchImagesRecursive(
            "https://api.github.com/repos/Equicord/Equibored/contents/images",
        )

        images.sort((a, b) => {
            if (a.folder === "equicord") return -1
            if (b.folder === "equicord") return 1
            if (a.folder === "") return 1
            if (b.folder === "") return -1
            return a.folder.localeCompare(b.folder)
        })

        setFolders(images)
        setLoading(false)
    })

    const filteredFolders = createMemo(() => {
        const query = searchQuery().toLowerCase()
        if (!query) return folders()

        return folders()
            .map((folder) => ({
                ...folder,
                images: folder.images.filter((img) =>
                    img.title.toLowerCase().includes(query),
                ),
            }))
            .filter((folder) => folder.images.length > 0)
    })

    const totalIcons = createMemo(() => {
        return folders().reduce((acc, folder) => acc + folder.images.length, 0)
    })

    const downloadIcon = async (url: string, title: string) => {
        try {
            const response = await fetch(url)
            const blob = await response.blob()
            const blobUrl = window.URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = blobUrl
            link.download = title.replace(/\s+/g, "_") + ".png"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(blobUrl)
        } catch (error) {
            console.error("Failed to download icon:", error)
        }
    }

    return (
        <PageBootstrap
            meta={{ title: "Icons" }}
            icon={<ImageIcon />}
            fullWidth
            title="Icon Gallery"
            description="Browse and download custom Discord icons for Equicord"
        >
            <div class="flex flex-col gap-8">
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div class="flex-1 max-w-md w-full">
                        <div class="relative">
                            <Search
                                class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                                size={18}
                            />
                            <Input
                                type="text"
                                placeholder="Search icons..."
                                value={searchQuery()}
                                onInput={(e) =>
                                    setSearchQuery(e.currentTarget.value)
                                }
                                class="pl-10 w-full"
                            />
                        </div>
                    </div>
                    <Show when={!loading()}>
                        <div class="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800/50 border border-neutral-700">
                            <ImageIcon size={16} class="text-neutral-400" />
                            <span class="text-sm text-neutral-300">
                                {totalIcons()} icons available
                            </span>
                        </div>
                    </Show>
                </div>

                <LoadingState loading={loading()} loadingText="Loading icons">
                    <Show when={filteredFolders().length === 0}>
                        <div class="flex flex-col items-center justify-center py-20 gap-4">
                            <ImageIcon class="text-neutral-600" size={64} />
                            <p class="text-neutral-400">
                                No icons found matching "{searchQuery()}"
                            </p>
                        </div>
                    </Show>

                    <Show when={filteredFolders().length > 0}>
                        <div class="flex flex-col gap-16">
                            <For each={filteredFolders()}>
                                {({ folder, images }) => (
                                    <div class="flex flex-col gap-6">
                                        <div class="flex items-center gap-3">
                                            <h2 class="text-2xl font-bold">
                                                {folder === ""
                                                    ? "General"
                                                    : formatFolderName(folder)}
                                            </h2>
                                            <span class="px-3 py-1 rounded-full bg-neutral-800 text-neutral-400 text-sm font-medium">
                                                {images.length}
                                            </span>
                                        </div>

                                        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                            <For each={images}>
                                                {({ title, url }) => (
                                                    <div
                                                        class={classNames(
                                                            "group relative flex flex-col items-center gap-3 rounded-xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-4",
                                                            "hover:border-neutral-700 hover:shadow-lg hover:shadow-neutral-900/50 transition-all duration-200",
                                                        )}
                                                    >
                                                        <div class="relative w-full aspect-square">
                                                            <img
                                                                src={url}
                                                                alt={title}
                                                                class="w-full h-full object-contain rounded-lg cursor-pointer"
                                                                onClick={() =>
                                                                    window.open(
                                                                        url,
                                                                        "_blank",
                                                                    )
                                                                }
                                                            />
                                                            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-200 rounded-lg flex items-center justify-center">
                                                                <button
                                                                    onClick={() =>
                                                                        downloadIcon(
                                                                            url,
                                                                            title,
                                                                        )
                                                                    }
                                                                    class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                                                                    title="Download icon"
                                                                >
                                                                    <Download
                                                                        size={
                                                                            20
                                                                        }
                                                                        class="text-white"
                                                                    />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <span class="text-center text-xs font-medium text-neutral-300 line-clamp-2 w-full">
                                                            {title}
                                                        </span>
                                                    </div>
                                                )}
                                            </For>
                                        </div>
                                    </div>
                                )}
                            </For>
                        </div>
                    </Show>
                </LoadingState>
            </div>
        </PageBootstrap>
    )
}
