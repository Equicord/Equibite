import { createSignal, onMount, For } from 'solid-js'

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

    if (/^hue_\d+$/.test(base)) {
        const num = parseInt(base.split('_')[1], 10)
        return `Hue ${num}`
    }

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
            const isHue = /^hue_\d+\.png$/.test(item.name)
            const title = formatTitle(item.name)
            const folder = isHue ? 'Hue Variations' : currentFolder

            if (!folders.has(folder)) {
                folders.set(folder, [])
            }

            folders.get(folder)!.push({ title, url: item.download_url })
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

    if (folders.has('Hue Variations')) {
        folders.get('Hue Variations')!.sort((a, b) => {
            const aNum = parseInt(a.title.replace('Hue ', ''), 10)
            const bNum = parseInt(b.title.replace('Hue ', ''), 10)
            return aNum - bNum
        })
    }

    return Array.from(folders.entries()).map(([folder, images]) => ({
        folder,
        images,
    }))
}

export default function Icons() {
    const [folders, setFolders] = createSignal<FolderImages[]>([])

    onMount(async () => {
        const images = await fetchImagesRecursive(
            'https://api.github.com/repos/Equicord/Equibored/contents/images',
        )

        images.sort((a, b) => {
            if (a.folder === 'Hue Variations') return 1
            if (b.folder === 'Hue Variations') return -1
            return a.folder.localeCompare(b.folder)
        })

        setFolders(images)
    })

    return (
        <div class="flex flex-col justify-center gap-12">
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
    )
}
