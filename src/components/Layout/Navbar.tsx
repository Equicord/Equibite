import type { BrowseItem, BrowseSection, NavItem } from "@/types"
import Button from "@components/UI/Button"
import Popover from "@components/UI/Popover"
import { faDiscord } from "@fortawesome/free-brands-svg-icons"
import { A, useLocation } from "@solidjs/router"
import classNames from "classnames"
import {
    Book,
    BookMarked,
    CloudFog,
    Code,
    Download,
    DownloadIcon,
    ExternalLink,
    Github,
    Paintbrush,
    Puzzle,
} from "lucide-solid"
import Fa from "solid-fa"
import { createSignal, For, onCleanup, onMount, Show } from "solid-js"

const BrowseSections: BrowseSection[] = [
    {
        category: "Discover",
        items: [
            {
                icon: () => <Puzzle size={20} />,
                text: "Plugins",
                description: "List of Equicord's third-party plugins",
                href: "/plugins",
            },
            {
                icon: () => <BookMarked size={20} />,
                text: "Projects",
                description: "List of Equicord's active repositories",
                href: "/projects",
            },
            {
                icon: () => <CloudFog size={20} />,
                text: "Cloud",
                description: "About Equicord's cloud integration",
                href: "/cloud",
            },
        ],
    },
    {
        category: "Resources",
        items: [
            {
                icon: () => <DownloadIcon size={20} />,
                text: "Download",
                description: "Download Equicord’s installer Equilotl",
                href: "/download",
            },
            {
                icon: () => <Book size={20} />,
                text: "Documentation",
                description: "Learn how to use Equicord",
                href: "https://docs.equicord.org",
                external: true,
            },
            {
                icon: () => <Code size={20} />,
                text: "Source Code",
                description: "View the Equicord repository",
                href: "https://github.com/Equicord/Equicord",
                external: true,
            },
        ],
    },
    {
        category: "Community",
        items: [
            {
                icon: () => <Fa icon={faDiscord} class="h-8" />,
                text: "Discord",
                description: "Join the active community on Discord",
                href: "/discord",
                external: true,
            },
            {
                icon: () => <Github size={20} />,
                text: "GitHub",
                description: "Contribute to Equicord and other projects",
                href: "https://github.com/Equicord",
                external: true,
            },
            {
                icon: () => <Paintbrush size={20} />,
                text: "Icons",
                description: "Custom icons for Equicord",
                href: "/icons",
            },
        ],
    },
]

const NavItems: NavItem[] = [
    {
        text: "Team",
        href: "/team",
    },
    {
        text: "Docs",
        href: "https://docs.equicord.org",
        external: true,
    },
]

const DropdownItem = (props: { item: BrowseItem; onClick?: () => void }) => (
    <A
        href={props.item.href}
        target={props.item.external ? "_blank" : undefined}
        onClick={props.onClick}
        class="relative group flex items-start gap-3 rounded-xl p-3 text-neutral-300 hover:text-white transition-colors duration-150"
    >
        <div class="flex items-center justify-center pt-2">
            {props.item.icon()}
        </div>

        <div class="flex flex-1 flex-col">
            <h4 class="font-semibold">{props.item.text}</h4>
            <p class="text-sm font-medium text-neutral-500 group-hover:text-neutral-400 transition-colors duration-150">
                {props.item.description}
            </p>
        </div>

        <div class="-z-10 absolute size-full inset-0 rounded-xl bg-neutral-800 opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95 transition-all duration-150" />
    </A>
)

const NavLink = (props: { item: NavItem }) => (
    <A
        href={props.item.href}
        target={props.item.external ? "_blank" : undefined}
        class="flex cursor-pointer items-center hover:bg-neutral-900 py-2 px-3 rounded-xl gap-1 font-medium text-neutral-400 transition-colors hover:text-white"
    >
        {props.item.text}
        {props.item.external && <ExternalLink size={16} />}
    </A>
)

