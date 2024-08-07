import Main from '~/containers/Main'
import HomeHero from '~/containers/Home/Hero'
import HomeOverview from './containers/Home/Overview'

export default function Page() {
    return (
        <Main>
            <HomeHero />
            <HomeOverview />
        </Main>
    )
}
