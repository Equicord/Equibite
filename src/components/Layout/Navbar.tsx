import { createSignal } from 'solid-js'
import { A, useLocation } from '@solidjs/router'

import Logo from '@/assets/logo.svg'
import Button from '@/components/UI/Button'

import DownloadModal from '@/containers/DownloadModal'

export default function Navbar() {
    const [showModal, setShowModal] = createSignal<boolean>(false)
    const location = useLocation()

    return (
        <header class="z-10 py-12 flex items-center justify-between">
            {showModal() && (
                <DownloadModal onclose={() => setShowModal(false)} />
            )}

            <A href="/">
                <img src={Logo} draggable={false} class="size-10 m-1" />
            </A>

            <div class="flex items-center gap-6">
                <A href={location.pathname === '/plugins' ? '/' : '/plugins'}>
                    {location.pathname === '/plugins' ? 'Home' : 'Plugins'}
                </A>

                <Button
                    style="primary"
                    customClass="!rounded-full text-sm"
                    onclick={() => setShowModal(true)}
                >
                    Download
                </Button>
            </div>
        </header>
    )
}
