import type { Feature } from './types/feature'
import {
    faPuzzlePiece,
    faLock,
    faCheck,
} from '@fortawesome/free-solid-svg-icons'
import { Urls } from '~/constants'

const NavData: { text: string; href: string }[] = [
    {
        text: 'Plugins',
        href: '/plugins',
    },
    {
        text: 'Discord',
        href: Urls.DISCORD_URL,
    },
    {
        text: 'GitHub',
        href: Urls.GITHUB_URL,
    },
]

const FeatureData: Feature[] = [
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

export { NavData, FeatureData }
