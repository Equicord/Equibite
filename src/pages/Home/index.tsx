import Main from '~/containers/Main'

// Containers
import HomeHero from '~/containers/Home/Hero'
import HomeOverview from '~/containers/Home/Overview'
import HomeCTA from '~/containers/Home/CallToAction'

export default function Home() {
    return (
        <Main>
            <HomeHero />
            <HomeOverview />
            <HomeCTA />
        </Main>
    )
}
