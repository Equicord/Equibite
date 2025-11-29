import { Urls } from "@utils/constants"

export interface Dev {
    name: string
    id: string
}

export interface Command {
    name: string
    description: string
}

export type PluginTarget =
    | "discordDesktop"
    | "vesktop"
    | "equibop"
    | "desktop"
    | "web"
    | "dev"
    | undefined

export interface Plugin {
    name: string
    description: string
    tags: string[]
    authors: Dev[]
    dependencies: string[]
    hasPatches: boolean
    hasCommands: boolean
    commands: Command[]
    required: boolean
    enabledByDefault: boolean
    target: PluginTarget
    filePath: string
    isModified: boolean
}

export interface PluginUrlFetchType {
    all: "ALL_PLUGINS_URL"
    equicord: "EQUICORD_PLUGINS_URL"
    vencord: "VENCORD_PLUGINS_URL"
}

export const PluginUrlKeys: PluginUrlFetchType = {
    all: "ALL_PLUGINS_URL",
    equicord: "EQUICORD_PLUGINS_URL",
    vencord: "VENCORD_PLUGINS_URL",
}

/**
 * Fetches plugins from github.
 * @param all - Whether to fetch all plugins or only equicord plugins.
 */
export const fetchPlugins = async (
    type: keyof PluginUrlFetchType,
): Promise<Plugin[]> => {
    const urlKey = PluginUrlKeys[type]

    const url = Urls[urlKey as keyof typeof Urls]
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Failed to fetch ${type} plugins`)
    }

    return response.json() as Promise<Plugin[]>
}

/**
 * Formats the authors array into a string.
 * @param authors - Array of authors.
 */
export const formatAuthors = (authors: Dev[]): string => {
    const names = authors.map((author) => author.name)

    switch (names.length) {
        case 0:
            return ""
        case 1:
            return names[0]
        case 2:
            return names.join(" & ")
        default:
            return names.join(", ")
    }
}

/**
 * Formats the plugin target into a string.
 * @param target - Plugin target.
 */
export const formatTarget = (target: PluginTarget): string =>
    target
        ? target
              .replace(/([A-Z])/g, " $1")
              .toLowerCase()
              .trim()
        : "all platforms"

/**
 * Cleans up description text by removing punctuation and extra spaces.
 * @param text - Raw description.
 */
export const cleanDescription = (text: string): string =>
    text
        .replace(/[!.,:;?]+/g, "")
        .replace(/\s+/g, " ")
        .trim()

/**
 * Gets the availability text of a plugin based on its name, requirement status, and target.
 */
export const getAvailabilityText = (
    name: string,
    required: boolean,
    target: PluginTarget,
): string => {
    if (name === "WebContextMenus") return "Required on vesktop & equibop"

    return required
        ? `Required on ${formatTarget(target)}`
        : `Available on ${formatTarget(target)}`
}
