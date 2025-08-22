import { CloudCheck, CloudDownload, Monitor } from 'lucide-solid'

function Cloud() {
    return (
        <div class="flex flex-col items-center gap-12">
            <div class="relative flex items-center gap-2 rounded-full bg-green-950 px-3 py-2 font-medium text-green-200">
                <CloudDownload size={16} />
                Cloud
                <div class="absolute top-4 right-0 -z-10 h-24 w-0.5 -rotate-45 bg-green-950" />
                <div class="absolute top-4 left-0 -z-10 h-24 w-0.5 rotate-45 bg-green-950" />
            </div>

            <div class="flex gap-24">
                <span class="flex items-center gap-2 rounded-full bg-neutral-900 px-3 py-2 font-medium text-neutral-200">
                    <Monitor class="text-neutral-400" size={16} />
                    Device
                </span>

                <span class="flex items-center gap-2 rounded-full bg-neutral-900 px-3 py-2 font-medium text-neutral-200">
                    <Monitor class="text-neutral-400" size={16} />
                    Device
                </span>
            </div>
        </div>
    )
}

export default function FeatureCloud() {
    return (
        <div class="relative flex justify-between gap-6 max-md:flex-col">
            <div class="flex w-full flex-col gap-6 rounded-xl bg-neutral-900 px-8 py-12 md:w-2/3 md:justify-between">
                <div class="flex flex-col gap-2">
                    <span class="flex items-center gap-2 text-xl font-semibold">
                        <CloudCheck fill="#ffffff10" size={24} />
                        Cloud based
                    </span>

                    <p class="font-medium text-neutral-400">
                        Sync your settings anytime with our dedicated Vencord
                        cloud instance for seamless experience across devices.
                    </p>
                </div>
            </div>

            <div class="flex w-full items-center justify-center py-6 max-md:px-8 max-sm:gap-3">
                <Cloud />
            </div>
        </div>
    )
}
