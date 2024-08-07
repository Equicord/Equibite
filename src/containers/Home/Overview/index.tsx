import { FeatureData } from '~/data'
import FeatureCard from '~/components/Cards/Feature'

// TODO: Make it so it does not lag and look shitty!!
// import Animate from '~/components/Animate'

export default function HomeOverview() {
    return (
        <div class="mt-36 mb-24 flex flex-col items-center gap-12">
            <div class="flex justify-between gap-8 max-md:flex-col">
                {FeatureData.map((item) => (
                    <FeatureCard {...item} />
                ))}
            </div>
        </div>
    )
}
