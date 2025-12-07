import type { Dev, Plugin, PluginTarget, PluginUrlFetchType } from "@/types"
import { Urls } from "@constants"

export type { Dev, Plugin, PluginTarget, PluginUrlFetchType }

export const PluginUrlKeys: PluginUrlFetchType = {
    all: "ALL_PLUGINS_URL",
    equicord: "EQUICORD_PLUGINS_URL",
    vencord: "VENCORD_PLUGINS_URL",
}

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

export const formatTarget = (target: PluginTarget): string =>
    target
        ? target
              .replace(/([A-Z])/g, " $1")
              .toLowerCase()
              .trim()
        : "all platforms"

export const cleanDescription = (text: string): string =>
    text
        .replace(/[!.,:;?]+/g, "")
        .replace(/\s+/g, " ")
        .trim()

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
