import { For } from 'solid-js'
import Card from '@/components/UI/Card'

import {
    type IconDefinition,
    faPuzzlePiece,
    faCheck,
    faLock,
} from '@fortawesome/free-solid-svg-icons'

interface Feature {
    // Icon
    icon: IconDefinition
    // Title
    title: string
    // Excerpt
    excerpt: string
}

const features: Feature[] = [
    {
        icon: faPuzzlePiece,
        title: 'Third-party Plugins',
        excerpt:
            'Equicord offers a big variety of plugins, including 150+ plugins alongside the existing ones in Vencord.',
    },
    {
        icon: faCheck,
        title: 'Trusted by Many',
        excerpt:
            'Equicord is trusted by many users. Our source code is public and available for viewing, with over 400 stars on GitHub.',
    },
    {
        icon: faLock,
        title: 'Actively Maintained',
        excerpt:
            'Equicord is actively maintained, ensuring every plugin is safe and updated to remain compatible with any changes.',
    },
]

export default function HomeFeatures() {
    return (
        <div class="flex justify-between gap-3 max-md:flex-col">
            <For each={features}>
                {(item) => (
                    <Card
                        icon={item.icon}
                        title={item.title}
                        excerpt={item.excerpt}
                    />
                )}
            </For>
        </div>
    )
}
