import { FeatureData } from '~/data'
import FeatureCard from '~/components/Cards/Feature'
import Animate from '~/components/Animate'

const HomeOverview = () => {
    return (
        <section class="my-28 relative flex flex-col gap-12">
            <div class="flex justify-between gap-8 max-md:flex-col">
                {FeatureData.map((item, index) => (
                    <Animate direction="up" delay={0.1 * index}>
                        <FeatureCard {...item} />
                    </Animate>
                ))}
            </div>
        </section>
    )
}

export default HomeOverview
