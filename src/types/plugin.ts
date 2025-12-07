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
