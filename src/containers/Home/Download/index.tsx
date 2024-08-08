import { DownloadData } from '~/data'
import DownloadCard from '~/components/Cards/Download'

export default function HomeDownload() {
    return (
        <div
            id="download"
            class="my-24 flex justify-between gap-4 max-sm:flex-col"
        >
            {DownloadData.map((item) => (
                <DownloadCard {...item} />
            ))}
        </div>
    )
}
