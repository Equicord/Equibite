import { createSignal, Show } from 'solid-js'
import { A, useLocation } from '@solidjs/router'

import Fa from 'solid-fa'
import { faClose, faBars, faDownload } from '@fortawesome/free-solid-svg-icons'

import Logo from '@assets/logo.svg'
import Button from '@components/UI/Button'

import DownloadModal from '@containers/DownloadModal'

export default function Navbar() {
    const [showModal, setShowModal] = createSignal<boolean>(false)
    const [showMenu, setShowMenu] = createSignal<boolean>(false)

    const location = useLocation()
    const toggleMenu = () => {
        const next = !showMenu()
        setShowMenu(next)

        window.scrollTo(0, 0)

        if (typeof document !== 'undefined') {
            document.body.style.overflowY = next ? 'hidden' : 'auto'
        }
    }

    return (
        <>
            <Show when={showMenu()}>
                <div
                    onclick={toggleMenu}
                    class="fixed inset-0 z-10 h-dvh w-full bg-neutral-900/50 backdrop-blur-md py-12 pl-6"
                >
                    <div
                        // onclick={(e) => e.stopPropagation()}
                        class="flex flex-col gap-4 text-lg"
                    >
                        <A
                            href="https://docs.equicord.org"
                            target="_blank"
                            class="hover:text-gray-300 transition-colors"
                        >
                            Docs
                        </A>
                        <A
                            href={
                                location.pathname === '/plugins'
                                    ? '/'
                                    : '/plugins'
                            }
                            class="hover:text-gray-300 transition-colors"
                        >
                            {location.pathname === '/plugins'
                                ? 'Home'
                                : 'Plugins'}
                        </A>
                        <A
                            href={location.pathname === '/team' ? '/' : '/team'}
                            class="hover:text-gray-300 transition-colors"
                        >
                            {location.pathname === '/team' ? 'Home' : 'Team'}
                        </A>
                        <A
                            href={
                                location.pathname === '/icons' ? '/' : '/icons'
                            }
                            class="hover:text-gray-300 transition-colors"
                        >
                            {location.pathname === '/icons' ? 'Home' : 'Icons'}
                        </A>
                        <A
                            href={
                                location.pathname === '/colorgen'
                                    ? '/'
                                    : '/colorgen'
                            }
                            class="hover:text-gray-300 transition-colors"
                        >
                            {location.pathname === '/colorgen'
                                ? 'Home'
                                : 'Color Gen'}
                        </A>
                    </div>
                </div>
            </Show>

            <header class="z-10 py-12 flex items-center justify-between">
                <Show when={showModal()}>
                    <DownloadModal onclose={() => setShowModal(false)} />
                </Show>

                <A href="/">
                    <img
                        alt="Equicord-Logo"
                        src={Logo}
                        draggable={false}
                        class="size-11 m-1 user-select-none transition-transform duration-500 hover:rotate-180 hover:scale-110"
                    />
                </A>

                <div class="hidden md:flex items-center gap-6">
                    <A
                        href="https://docs.equicord.org"
                        target="_blank"
                        class="hover:text-gray-300 transition-colors"
                    >
                        Docs
                    </A>
                    <A
                        href={
                            location.pathname === '/plugins' ? '/' : '/plugins'
                        }
                        class="hover:text-gray-300 transition-colors"
                    >
                        {location.pathname === '/plugins' ? 'Home' : 'Plugins'}
                    </A>
                    <A
                        href={location.pathname === '/team' ? '/' : '/team'}
                        class="hover:text-gray-300 transition-colors"
                    >
                        {location.pathname === '/team' ? 'Home' : 'Team'}
                    </A>
                    <A
                        href={location.pathname === '/icons' ? '/' : '/icons'}
                        class="hover:text-gray-300 transition-colors"
                    >
                        {location.pathname === '/icons' ? 'Home' : 'Icons'}
                    </A>
                    <A
                        href={
                            location.pathname === '/colorgen'
                                ? '/'
                                : '/colorgen'
                        }
                        class="hover:text-gray-300 transition-colors"
                    >
                        {location.pathname === '/colorgen'
                            ? 'Home'
                            : 'Color Gen'}
                    </A>

                    <Button
                        style="primary"
                        customClass="!rounded-full text-sm"
                        onclick={() => setShowModal(true)}
                    >
                        Download
                    </Button>
                </div>

                <div class="md:hidden flex items-center gap-2 z-20">
                    <button
                        class="size-12 flex justify-center items-center bg-neutral-800 rounded-lg"
                        onclick={() => setShowModal(true)}
                    >
                        <Fa icon={faDownload} />
                    </button>

                    <button
                        class="size-12 flex justify-center items-center bg-neutral-800 rounded-lg"
                        onclick={toggleMenu}
                    >
                        <Fa icon={showMenu() ? faClose : faBars} />
                    </button>
                </div>
            </header>
        </>
    )
}
