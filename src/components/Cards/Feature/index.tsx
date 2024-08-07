import type { Feature } from '~/data/types/feature'
import Fa from 'solid-fa'

const FeatureCard = (props: Feature) => {
    return (
        <div class="size-full p-6 flex flex-col justify-start gap-1 bg-gradient-to-b from-black to-neutral-950 border border-neutral-900 rounded-2xl">
            <div class="size-12 p-0.5 bg-gradient-to-t from-neutral-900 to-neutral-600 rounded-full">
                <div class="size-full flex justify-center items-center bg-neutral-950 rounded-full">
                    <Fa icon={props.icon} class="text-gray-300" />
                </div>
            </div>

            <h3 class="text-lg text-neutral-300 font-bold">{props.title}</h3>

            <p class="text-sm text-neutral-400 font-medium">{props.excerpt}</p>
        </div>
    )
}

export default FeatureCard
