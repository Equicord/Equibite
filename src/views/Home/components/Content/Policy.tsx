import Button from "@components/UI/Button"
import { A } from "@solidjs/router"

import { Scroll } from "lucide-solid"

export default function Policy() {
    return (
        <div class="relative flex flex-col gap-2 overflow-hidden rounded-xl border border-neutral-900 p-12">
            <h2 class="text-xl font-bold">Cloud Privacy Policy</h2>

            <p class="font-medium text-neutral-400">
                We respect your privacy and collect only the 
                information necessary to provide our services.
            </p>

            <A href="/cloud/policy" target="_blank" class="mt-6 w-fit">
                <Button 
                    variant="secondary"
                    icon={<Scroll fill="#ffffff10" size={16} />}>
                    Read Privacy Policy
                </Button>
            </A>
        </div>
    )
}
