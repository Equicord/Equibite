export default function HomeFooter() {
    return (
        <div class="mt-20 flex flex-col gap-6 px-4 md:flex-row md:justify-between md:gap-3 md:px-0">
            <div class="flex flex-col items-center gap-3 md:items-start">
                <h2 class="text-2xl font-bold text-neutral-300">Equicord</h2>
                <p class="mb-4 text-center text-sm text-neutral-400 md:text-left">
                    © {new Date().getFullYear()} An enhanced version of
                    Vencord.
                </p>
            </div>
            <div class="flex flex-col items-center gap-3 md:items-start">
                <h2 class="text-2xl font-bold text-neutral-300">Links</h2>
                <div class="mb-4 flex gap-6 md:mb-0 md:gap-4">
                    <a
                        href="https://github.com/Equicord/Equicord"
                        class="text-sm text-neutral-400 transition-colors hover:text-neutral-200"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://equicord.org/discord"
                        class="text-sm text-neutral-400 transition-colors hover:text-neutral-200"
                    >
                        Discord
                    </a>
                </div>
            </div>
        </div>
    )
}
