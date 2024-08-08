import type { Download } from '~/data/types/download'
import Fa from 'solid-fa'
import Button from '~/components/Button'

const DownloadCard = (props: Download) => {
    return (
        <div class="w-full h-80 p-6 flex flex-col justify-between bg-gradient-to-b from-black to-neutral-950 border border-neutral-900 rounded-2xl">
            {/* {props.recommend && <p>recommended</p>} */}
            <div class="w-full flex justify-between items-center">
                <Fa icon={props.icon} class="!size-6 text-neutral-300" />
                <h4 class="text-neutral-300 font-semibold">{props.platform}</h4>
            </div>

            <a href={props.href}>
                <Button
                    style={props.recommend ? 'primary' : 'secondary'}
                    full={true}
                    customClass="text-sm"
                >
                    Download
                </Button>
            </a>
        </div>
    )
}

export default DownloadCard
