import type { Plugin } from '~/types/plugin'

type Filter =
    | 'alphabetical'
    | 'alphabeticalReverse'
    | 'hasCommands'
    | 'hasPatches'
    | 'required'

export const filterPlugins = (plugins: Plugin[], filter: Filter): Plugin[] => {
    switch (filter) {
        case 'alphabetical':
            // Sort alphabetically by name (A-Z)
            return plugins.sort((a, b) => a.name.localeCompare(b.name))
        case 'alphabeticalReverse':
            // Sort alphabetically by name (Z-A)
            return plugins.sort((a, b) => b.name.localeCompare(a.name))
        case 'hasCommands':
            // Filter plugins that have commands
            return plugins.filter((plugin) => plugin.hasCommands)
        case 'hasPatches':
            // Filter plugins that have patches
            return plugins.filter((plugin) => plugin.hasPatches)
        case 'required':
            // Filter plugins that are required
            return plugins.filter((plugin) => plugin.required)
        default:
            return plugins
    }
}

export const filterPluginsByDeveloper = (
    plugins: Plugin[],
    id: string,
): Plugin[] => {
    return plugins.filter((plugin) =>
        plugin.authors.some((author) => author.id === id),
    )
}
