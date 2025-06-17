import { createSignal, onMount, For } from 'solid-js'

type DisplayImage = {
    title: string
    url: string
}

type FolderImages = {
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
    if (/^hue_\d+\.(png|gif)$/.test(name)) {
        const num = parseInt(name.match(/^hue_(\d+)\.(png|gif)$/)?.[1] || '', 10)
        return `Hue ${num}`
    } else if (/^[^-]+\-[^.]+\.(png|gif)$/.test(name)) {
        const [part1, part2WithExt] = name.split('-', 2)
        const part2 = part2WithExt.replace(/\.[^/.]+$/, '')
        const formattedPart1 = capitalizeWords(splitCamelCase(part1))
        const formattedPart2 = capitalizeArtist(part2)
        return `${formattedPart1} by ${formattedPart2}`
    } else {
        return capitalizeWords(splitCamelCase(name.replace(/\.[^/.]+$/, '')))
    }
}

function formatFolderName(name: string): string {
    return capitalizeWords(splitCamelCase(name))
}

async function fetchImagesRecursive(apiUrl: string, currentFolder = ''): Promise<FolderImages[]> {
    const res = await fetch(apiUrl)
    if (!res.ok) return []

    const data = await res.json()
    let result: FolderImages[] = []

    for (const item of data) {
        if (item.type === 'file') {
            const isHue = /^hue_\d+\.png$/.test(item.name)
            const title = formatTitle(item.name)
            const folderName = isHue ? 'Hue Variations' : currentFolder

            let folderEntry = result.find((entry) => entry.folder === folderName)
            if (!folderEntry) {
                folderEntry = { folder: folderName, images: [] }
                result.push(folderEntry)
            }

            folderEntry.images.push({ title, url: item.download_url })
        } else if (item.type === 'dir') {
            const subResults = await fetchImagesRecursive(item.url, item.name)
            result = result.concat(subResults)
        }
    }

    result = result.map((entry) => {
        if (entry.folder === 'Hue Variations') {
            entry.images.sort((a, b) => {
                const aNum = parseInt(a.title.replace('Hue ', ''), 10)
                const bNum = parseInt(b.title.replace('Hue ', ''), 10)
                return aNum - bNum
            })
        }
        return entry
    })

    return result
}

export default function Icons() {
    const [folders, setFolders] = createSignal<FolderImages[]>([])

    onMount(async () => {
        const images = await fetchImagesRecursive('https://api.github.com/repos/Equicord/Equibored/contents/images')

        images.sort((a, b) => {
            if (a.folder === 'Hue Variations') return 1;
            if (b.folder === 'Hue Variations') return -1;
            return a.folder.localeCompare(b.folder);
        });


        setFolders(images)
    })


    return (
        <div class="bg-black text-white min-h-screen px-4 py-6">
            <For each={folders()}>
                {(folder) => (
                    <div class="mb-10">
                        <h2 class="text-center text-xl font-semibold mb-4">
                            {formatFolderName(folder.folder)}
                        </h2>
                        <div class="flex flex-wrap justify-center gap-4">
                            <For each={folder.images}>
                                {(img) => (
                                    <div class="text-center flex flex-col items-center">
                                        <span class="block text-sm mb-2">{img.title}</span>
                                        <img
                                            src={img.url}
                                            alt={img.title}
                                            width={100}
                                            class="rounded cursor-pointer"
                                            onClick={() => window.open(img.url, '_blank')}
                                        />

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
