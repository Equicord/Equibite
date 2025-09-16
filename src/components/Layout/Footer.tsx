export default function Footer() {
    return (
        <div class="mt-25 w-full border-t border-neutral-900 bg-neutral-950 px-8 py-2">
            <div class="max-w-eq-lg mx-auto flex flex-col gap-12 px-6 py-6">
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
