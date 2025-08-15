import FeatureCloud from './Cloud'
import FeatureMaintained from './Maintained'
import FeaturePlugins from './Plugins'
import Community from './Community'
import Contribute from './Contribute'

export default function HomeContent() {
    return (
        <div class="flex flex-col border-r border-l border-neutral-900">
            <div class="flex flex-col gap-6">
                <FeaturePlugins />
                <FeatureMaintained />
                <FeatureCloud />
            </div>

            <div class="relative my-6 overflow-hidden border-t border-b border-neutral-900 py-32">
                <h1 class="text-center text-4xl font-bold text-neutral-200 sm:text-5xl">
                    and more!
                </h1>
                <div class="absolute inset-0 -z-10 h-96 w-full translate-y-40 bg-[url(/img/grid.svg)] mask-radial-[50%_50%] mask-radial-from-0% mask-radial-at-center bg-repeat opacity-5" />
            </div>

            <div class="flex justify-between gap-6 border-t border-b border-neutral-900 max-md:flex-col">
                <Community />
                <Contribute />
            </div>
        </div>
    )
}
