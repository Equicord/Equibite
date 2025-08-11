import { createSignal, Show, onCleanup, onMount } from 'solid-js'
import { A } from '@solidjs/router'
import classNames from 'classnames'

import { Download } from 'lucide-solid'
import Logo from '@assets/logo.svg'
import Button from '@components/UI/Button'

interface NavItem {
    text: string
    href: string
    external?: boolean
}

export default function Navbar() {
    const [showMenu, setShowMenu] = createSignal(false)
    const [isSticky, setIsSticky] = createSignal(false)

    const items: NavItem[] = [
        {
            text: 'Docs',
            href: 'https://docs.equicord.org',
            external: true,
        },
        {
            text: 'Plugins',
            href: '/plugins',
        },
        {
            text: 'Team',
            href: '/team',
        },
        {
            text: 'Icons',
            href: '/icons',
        },
        {
            text: 'Color Gen',
            href: '/colorgen',
        },
    ]

    const toggleMenu = () => {
        const next = !showMenu()
        setShowMenu(next)
        window.scrollTo(0, 0)
        document.body.style.overflowY = next ? 'hidden' : 'auto'
    }

    const handleScroll = () => setIsSticky(window.scrollY > 0)

    // Mounts
    onMount(() => window.addEventListener('scroll', handleScroll))
    onCleanup(() => window.removeEventListener('scroll', handleScroll))

    return (
        <>
            {/* Mobile Overlay */}
            <Show when={showMenu()}>
                <div
                    onclick={toggleMenu}
                    class="fixed inset-0 z-10 h-dvh w-full bg-neutral-900/50 py-12 pl-6 backdrop-blur-md"
                >
                    <div class="flex flex-col gap-4 text-lg">
                        {items.map((item) => (
                            <A
                                href={item.href}
                                target={item.external ? '_blank' : undefined}
                                class="font-medium transition-colors hover:text-gray-300"
                            >
                                {item.text}
                            </A>
                        ))}
                    </div>
                </div>
            </Show>

            {/* Navbar */}
            <header
                class={classNames(
                    'z-20 flex items-center justify-between py-10 transition-all',
                    isSticky() &&
                        'sticky top-0 bg-gradient-to-t from-transparent via-neutral-950 to-neutral-950 !py-4',
                )}
            >
                <A href="/">
                    <img
                        alt="Equicord Logo"
                        src={Logo}
                        draggable={false}
                        class="m-1 size-11 transition-transform duration-500 select-none hover:scale-110 hover:rotate-180"
                    />
                </A>

                <div class="hidden items-center gap-6 md:flex">
                    {items.map((item) => (
                        <A
                            href={item.href}
                            target={item.external ? '_blank' : undefined}
                            class="font-medium text-neutral-400 transition-colors hover:text-neutral-100"
                        >
                            {item.text}
                        </A>
                    ))}

                    <A href="/download">
                        <Button style="primary">
                            <Download size={16} />
                            Download
                        </Button>
                    </A>
                </div>

                {/* Mobile Items */}
                <div class="z-20 flex items-center gap-2 md:hidden">
                    <A href="/download">
                        <button class="flex size-12 cursor-pointer items-center justify-center rounded-lg bg-neutral-800">
                            <Download size={20} />
                        </button>
                    </A>

                    <button
                        class={classNames(
                            showMenu() && '!bg-neutral-700',
                            'flex size-12 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg bg-neutral-800 transition-colors',
                        )}
                        onclick={toggleMenu}
                    >
                        <span
                            class={classNames(
                                showMenu() && 'translate-y-1.5 rotate-45',
                                'h-0.5 w-4 rounded-full bg-neutral-200 transition-all',
                            )}
                        />
                        <span
                            class={classNames(
                                showMenu() && 'opacity-0',
                                'h-0.5 w-4 rounded-full bg-neutral-200 transition-all',
                            )}
                        />
                        <span
                            class={classNames(
                                showMenu() && '-translate-y-1.5 -rotate-45',
                                'h-0.5 w-4 rounded-full bg-neutral-200 transition-all',
                            )}
                        />
                    </button>
                </div>
            </header>
        </>
    )
}
