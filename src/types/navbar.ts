import type { JSX } from "solid-js"

export interface NavItem {
    text: string
    href: string
    external?: boolean
}

export interface BrowseItem {
    icon: () => JSX.Element
    text: string
    description: string
    href: string
    external?: boolean
}

export interface BrowseSection {
    category: string
    items: BrowseItem[]
}
