import Button from '~/components/Button'
import { Urls } from '~/constants'

const DiscordBlock = () => {
    return (
        <div class="w-full p-6 flex justify-between items-center gap-3 bg-gradient-to-b from-black to-neutral-950 border border-neutral-900 rounded-2xl">
            <div class="flex flex-col">
                <h3 class="text-lg text-neutral-300 font-bold">Community</h3>

                <p class="text-sm text-neutral-400 font-medium">
                    Join our community to keep up with the latest news. You can
                    also use the server to ask for help and support.
                </p>
            </div>

            <a href={Urls.DISCORD_URL} target="_blank">
                <Button style="secondary" customClass="text-sm">
                    Join
                </Button>
            </a>
        </div>
    )
}

export default DiscordBlock
