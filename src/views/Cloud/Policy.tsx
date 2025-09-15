import PageBootstrap from '@components/PageBootstrap'
import { A } from '@solidjs/router'
import { Scroll } from 'lucide-solid'

export default function CloudPolicy() {
    return (
        <PageBootstrap
            meta={{ title: 'Cloud Privacy Policy' }}
            icon={<Scroll />}
            fullWidth
            title="Cloud Policy"
            description="Privacy policy for Equicord's cloud services."
        >
            <h2 class="text-lg font-semibold text-neutral-300">
                Last Updated: 26/03/2023
            </h2>

            <div class="flex flex-col gap-3">
                <h1 class="text-2xl font-bold">Introduction</h1>
                <p class="leading-relaxed font-medium text-neutral-400">
                    This privacy policy applies to our cloud services, which you
                    need to explicitly enable. If you don't enable the cloud,
                    Vencord will not collect any data about you whatsoever. Our
                    website (the one you are currently on) might collect data
                    about you via our hosting provider Vercel. You can find out
                    more about this in our{' '}
                    <A
                        href="https://vencord.dev/cloud/gdpr/"
                        class="text-neutral-300 underline"
                    >
                        GDPR policy
                    </A>{' '}
                    linked below. We take your privacy very seriously! As such,
                    we collect as little information as possible and only use it
                    for the purposes absolutely necessary to provide our
                    services to you. This is a very simple summary for normal
                    people. We also have a proper GDPR policy. You might want to
                    read that as well.
                </p>
            </div>

            <div class="mt-6 flex flex-col gap-3">
                <h1 class="text-2xl font-bold">The information we store</h1>
                <p class="leading-relaxed font-medium text-neutral-400">
                    We only store information you provide to us. This includes
                </p>
                <ul class="ml-5 list-decimal font-medium text-neutral-300">
                    <li>
                        The sha1 hash of your Discord user id. This is necessary
                        to uniquely identify your data
                    </li>
                    <li>
                        Your Vencord settings, stored as JSON plain text. This
                        is necessary to synchronise your settings between
                        multiple clients as part of our Settings Sync feature.
                    </li>
                </ul>
            </div>

            <div class="mt-6 flex flex-col gap-3">
                <h1 class="text-2xl font-bold">How we use your information</h1>
                <p class="leading-relaxed font-medium text-neutral-400">
                    We will only use your data for the aforementioned purposes.
                    We will never share your data with any third parties, unless
                    we are required to do so by law.
                </p>
            </div>

            <div class="mt-6 flex flex-col gap-3">
                <h1 class="text-2xl font-bold">Data Retention</h1>
                <p class="leading-relaxed font-medium text-neutral-400">
                    We will retain your data until it is no longer necessary for
                    the aforementioned purposes. You can delete all your data
                    permamently at any time by using the Erase All Data button
                    in the Vencord Cloud settings section or by emailing us at
                    privacy@vencord.dev.
                </p>
            </div>

            <div class="mt-6 flex flex-col gap-3">
                <h1 class="text-2xl font-bold">
                    Changes to this Privacy Policy
                </h1>
                <p class="leading-relaxed font-medium text-neutral-400">
                    We will update this Privacy Policy if necessary, for example
                    if we start storing more data as part of a new Service. If
                    we do so, you will be notified via the announcements channel
                    on our Discord Server. The last update date will also always
                    be present at the very top of this Privacy Policy.
                </p>
            </div>
        </PageBootstrap>
    )
}
