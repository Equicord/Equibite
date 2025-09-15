import { Title } from '@solidjs/meta'
import HomeContent from './components/Content'
import HomeHero from './components/Hero'

export default function Home() {
    return (
        <>
            <Title>Equicord</Title>
            <HomeHero />
            <HomeContent />
        </>
    )
}
