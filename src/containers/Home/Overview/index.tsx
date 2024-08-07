import { FeatureData } from '~/data'
import FeatureCard from '~/components/Cards/Feature'
import Animate from '~/components/Animate'

const HomeOverview = () => {
    return (
        <section class="my-36 flex flex-col items-center gap-12">
            <div class="flex justify-between gap-8 max-md:flex-col">
                {FeatureData.map((item, index) => (
                    <Animate
                        direction="up"
                        delay={0.1 * index}
                        customClass="w-full"
                    >
                        <FeatureCard {...item} />
                    </Animate>
                ))}
            </div>
        </section>
    )
}

export default HomeOverview
