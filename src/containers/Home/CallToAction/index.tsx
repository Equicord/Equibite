import DiscordBlock from '~/components/Blocks/Discord'
// import DownloadBlock from '~/components/Blocks/Download'
import OSSBlock from '~/components/Blocks/OSS'

export default function HomeCTA() {
    return (
        <div class="mt-8 flex justify-between gap-6 max-md:flex-col">
            <DiscordBlock />
            <OSSBlock />
        </div>
    )
}
