import { EQUICORD_PLUGINS_URL } from '~/constants'
import type { Plugin } from '~/data/types/plugin'

const getPlugins = async (): Promise<Plugin[]> => {
    const res = await fetch(EQUICORD_PLUGINS_URL)
    if (!res.ok) throw new Error('Failed to fetch plugins: ' + res.status)

    return res.json()
}

export { getPlugins }
