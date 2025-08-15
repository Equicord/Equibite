import { A } from '@solidjs/router'
import { TrafficCone, Github, Check, Merge } from 'lucide-solid'
import Button from '@components/UI/Button'

// Maybe make this dynamic in the future?
function Commits() {
    return (
        <div class="flex h-64 border-l border-neutral-800 pl-4 sm:pl-8">
            <div class="flex flex-col rounded-xl border border-neutral-800 bg-neutral-900 mask-b-from-80% md:w-72">
                <div class="flex flex-col gap-1 border-b border-neutral-800 py-3 pr-6 pl-4">
                    <span class="font-semibold">
                        Plugin: Patch optimizations
                    </span>

                    <p class="flex items-center gap-2 text-sm font-medium text-neutral-400">
                        Commited an hour ago
                        <Check class="text-green-500" size={16} />
                    </p>
                </div>

                <div class="flex flex-col gap-1 border-b border-neutral-800 py-3 pr-6 pl-4">
                    <span class="font-semibold">New Plugin (#324)</span>

                    <p class="flex items-center gap-2 text-sm font-medium text-neutral-400">
                        Commited 1 day ago
                        <Merge class="text-purple-500" size={16} />
                    </p>
                </div>

                <div class="flex flex-col gap-1 border-b border-neutral-800 py-3 pr-6 pl-4">
                    <span class="font-semibold">Plugin: Pagination</span>

                    <p class="flex items-center gap-2 text-sm font-medium text-neutral-400">
                        Commited 1 day ago
                        <Check class="text-green-500" size={16} />
                    </p>
                </div>

                <div class="flex flex-col gap-1 border-b border-neutral-800 py-3 pr-6 pl-4">
                    <span class="font-semibold">Merge branch 'dev'</span>

                    <p class="flex items-center gap-2 text-sm font-medium text-neutral-400">
                        Commited 2 days ago
                        <Merge class="text-purple-500" size={16} />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function FeatureMaintained() {
    return (
        <div class="flex justify-between gap-6 border-t border-b border-neutral-900 max-md:flex-col md:flex-row-reverse">
            <div class="flex w-full flex-col gap-6 bg-neutral-900 px-8 py-12 md:w-2/3 md:justify-between">
                <div class="flex flex-col gap-2">
                    <span class="flex items-center gap-2 text-xl font-semibold">
                        <TrafficCone fill="#ffffff10" size={24} />
                        Actively Maintained
                    </span>

                    <p class="font-medium text-neutral-400">
                        Active maintenance ensures every plugin remains safe and
                        compatible with any Discord changes.
                    </p>
                </div>

                <A
                    href="https://github.com/Equicord/Equicord"
                    target="_blank"
                    class="w-fit"
                >
                    <Button style="secondary" customClass="gap-2 font-medium">
                        <Github fill="#ffffff10" size={16} />
                        View repository
                    </Button>
                </A>
            </div>

            <div class="flex w-full items-center justify-center py-6 max-md:px-8 max-sm:gap-3">
                <Commits />
            </div>
        </div>
    )
}
