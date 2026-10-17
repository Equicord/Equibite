import Button from "@components/UI/Button";
import {
    Cloud as CloudIcon,
    CloudDownload,
    CloudFog,
    Monitor,
} from "lucide-react";
import Link from "next/link";

function Cloud() {
    return (
        <div className="flex flex-col items-center gap-12">
            <div className="relative flex items-center gap-2 rounded-full bg-green-950 px-3 py-2 font-medium text-green-200">
                <CloudDownload size={16} />
                Cloud
                <div className="absolute top-4 right-0 -z-10 h-24 w-0.5 -rotate-45 bg-green-950" />
                <div className="absolute top-4 left-0 -z-10 h-24 w-0.5 rotate-45 bg-green-950" />
            </div>

            <div className="flex gap-24">
                <span className="flex items-center gap-2 rounded-full bg-neutral-900 px-3 py-2 font-medium text-neutral-200">
                    <Monitor className="text-neutral-400" size={16} />
                    Device
                </span>

                <span className="flex items-center gap-2 rounded-full bg-neutral-900 px-3 py-2 font-medium text-neutral-200">
                    <Monitor className="text-neutral-400" size={16} />
                    Device
                </span>
            </div>
        </div>
    );
}

export default function FeatureCloud() {
    return (
        <div className="relative flex justify-between gap-6 max-md:flex-col">
            <div className="flex w-full flex-col gap-6 rounded-xl bg-neutral-900 px-8 py-12 md:w-2/3 md:justify-between">
                <div className="flex flex-col gap-2">
                    <span className="flex items-center gap-2 text-xl font-semibold">
                        <CloudIcon fill="#ffffff10" size={24} />
                        Cloud based
                    </span>

                    <p className="font-medium text-neutral-400">
                        Sync your settings anytime with our dedicated Equicord
                        cloud instance for a seamless experience across devices.
                    </p>

                    <Link href="/cloud" className="mt-6 w-fit">
                        <Button
                            variant="secondary"
                            icon={<CloudFog fill="#ffffff10" size={16} />}
                        >
                            Read more
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex w-full items-center justify-center py-6 max-md:px-8 max-sm:gap-3">
                <Cloud />
            </div>
        </div>
    );
}
