import { Title } from '@solidjs/meta'
import { createSignal, For, onMount } from 'solid-js'

interface DisplayImage {
    title: string
    url: string
}

interface FolderImages {
    folder: string
    images: DisplayImage[]
}

function splitCamelCase(str: string): string {
    return str
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([a-zA-Z])(\d)/g, '$1 $2')
        .replace(/(\d)([a-zA-Z])/g, '$1 $2')
}

function capitalizeWords(str: string): string {
    return str
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
}

function capitalizeArtist(str: string): string {
    return str
        .split(/[\s\-]+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
}

function formatTitle(name: string): string {
    const base = name.replace(/\.[^/.]+$/, '')
    const parts = base.split('-')

    if (parts.length === 2) {
        return `${capitalizeWords(splitCamelCase(parts[0]))} by ${capitalizeArtist(parts[1])}`
    }

    return capitalizeWords(splitCamelCase(base))
}

function formatFolderName(name: string): string {
    return capitalizeWords(splitCamelCase(name))
}

async function fetchImagesRecursive(
    apiUrl: string,
    currentFolder = '',
): Promise<FolderImages[]> {
    const res = await fetch(apiUrl)
    if (!res.ok) return []

    const data = await res.json()
    let folders = new Map<string, DisplayImage[]>()

    for (const item of data) {
        if (item.type === 'file' && item.download_url) {
            const title = formatTitle(item.name)

            if (!folders.has(currentFolder)) {
                folders.set(currentFolder, [])
            }

            folders.get(currentFolder)!.push({ title, url: item.download_url })
        } else if (item.type === 'dir') {
            const subFolders = await fetchImagesRecursive(item.url, item.name)
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

export default function Icons() {
    const [folders, setFolders] = createSignal<FolderImages[]>([])

    onMount(async () => {
        const images = await fetchImagesRecursive('https://api.github.com/repos/Equicord/Equibored/contents/images')

        images.sort((a, b) => {
            if (a.folder === 'equicord') return -1
            if (b.folder === 'equicord') return 1
            return a.folder.localeCompare(b.folder)
        })

        setFolders(images)
    })

    return (
        <>
            <Title>Icons | Equicord</Title>

            <div class="max-w-eq-lg mx-auto flex flex-col justify-center gap-12 px-6">
                <For each={folders()}>
                    {({ folder, images }) => (
                        <div class="flex flex-col gap-12">
                            <h2 class="text-center text-xl font-semibold">
                                {formatFolderName(folder)}
                            </h2>

                            <div class="flex flex-wrap justify-center gap-4">
                                <For each={images}>
                                    {({ title, url }) => (
                                        <div class="flex w-full flex-col items-center gap-3 rounded-lg bg-neutral-800 p-4 sm:max-w-[180px]">
                                            <img
                                                src={url}
                                                alt={title}
                                                width={100}
                                                class="cursor-pointer rounded"
                                                onClick={() =>
                                                    window.open(url, '_blank')
                                                }
                                            />
                                            <span class="text-center text-xs font-medium">
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
        </>
    )
}
