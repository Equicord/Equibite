import { createSignal, onMount, onCleanup, JSX } from 'solid-js'
import { A } from '@solidjs/router'
import gsap from 'gsap'
import classNames from 'classnames'

import {
    Download,
    ChevronDown,
    Users,
    Book,
    Puzzle,
    Github,
    ExternalLink,
    Code,
} from 'lucide-solid'
import Fa from 'solid-fa'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'

import Logo from '@assets/logo.svg'
import Button from '@components/UI/Button'

interface NavItem {
    text: string
    href: string
    external?: boolean
}

interface BrowseItem {
    text: string
    excerpt: string
    href: string
    icon: () => JSX.Element
}

interface BrowseSection {
    category: string
    items: BrowseItem[]
}

const BrowseSections: BrowseSection[] = [
    {
        category: 'Discover',
        items: [
            {
                text: 'Plugins',
                excerpt: 'Discover third-party plugins for Equicord',
                href: '/plugins',
                icon: () => <Puzzle size={20} />,
            },
            {
                text: 'Team',
                excerpt: 'Meet the team of Equicord',
                href: '/team',
                icon: () => <Users size={20} />,
            },
        ],
    },
    {
        category: 'Resources',
        items: [
            {
                text: 'Documentation',
                excerpt: 'Learn how to use Equicord',
                href: 'https://docs.equicord.org',
                icon: () => <Book size={20} />,
            },
            {
                text: 'Source Code',
                excerpt: 'View the code of Equicord',
                href: 'https://github.com/Equicord/Equicord',
                icon: () => <Code size={20} />,
            },
        ],
    },
    {
        category: 'Community',
        items: [
            {
                text: 'Discord',
                excerpt: 'Join the active community',
                href: '/featured',
                icon: () => <Fa icon={faDiscord} class="h-8" />,
            },
            {
                text: 'GitHub',
                excerpt: 'Contribute to Equicord',
                href: '/popular',
                icon: () => <Github size={20} />,
            },
        ],
    },
]

const NavItems: NavItem[] = [
    {
        text: 'Docs',
        href: 'https://docs.equicord.org',
        external: true,
    },
]

const Animations = {
    dropdown: {
        duration: 0.2,
        ease: 'power2.out',
    },
    mobileMenu: {
        duration: 0.3,
        ease: 'power2.out',
    },
} as const

