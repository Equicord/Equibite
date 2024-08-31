export interface Plugin {
    // Name
    name: string
    // Description
    description: string
    // Tags
    tags: string[]
    // Authors
    authors: { name: string; id: string }[]
    // Dependencies
    dependencies: string[]
    // Patches?
    hasPatches: boolean
    // Commands?
    hasCommands: boolean
    // Required?
    required: boolean
    // Default?
    enabledByDefault: boolean
    // Target
    target: Target
    // File path
    filePath: string
}

type Target =
    | 'discordDesktop'
    | 'vencordDesktop'
    | 'equicordDesktop'
    | 'desktop'
    | 'web'
    | 'dev'
