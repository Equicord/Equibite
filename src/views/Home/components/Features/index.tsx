import { createResource, createMemo, For } from 'solid-js'
import Card from '@components/UI/Card'

import {
    type IconDefinition,
    faPuzzlePiece,
    faCheck,
    faLock,
    faCloud,
    faUsers,
} from '@fortawesome/free-solid-svg-icons'

interface Feature {
    // Icon
    icon: IconDefinition
    // Title
    title: string
    // Excerpt
    excerpt: string
}

async function fetchStarCount(): Promise<number | null> {
    const res = await fetch("https://api.github.com/repos/Equicord/Equicord")
    if (!res.ok) return null
    const data = await res.json()
    return data.stargazers_count ?? null
}

function roundedStarText(stars: number | null): string {
    if (stars == null) return '...'
    const rounded = Math.floor(stars / 50) * 50
    return `more than ${rounded}`
}

export default function HomeFeatures() {
    const [stars] = createResource(fetchStarCount)

    const features = createMemo<Feature[]>(() => [
        {
            icon: faPuzzlePiece,
            title: 'Third-party Plugins',
            excerpt:
                'Access a wide variety of plugins, including 150+ plugins alongside the existing ones in Vencord.',
        },
        {
            icon: faCheck,
            title: 'Trusted by Many',
            excerpt:
                `Trusted by many users with public source code available for viewing, garnering ${roundedStarText(stars() ?? null)} stars on GitHub.`,
        },
        {
            icon: faLock,
            title: 'Actively Maintained',
            excerpt:
                'Active maintenance ensures every plugin remains safe and compatible with any Discord changes.',
        },
        {
            icon: faCloud,
            title: 'Cloud Based',
            excerpt:
                'Sync your settings anytime with our dedicated Vencord cloud instance for seamless experience across devices.',
        },
        {
            icon: faUsers,
            title: 'Community Support',
            excerpt:
                'Most submitted plugins are accepted, with plugin requests actively handled to continuously expand the collection.',
        },
    ])

    return (
        <div class="flex flex-wrap justify-center gap-4">
            <For each={features()}>
                {(item) => (
                    <Card
                        icon={item.icon}
                        title={item.title}
                        excerpt={item.excerpt}
                        class="w-full md:w-[calc(33.33%-1rem)]"
                    />
                )}
            </For>
        </div>
    )
}
