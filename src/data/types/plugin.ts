export interface Plugin {
    name: string
    description: string
    tags: string[]
    authors: { name: string; id: string }[]
    dependencies: string[]
    hasPatches: boolean
    hasCommands: boolean
    required: boolean
    enabledByDefault: boolean
    target:
        | 'discordDesktop'
        | 'vencordDesktop'
        | 'equicordDesktop'
        | 'desktop'
        | 'web'
        | 'dev'
    filePath: string
}
