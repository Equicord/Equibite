import type { IconDefinition } from "@fortawesome/free-brands-svg-icons"

export interface Download {
    text: string
    href: string
    prioritize?: boolean
    note?: string
}

export interface Platform {
    title: string
    icon: IconDefinition
    downloads: Download[]
    isCurrent: boolean
    warning?: string
    subtext?: string
    subsection?: Download[]
}

export interface Section {
    title: string
    description: string
    githubUrl: string
    platforms: Platform[]
    globalWarning?: string
}
