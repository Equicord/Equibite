import { A } from '@solidjs/router'
import { ArrowLeft, Earth, Heart } from 'lucide-solid'

import SimpleBootstrap from '@components/SimpleBootstrap'
import Button from '@components/UI/Button'

export default function DownloadThanks() {
    return (
        <SimpleBootstrap
            meta={{ title: 'Thank you! | Equicord' }}
            icon={<Heart size={72} />}
            title="Thank you for downloading Equicord!"
        >
            <A href="/">
                <Button
                    style="primary"
                    icon={<ArrowLeft size={16} />}
                    class="text-sm"
                >
                    Go back
                </Button>
            </A>

            <A href="/plugins">
                <Button
                    style="secondary"
                    icon={<Earth size={16} />}
                    class="text-sm"
                >
                    Plugins
                </Button>
            </A>
        </SimpleBootstrap>
    )
}
