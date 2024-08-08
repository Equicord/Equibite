import { NavData } from '~/data'
import Button from '~/components/Button'
import _Logo from '~/assets/logo.svg'

const Navbar = () => {
    return (
        <nav class="max-w-read mx-auto px-6 py-8 flex justify-between items-center">
            <div class="flex items-center gap-8">
                <a href="/" class="size-8">
                    <img src={_Logo} draggable={false} />
                </a>

                {NavData.map((item) => (
                    <a
                        href={item.href}
                        class="font-medium text-neutral-300 transition hover:text-neutral-200"
                    >
                        {item.text}
                    </a>
                ))}
            </div>

            <a href="/download">
                <Button style="secondary" customClass="text-sm">
                    Download
                </Button>
            </a>
        </nav>
    )
}

export default Navbar
