import Button from '~/components/Button'
import { Urls } from '~/constants'

const OSSBlock = () => {
    return (
        <div class="w-full p-6 flex justify-between items-center gap-3 bg-gradient-to-b from-black to-neutral-950 border border-neutral-900 rounded-2xl">
            <div class="flex flex-col">
                <h3 class="text-lg text-neutral-300 font-bold">
                    Open Source Software
                </h3>

                <p class="text-sm text-neutral-400 font-medium">
                    You can view the source code of Equicord on our GitHub page
                    at any time!
                </p>
            </div>

            <a href={Urls.GITHUB_URL}>
                <Button style="secondary" customClass="text-sm">
                    Visit
                </Button>
            </a>
        </div>
    )
}

export default OSSBlock