export default function Navbar() {
    const [showDropdown, setShowDropdown] = createSignal(false)
    const [showMobileMenu, setShowMobileMenu] = createSignal(false)
    const [hasScrolled, setHasScrolled] = createSignal(false)

    let dropdownRef: HTMLDivElement | undefined
    let mobileMenuRef: HTMLDivElement | undefined

    const handleScroll = () => setHasScrolled(window.scrollY > 0)

    const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef && !dropdownRef.contains(e.target as Node)) {
            closeDropdown()
        }
    }

    const animateDropdown = (show: boolean) => {
        if (!dropdownRef) return

        gsap.to(dropdownRef, {
            ...Animations.dropdown,
            opacity: show ? 1 : 0,
            display: show ? 'block' : 'none',
            filter: show ? '' : 'blur(4px)',
        })
    }

    const animateMobileMenu = (show: boolean) => {
        if (!mobileMenuRef) return

        gsap.to(mobileMenuRef, {
            ...Animations.mobileMenu,
            x: show ? 0 : 400,
            display: show ? 'flex' : 'none',
        })
    }

    const openDropdown = () => {
        setShowDropdown(true)
        animateDropdown(true)
    }

    const closeDropdown = () => {
        setShowDropdown(false)
        animateDropdown(false)
    }

    const toggleMobileMenu = (forceState?: boolean) => {
        const newState = forceState ?? !showMobileMenu()
        setShowMobileMenu(newState)

        document.body.style.overflowY = newState ? 'hidden' : 'auto'
        animateMobileMenu(newState)
    }

    const closeMobileMenu = () => toggleMobileMenu(false)

    onMount(() => {
        window.addEventListener('scroll', handleScroll)
        document.addEventListener('mousedown', handleClickOutside)
    })

    onCleanup(() => {
        window.removeEventListener('scroll', handleScroll)
        document.removeEventListener('mousedown', handleClickOutside)
        document.body.style.overflowY = 'auto'
    })

    const DropdownItem = (props: { item: BrowseItem; isMobile?: boolean }) => (
        <A
            href={props.item.href}
            class="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-neutral-800"
            onClick={() => props.isMobile && closeMobileMenu()}
        >
            <div class="flex items-center justify-center pt-2">
                {props.item.icon()}
            </div>
            <div class="flex flex-1 flex-col">
                <h4 class="font-semibold text-white">{props.item.text}</h4>
                <p class="text-sm font-semibold text-neutral-400">
                    {props.item.excerpt}
                </p>
            </div>
        </A>
    )

    const ToggleMenu = () => (
        <button
            class="z-50 flex size-12 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl md:hidden"
            onClick={() => toggleMobileMenu()}
        >
            <span
                class={classNames(
                    showMobileMenu() && 'translate-y-2 rotate-45',
                    'h-0.5 w-5 rounded-full bg-neutral-200 transition-all',
                )}
            />
            <span
                class={classNames(
                    showMobileMenu() && 'opacity-0',
                    'h-0.5 w-5 rounded-full bg-neutral-200 transition-all',
                )}
            />
            <span
                class={classNames(
                    showMobileMenu() && '-translate-y-2 -rotate-45',
                    'h-0.5 w-5 rounded-full bg-neutral-200 transition-all',
                )}
            />
        </button>
    )

    const NavLink = (props: { item: NavItem }) => (
        <A
            href={props.item.href}
            target={props.item.external ? '_blank' : undefined}
            class="flex cursor-pointer items-center gap-1 font-medium text-neutral-400 transition-colors hover:text-white"
        >
            {props.item.text}
            {props.item.external && <ExternalLink size={16} />}
        </A>
    )

    const BrowseDropdown = () => (
        <div
            class="relative py-3"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
        >
            <div class="flex cursor-pointer items-center gap-1 font-medium text-neutral-400 transition-colors hover:text-white">
                <span>Browse</span>

                <ChevronDown
                    size={16}
                    class={classNames(
                        'transition-transform duration-200',
                        showDropdown() && 'rotate-180',
                    )}
                />
            </div>

            <div
                ref={dropdownRef}
                class="absolute top-10 left-3 z-30 mt-2 w-[800px] -translate-x-1/3 rounded-2xl border border-neutral-700/50 bg-neutral-900 shadow-2xl"
                style={{ display: 'none' }}
            >
                <div class="grid grid-cols-3 gap-8 p-8">
                    {BrowseSections.map((section) => (
                        <div class="space-y-4">
                            <h2 class="font-bold">{section.category}</h2>

                            {section.items.map((item) => (
                                <DropdownItem item={item} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    return (
        <>
            {/* Mobile Overlay */}
            {showMobileMenu() && (
                <div
                    class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Mobile Menu */}
            <div
                ref={mobileMenuRef}
                class="fixed top-0 right-0 z-40 h-dvh w-80 flex-col overflow-y-scroll border-l border-l-neutral-800/50 bg-neutral-900 md:hidden"
                style={{ display: 'none' }}
            >
                <div class="flex flex-col gap-6 p-6 pt-20">
                    {BrowseSections.map((section) => (
                        <div class="flex flex-col">
                            <div class="mb-2 font-bold">{section.category}</div>
                            {section.items.map((item) => (
                                <DropdownItem item={item} isMobile />
                            ))}
                        </div>
                    ))}

                    <div class="flex flex-col gap-2 border-t border-neutral-800 pt-4">
                        {NavItems.map((item) => (
                            <A
                                href={item.href}
                                target={item.external ? '_blank' : undefined}
                                class="flex items-center gap-1 rounded-xl p-3 font-bold hover:bg-neutral-800/50"
                                onClick={closeMobileMenu}
                            >
                                {item.text}
                                {item.external && <ExternalLink size={16} />}
                            </A>
                        ))}

                        <A href="/download" onClick={closeMobileMenu}>
                            <Button
                                icon={<Download size={16} />}
                                style="secondary"
                                class="w-full justify-center"
                            >
                                Download
                            </Button>
                        </A>
                    </div>
                </div>
            </div>

            {/* Navbar */}
            <header
                class={classNames(
                    'max-w-eq-lg z-30 mx-auto flex items-center justify-between px-6 py-8 transition-colors',
                    hasScrolled() &&
                    'sticky top-0 bg-neutral-950/90 backdrop-blur-lg',
                )}
            >
                <A
                    href="/"
                    class="flex items-center gap-3 text-lg font-bold text-white transition-transform active:scale-[.95]"
                >
                    <img
                        src={Logo}
                        class="size-8 select-none"
                        draggable={false}
                        alt="Equicord logo"
                    />
                    Equicord
                </A>

                <nav class="hidden flex-1 items-center justify-center gap-6 md:flex">
                    <BrowseDropdown />

                    {NavItems.map((item) => (
                        <NavLink item={item} />
                    ))}
                </nav>

                <A href="/download" class="hidden md:flex">
                    <Button icon={<Download size={16} />} style="primary">
                        Download
                    </Button>
                </A>

                <ToggleMenu />
            </header>
        </>
    )
}
