import DiscordBlock from '~/components/Blocks/Discord'
import DownloadBlock from '~/components/Blocks/Download'

export default function HomeCTA() {
    return (
        <div class="flex justify-between gap-6">
            <DiscordBlock />
            <DownloadBlock />
        </div>
    )
}
