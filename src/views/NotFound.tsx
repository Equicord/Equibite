import SimpleBootstrap from '@components/SimpleBootstrap'
import { A } from '@solidjs/router'

import Button from '@components/UI/Button'
import { ArrowLeft, Flower2 } from 'lucide-solid'

const Texts: string[] = [
    "Looks like you've lost your map!",
    "You've lost your way!",
    "Yeah... This page doesn't exist.",
    "Hey! Oh yeah, this page doesn't exist.",
    'Naibuu was here.',
    'Thor took this path away.',
]

export default function NotFound() {
    const text = Texts[Math.floor(Math.random() * Texts.length)]

    return (
        <SimpleBootstrap
            meta={{ title: 'Page not found | Equicord' }}
            icon={<Flower2 size={72} />}
            title={text}
        >
            <A href="/">
                <Button
                    buttonColor="secondary"
                    icon={<ArrowLeft size={16} />}
                    class="text-sm"
                >
                    Go back
                </Button>
            </A>
        </SimpleBootstrap>
    )
}
