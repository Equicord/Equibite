import { FeatureData } from '~/data'
import FeatureCard from '~/components/Cards/Feature'

export default function HomeOverview() {
    return (
        <div class="my-24 flex justify-between gap-8 max-md:flex-col">
            {FeatureData.map((item) => (
                <FeatureCard {...item} />
            ))}
        </div>
    )
}