export default function Navbar() {
    const location = useLocation()
    const [showMobileMenu, setShowMobileMenu] = createSignal(false)
    const [hasScrolled, setHasScrolled] = createSignal(false)

    const toggleMobileMenu = (force?: boolean) => {
        const next = force ?? !showMobileMenu()
        setShowMobileMenu(next)
        document.body.style.overflowY = next ? "hidden" : "auto"
    }

    const handleScroll = () => setHasScrolled(window.scrollY > 0)

    onMount(() => window.addEventListener("scroll", handleScroll))
    onCleanup(() => {
        window.removeEventListener("scroll", handleScroll)
        document.body.style.overflowY = "auto"
    })

    return (
        <>
            {/* Mobile overlay */}
            {showMobileMenu() && (
                <div
                    class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={() => toggleMobileMenu(false)}
                />
            )}

            {/* Mobile Menu */}
            <div
                class={classNames(
                    "fixed top-0 right-0 z-40 h-dvh w-80 flex-col overflow-y-scroll border-l border-l-neutral-800/50 bg-neutral-900 md:hidden transition-transform duration-300 ease-out",
                    showMobileMenu() ? "translate-x-0" : "translate-x-full",
                )}
            >
                <div class="flex flex-col gap-6 p-6 pt-20">
                    <For each={BrowseSections}>
                        {(section) => (
                            <div class="flex flex-col">
                                <div class="mb-2 font-bold">
                                    {section.category}
                                </div>
                                <For each={section.items}>
                                    {(item) => (
                                        <DropdownItem
                                            item={item}
                                            onClick={() =>
                                                toggleMobileMenu(false)
                                            }
                                        />
                                    )}
                                </For>
                            </div>
                        )}
                    </For>

                    <div class="flex flex-col gap-2 border-t border-neutral-800 pt-4">
                        <For each={NavItems}>
                            {(item) => (
                                <A
                                    href={item.href}
                                    target={
                                        item.external ? "_blank" : undefined
                                    }
                                    class="flex items-center gap-1 rounded-xl p-3 font-bold hover:bg-neutral-800/50"
                                    onClick={() => toggleMobileMenu(false)}
                                >
                                    {item.text}
                                    {item.external && (
                                        <ExternalLink size={16} />
                                    )}
                                </A>
                            )}
                        </For>

                        <Show when={location.pathname !== "/download"}>
                            <A
                                href="/download"
                                onClick={() => toggleMobileMenu(false)}
                            >
                                <Button
                                    icon={<Download size={16} />}
                                    variant="secondary"
                                    class="w-full justify-center"
                                >
                                    Download
                                </Button>
                            </A>
                        </Show>
                    </div>
                </div>
            </div>

            <header
                class={classNames(
                    "max-w-eq-lg z-30 mx-auto flex items-center justify-between px-6 py-8 transition-colors",
                    hasScrolled() &&
                        "sticky top-0 bg-neutral-950/90 backdrop-blur-lg",
                )}
            >
                <div class="flex items-center gap-6">
                    <A
                        href="/"
                        class="flex items-center gap-3 text-lg font-bold text-white transition-transform active:scale-[.95]"
                    >
                        <img
                            src={
                                Math.random() < 1 / 1_000_000
                                    ? "/assets/icons/equicord/icon-old.webp"
                                    : "/assets/favicon.webp"
                            }
                            class="size-8 select-none"
                            draggable={false}
                            alt="Equicord logo"
                        />
                        Equicord
                    </A>

                    <hr class="max-lg:hidden border-r h-8 border-neutral-900" />

                    <div class="hidden items-center gap-3 lg:flex">
                        <For each={BrowseSections}>
                            {(section) => (
                                <Popover
                                    trigger={
                                        <span class="cursor-pointer text-neutral-400 hover:text-white transition-colors font-medium">
                                            {section.category}
                                        </span>
                                    }
                                    popoverClass="left-1/2 -translate-x-1/3 w-[240px] p-3"
                                >
                                    <div class="flex flex-col gap-2">
                                        <For each={section.items}>
                                            {(item) => (
                                                <DropdownItem item={item} />
                                            )}
                                        </For>
                                    </div>
                                </Popover>
                            )}
                        </For>

                        <For each={NavItems}>
                            {(item) => <NavLink item={item} />}
                        </For>
                    </div>
                </div>

                <Show when={location.pathname !== "/download"}>
                    <A href="/download" class="hidden md:flex">
                        <Button icon={<Download size={16} />} variant="primary">
                            Download
                        </Button>
                    </A>
                </Show>

                <button
                    class="z-50 flex size-12 flex-col items-center justify-center gap-1.5 rounded-xl md:hidden focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
                    onClick={() => toggleMobileMenu()}
                    aria-label="Toggle menu"
                    aria-expanded={showMobileMenu()}
                >
                    <span
                        class={classNames(
                            showMobileMenu() && "translate-y-2 rotate-45",
                            "h-0.5 w-5 rounded-full bg-neutral-200 transition-all",
                        )}
                    />
                    <span
                        class={classNames(
                            showMobileMenu() && "opacity-0",
                            "h-0.5 w-5 rounded-full bg-neutral-200 transition-all",
                        )}
                    />
                    <span
                        class={classNames(
                            showMobileMenu() && "-translate-y-2 -rotate-45",
                            "h-0.5 w-5 rounded-full bg-neutral-200 transition-all",
                        )}
                    />
                </button>
            </header>
        </>
    )
}
