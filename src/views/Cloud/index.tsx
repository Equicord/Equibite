import PageBootstrap from '@components/PageBootstrap'
import Button from '@components/UI/Button'
import { A } from '@solidjs/router'
import { CloudFog, Rabbit, RefreshCcw, Scroll, Link } from 'lucide-solid'

export default function Cloud() {
    return (
        <PageBootstrap
            meta={{ title: 'Cloud' }}
            icon={<CloudFog />}
            fullWidth
            title="Cloud"
            description="Equicord comes with a cloud integration allowing settings to be synced across apps and devices. We use Vencord's source code to provide our cloud instance which has a 60MB backup cap."
        >
            <div class="mt-6 flex flex-col gap-6">
                <h1 class="text-2xl font-bold">What is included?</h1>

                <div class="flex flex-col gap-1">
                    <h2 class="inline-flex items-center gap-2 text-xl font-bold">
                        <RefreshCcw size={16} />
                        Settings Sync
                    </h2>

                    <p class="font-medium text-neutral-400">
                        Synchronises your settings across all your devices
                    </p>
                </div>

                <div class="flex flex-col gap-1">
                    <h2 class="inline-flex items-center gap-2 text-xl font-bold">
                        <Rabbit size={16} />
                        Coming soon
                    </h2>

                    <p class="font-medium text-neutral-400">
                        Stay tuned for more future features!
                    </p>
                </div>
            </div>

            <div class="mt-6 flex flex-col gap-3">
                <h1 class="text-2xl font-bold">Getting Started</h1>

                <p class="font-medium text-neutral-400">
                    To start using our cloud integration, head over to the
                    Equicord settings section inside Discord and check the
                    "Enable Cloud Integrations" switch. After authorising,
                    you're good to go! You can now enable specific features on
                    the same page.
                </p>

                <p class="font-medium text-neutral-400">
                    To use our cloud, all you need to do is change the backend url in
                    the cloud tab to <code class="bg-neutral-800 text-neutral-100 px-2 py-1 rounded border border-neutral-700 font-mono">https://cloud.equicord.org</code>
                </p>
            </div>

            <div class="mt-6 flex items-center gap-3">
                <A href="https://github.com/Vencord/Vencloud" class="w-fit">
                    <Button
                        style="primary"
                        icon={<Link size={16} />}
                        class="text-sm"
                    >
                        View the source code
                    </Button>
                </A>

                <A href="/cloud/policy" class="w-fit">
                    <Button
                        style="primary"
                        icon={<Scroll size={16} />}
                        class="text-sm"
                    >
                        Read our privacy policy
                    </Button>
                </A>
            </div>
        </PageBootstrap>
    )
}