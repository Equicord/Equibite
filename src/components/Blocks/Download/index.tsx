import Button from '~/components/Button'

const DownloadBlock = () => {
    return (
        <div class="w-full p-6 flex justify-between items-center gap-3 bg-gradient-to-b from-black to-neutral-950 border border-neutral-900 rounded-2xl">
            <div class="flex flex-col">
                <h3 class="text-lg text-neutral-300 font-bold">Convinced?</h3>

                <p class="text-sm text-neutral-400 font-medium">
                    Download Equicord for your platform and enjoy everything we
                    have to offer!
                </p>
            </div>

            <a href="/download">
                <Button style="accept" customClass="text-sm">
                    Download
                </Button>
            </a>
        </div>
    )
}

export default DownloadBlock
