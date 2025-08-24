import { createSignal, Show, onCleanup, onMount } from 'solid-js'
import { A } from '@solidjs/router'
import classNames from 'classnames'

import Logo from '@assets/logo.svg'
import { Download } from 'lucide-solid'
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
    ]

    const toggleMenu = () => {
        const next = !showMenu()
        setShowMenu(next)
        window.scrollTo(0, 0)
        document.body.style.overflowY = next ? 'hidden' : 'auto'
    }

    const handleScroll = () => setIsSticky(window.scrollY > 0)

    onMount(() => window.addEventListener('scroll', handleScroll))

    onCleanup(() => window.removeEventListener('scroll', handleScroll))

    return (
        <>
            {/* Mobile Overlay */}
            <Show when={showMenu()}>
                <div
                    onclick={toggleMenu}
                    class="fixed top-[129px] z-10 h-fit w-full bg-neutral-950 px-6 pt-8 pb-12"
                >
                    <div class="flex flex-col gap-4 text-lg">
                        {items.map((item) => (
                            <A
                                href={item.href}
                                target={item.external ? '_blank' : undefined}
                                class="border-b border-neutral-900 pb-6 font-medium transition-colors hover:text-gray-300"
                            >
                                {item.text}
                            </A>
                        ))}

                        <A href="/download">
                            <Button
                                icon={<Download size={16} />}
                                style="secondary"
                                class="w-full justify-start"
                            >
                                Download
                            </Button>
                        </A>
                    </div>
                </div>
            </Show>

            {/* Navbar */}
            <header
                class={classNames(
                    'max-w-eq-lg z-20 mx-auto flex items-center justify-between border-b px-6 py-10 transition-all',
                    isSticky() &&
                        'sticky top-0 bg-gradient-to-t from-transparent via-neutral-950 to-neutral-950',
                    showMenu()
                        ? 'border-b-neutral-900'
                        : 'border-b-transparent',
                )}
            >
                <A
                    href="/"
                    class="flex items-center gap-2 text-lg font-medium text-neutral-200 transition-transform select-none active:scale-[.95]"
                >
                    <img
                        alt="Equicord Logo"
                        src={Logo}
                        draggable={false}
                        class="size-8"
                    />
                    Equicord
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
                        <Button icon={<Download size={16} />} style="secondary">
                            Download
                        </Button>
                    </A>
                </div>

                {/* Mobile Items */}
                <div class="z-20 flex items-center gap-2 md:hidden">
                    <button
                        class="flex size-12 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg transition-colors"
                        onclick={toggleMenu}
                    >
                        <span
                            class={classNames(
                                showMenu() && 'translate-y-1.5 rotate-45',
                                'h-0.5 w-5 rounded-full bg-neutral-200 transition-all',
                            )}
                        />
                        <span
                            class={classNames(
                                showMenu() && 'opacity-0',
                                'h-0.5 w-5 rounded-full bg-neutral-200 transition-all',
                            )}
                        />
                        <span
                            class={classNames(
                                showMenu() && '-translate-y-1.5 -rotate-45',
                                'h-0.5 w-5 rounded-full bg-neutral-200 transition-all',
                            )}
                        />
                    </button>
                </div>
            </header>
        </>
    )
}
