import Button from '@components/UI/Button'
import { A } from '@solidjs/router'
import { Github } from 'lucide-solid'

export default function Contribute() {
    return (
        <div class="relative flex flex-col gap-2 overflow-hidden rounded-xl border border-neutral-900 p-12">
            <h2 class="text-xl font-bold">Want to contribute?</h2>

            <p class="font-medium text-neutral-400">
                Most submitted plugins are accepted, with plugin requests
                actively handled to continuously expand the collection.
            </p>

            <A
                href="https://github.com/Equicord/Equicord"
                target="_blank"
                class="mt-6 w-fit"
            >
                <Button
                    variant="secondary"
                    icon={<Github fill="#ffffff10" size={16} />}
                >
                    View repository
                </Button>
            </A>

            <div class="absolute inset-0 -z-10 h-96 w-full -translate-y-44 bg-[url(/assets/grid.svg)] mask-radial-[50%_50%] mask-radial-from-0% mask-radial-at-center bg-repeat opacity-5 md:-translate-x-30 md:-translate-y-32" />
        </div>
    )
}
