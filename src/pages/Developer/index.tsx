import { useParams } from '@solidjs/router'
import { createResource, Show } from 'solid-js'
import { Plugin } from '~/types/plugin'

import { fetchPlugins } from '~/utils/fetch'
import { filterPluginsByDeveloper } from '~/utils/filter'

// 678007540608532491

export default function Developer() {
    const params = useParams()
    const [plugins] = createResource(fetchPlugins)

    if (!params.id) return <h1>No Id provided</h1>

    return (
        <div>
            {params.id}
            <Show when={plugins()} fallback={<p>hi</p>}>
                <div class="">
                    Developed
                    {
                        filterPluginsByDeveloper(
                            plugins() as Plugin[],
                            params.id,
                        )?.length
                    }
                    Plugins
                </div>
                <ul>
                    {filterPluginsByDeveloper(
                        plugins() as Plugin[],
                        params.id,
                    ).map((plugin) => (
                        <li>{plugin.name}</li>
                    ))}
                </ul>
            </Show>
        </div>
    )
}
