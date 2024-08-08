// Containers
import Main from '~/containers/Main'

// Home Containers
import HomeHero from '~/containers/Home/Hero'
import HomeOverview from '~/containers/Home/Overview'
import HomeCTA from '~/containers/Home/CallToAction'
import HomeDownload from '~/containers/Home/Download'

export default function Home() {
    return (
        <Main>
            <HomeHero />
            <HomeOverview />
            <HomeCTA />
            <HomeDownload />
        </Main>
    )
}
