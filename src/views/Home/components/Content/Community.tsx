import { A } from '@solidjs/router'
import Button from '@components/UI/Button'

import Fa from 'solid-fa'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'

export default function Community() {
    return (
        <div class="flex flex-col gap-2 bg-neutral-900 p-12">
            <h2 class="text-xl font-bold">Join our community!</h2>

            <p class="font-medium text-neutral-400">
                We have an active community of people on Discord, join and stay
                up to date with new updates and announcements!
            </p>

            <A
                href="https://discord.gg/Dsy4sv7aad"
                target="_blank"
                class="mt-6 w-fit"
            >
                <Button style="primary">
                    <Fa icon={faDiscord} class="size-8" />
                    Join Discord
                </Button>
            </A>
        </div>
    )
}
