import { Title } from '@solidjs/meta'
import HomeHero from './components/Hero'
import HomeContent from './components/Content'

export default function Home() {
    return (
        <>
            <Title>Equicord</Title>
            <HomeHero />
            <HomeContent />
        </>
    )
}
