import { createSignal } from 'solid-js'
import DownloadModal from '@/containers/DownloadModal'

import HomeHero from './components/Hero'
import HomeFeatures from './components/Features'

export default function Home() {
    const [showModal, setShowModal] = createSignal<boolean>(false)

    return (
        <>
            {showModal() && (
                <DownloadModal onclose={() => setShowModal(false)} />
            )}

            <HomeHero ondownload={() => setShowModal(true)} />
            <HomeFeatures />
        </>
    )
}
