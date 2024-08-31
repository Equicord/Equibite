import Feature from '~/components/Feature'
import {
    faPuzzlePiece,
    faCheck,
    faLock,
} from '@fortawesome/free-solid-svg-icons'

const Features = [
    {
        icon: faPuzzlePiece,
        title: 'Third-party Plugins',
        excerpt:
            'Equicord offers an additional 120 plugins alongside the existing ones in Vencord.',
    },
    {
        icon: faCheck,
        title: 'Trusted by Many',
        excerpt:
            'Equicord is trusted by many users. Our source code is public and available for viewing, with over 100 stars on GitHub.',
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
        <div class="mt-24 flex justify-between gap-8 max-md:flex-col">
            {Features.map((item) => (
                <Feature {...item} />
            ))}
        </div>
    )
}
