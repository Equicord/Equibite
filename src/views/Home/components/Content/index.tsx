import FeatureCloud from "./Cloud"
import Community from "./Community"
import Contribute from "./Contribute"
import FeatureMaintained from "./Maintained"
import FeaturePlugins from "./Plugins"

export default function HomeContent() {
    return (
        <div class="max-w-eq-lg mx-auto px-6">
            <h1 class="pt-12 pb-48 text-center text-4xl font-bold text-neutral-200 sm:text-5xl">
                What's special?
            </h1>

            <div class="flex flex-col">
                <div class="flex flex-col gap-12">
                    <FeaturePlugins />
                    <FeatureMaintained />
                    <FeatureCloud />
                </div>

                <h1 class="py-32 text-center text-4xl font-bold text-neutral-200 sm:text-5xl">
                    and more!
                </h1>

                <div class="flex justify-between gap-6 max-md:flex-col">
                    <Community />
                    <Contribute />
                </div>
            </div>
        </div>
    )
}
