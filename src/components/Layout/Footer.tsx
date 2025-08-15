import { A } from '@solidjs/router'
import Logo from '@assets/logo.svg'

export default function Footer() {
    return (
        <div class="mt-32 w-full bg-neutral-900 px-8 py-12">
            <div class="max-w-page mx-auto flex flex-col gap-12">
                <div class="flex justify-between gap-6 max-md:flex-col max-md:items-center">
                    <div class="flex max-w-92 flex-col items-center gap-3 md:items-start">
                        <span class="flex items-center gap-3 text-xl font-semibold">
                            <img
                                src={Logo}
                                width={40}
                                height={40}
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

                    <div class="flex flex-col items-center gap-1">
                        <span class="text-sm font-medium text-neutral-400">
                            Socials
                        </span>

                        <A
                            href="https://discord.gg/Dsy4sv7aad"
                            target="_blank"
                            class="text-lg font-medium"
                        >
                            Discord
                        </A>

                        <A
                            href="https://github.com/Equicord"
                            target="_blank"
                            class="text-lg font-medium"
                        >
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
