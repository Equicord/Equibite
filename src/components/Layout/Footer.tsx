import Logo from '@assets/logo.svg'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { A } from '@solidjs/router'
import { Github } from 'lucide-solid'
import Fa from 'solid-fa'

export default function Footer() {
    return (
        <div class="mt-50 w-full border-t border-neutral-900 bg-neutral-950 px-8 py-12">
            <div class="max-w-eq-lg mx-auto flex flex-col gap-12 px-6 py-6">
                <div class="flex justify-between gap-6 max-md:flex-col max-md:items-center">
                    <div class="flex max-w-92 flex-col items-center gap-3 md:items-start">
                        <span class="flex items-center gap-2 text-lg font-semibold text-neutral-300">
                            <img
                                src={Logo}
                                width={32}
                                height={32}
                                class="select-none"
                                draggable={false}
                            />
                            Equicord
                        </span>

                        <p class="font-medium text-neutral-400 max-md:text-center">
                            A fork that has everything you need, third-party
                            plugins and more.
                        </p>
                    </div>

                    <div class="flex flex-col items-end gap-2">
                        <span class="text-sm font-medium text-neutral-400">
                            Socials
                        </span>

                        <A
                            href="/discord"
                            target="_blank"
                            class="flex items-center gap-2 font-medium transition-opacity hover:opacity-80"
                        >
                            <Fa icon={faDiscord} class="size-4" />
                            Discord
                        </A>

                        <A
                            href="https://github.com/Equicord"
                            target="_blank"
                            class="flex items-center gap-2 font-medium transition-opacity hover:opacity-80"
                        >
                            <Github size={16} />
                            GitHub
                        </A>
                    </div>
                </div>

                <div class="flex items-center justify-between max-sm:flex-col-reverse max-sm:gap-3">
                    <span class="text-sm font-medium text-neutral-200">
                        © {new Date().getFullYear()} An enhanced version of
                        Vencord.
                    </span>

                    <span class="text-sm font-medium text-neutral-200">
                        Made with ❤️ by the Equicord team
                    </span>
                </div>
            </div>
        </div>
    )
}
