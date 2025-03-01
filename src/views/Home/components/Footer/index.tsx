export default function HomeFooter() {
    return (
            <div class="mt-20 flex flex-col md:flex-row md:justify-between gap-6 md:gap-3 px-4 md:px-0">
                <div class="flex flex-col gap-3 items-center md:items-start">
                    <h2 class="text-2xl text-neutral-300 font-bold">Equicord</h2>
                    <p class="text-sm text-neutral-400 mb-4 text-center md:text-left">
                        © {new Date().getFullYear()} An enhanced version of Vencord.
                    </p>
                </div>
                <div class="flex flex-col gap-3 items-center md:items-start">
                    <h2 class="text-2xl text-neutral-300 font-bold">Links</h2>
                    <div class="flex gap-6 md:gap-4 mb-4 md:mb-0">
                        <a href="https://github.com/Equicord/Equicord" class="text-sm text-neutral-400 hover:text-neutral-200 transition-colors">GitHub</a>
                        <a href="https://discord.gg/gQ79NCNKuM" class="text-sm text-neutral-400 hover:text-neutral-200 transition-colors">Discord</a>
                    </div>
                </div>
        </div>
    )
}
