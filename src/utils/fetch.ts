import type { Plugin } from '~/types/plugin'
import { Urls } from '~/constants'

export const fetchPlugins = async (): Promise<Plugin[]> => {
    // TODO(naibuu): Improve this
    const response = await fetch(Urls.PLUGINS_URL, { cache: 'force-cache' })

    if (!response.ok)
        // You suck basically
        throw new Error('Failed to fetch plugins: ' + response.status)

    return response.json()
}
