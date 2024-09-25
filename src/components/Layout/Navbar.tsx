import { A } from '@solidjs/router'
import Button from '@/components/UI/Button'
import Logo from '@/assets/logo.svg'

export default function Navbar() {
    return (
        <header class="z-10 py-12 flex items-center justify-between">
            <A href="/">
                <img src={Logo} draggable={false} class="size-10" />
            </A>

            <div class="flex items-center gap-6">
                <A href="/plugins" class="font-semibold text-neutral-200">
                    Plugins
                </A>

                <A href="/faq" class="font-semibold text-neutral-200">
                    FAQ
                </A>

                <A href="/download">
                    <Button style="primary" customClass="!rounded-full text-sm">
                        Download
                    </Button>
                </A>
            </div>
        </header>
    )
}
