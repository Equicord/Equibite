import { createResource, Show } from 'solid-js'
import { fetchPlugins } from '~/utils/fetch'

export default function PluginDiscovery() {
    const [plugins] = createResource(fetchPlugins)

    return (
        <div>
            <Show when={plugins()} fallback={<p>hi</p>}>
                <ul>
                    {/** @ts-ignore */}
                    {plugins().map((plugin) => (
                        <li>{plugin.name}</li>
                    ))}
                </ul>
            </Show>
        </div>
    )
}
