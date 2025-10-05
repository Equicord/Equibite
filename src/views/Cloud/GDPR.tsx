import PageBootstrap from '@components/PageBootstrap'
import { Scroll } from 'lucide-solid'

export default function CloudGDPR() {
    return (
        <PageBootstrap
            meta={{ title: 'Cloud GDPR Policy' }}
            icon={<Scroll />}
            fullWidth
            title="Cloud GDPR Policy"
            description="GDPR policy for Equicord's cloud services."
        >
            <div class="prose prose-invert max-w-none">
                <p class="text-lg font-medium text-neutral-300 mb-8">
                    Last Updated: September 15, 2025
                </p>

                <section class="mb-8">
                    <h2 class="text-2xl font-bold mb-4">Introduction</h2>

                    <div class="bg-neutral-900/50 border border-neutral-700 rounded-lg p-4 mb-4">
                        <p class="text-sm font-medium text-neutral-300 mb-0">
                            <strong>TL;DR:</strong> We won't do anything bad
                            with your data, only use it for legitimate purposes,
                            and you can get it changed or removed anytime by
                            contacting privacy@equicord.org.
                        </p>
                    </div>

                    <p class="leading-relaxed font-medium text-neutral-400 mb-4">
                        We are a Data Controller of your information. Equicord's
                        legal basis for collecting and using personal
                        information depends on what we collect and the context:
                    </p>

                    <ul class="space-y-2 mb-4">
                        <li class="flex items-start gap-3">
                            <span class="text-blue-400 font-bold text-sm mt-0.5 min-w-[1.5rem]">
                                1.
                            </span>
                            <span class="font-medium text-neutral-300">
                                Equicord needs to perform a contract with you
                            </span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-blue-400 font-bold text-sm mt-0.5 min-w-[1.5rem]">
                                2.
                            </span>
                            <span class="font-medium text-neutral-300">
                                You have given Equicord permission to do so
                            </span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-blue-400 font-bold text-sm mt-0.5 min-w-[1.5rem]">
                                3.
                            </span>
                            <span class="font-medium text-neutral-300">
                                Processing your information is in Equicord's
                                legitimate interests
                            </span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-blue-400 font-bold text-sm mt-0.5 min-w-[1.5rem]">
                                4.
                            </span>
                            <span class="font-medium text-neutral-300">
                                Equicord needs to comply with the law
                            </span>
                        </li>
                    </ul>

                    <p class="leading-relaxed font-medium text-neutral-400 mb-4">
                        We only retain your personal information as long as
                        necessary for the purposes in this policy. We'll keep
                        and use your information to comply with legal
                        obligations, resolve disputes, and enforce our policies.
                    </p>

                    <p class="leading-relaxed font-medium text-neutral-400 mb-4">
                        If you're an EEA resident, you have data protection
                        rights. Contact us if you want to know what information
                        we hold or want it removed.
                    </p>

                    <h3 class="text-lg font-semibold text-neutral-200 mb-3">
                        Your Rights
                    </h3>
                    <ul class="space-y-2">
                        <li class="flex items-start gap-2">
                            <span class="text-green-400 font-bold mt-1">•</span>
                            <span class="font-medium text-neutral-300">
                                Access, update or delete your information
                            </span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-green-400 font-bold mt-1">•</span>
                            <span class="font-medium text-neutral-300">
                                Right of rectification
                            </span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-green-400 font-bold mt-1">•</span>
                            <span class="font-medium text-neutral-300">
                                Right to object
                            </span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-green-400 font-bold mt-1">•</span>
                            <span class="font-medium text-neutral-300">
                                Right of restriction
                            </span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-green-400 font-bold mt-1">•</span>
                            <span class="font-medium text-neutral-300">
                                Right to data portability
                            </span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-green-400 font-bold mt-1">•</span>
                            <span class="font-medium text-neutral-300">
                                Right to withdraw consent
                            </span>
                        </li>
                    </ul>
                </section>

                <section class="mb-8">
                    <h2 class="text-2xl font-bold mb-4">Log Files</h2>
                    <p class="leading-relaxed font-medium text-neutral-400 mb-4">
                        We use standard log files when you visit our website,
                        just like all hosting companies do for analytics
                        purposes.
                    </p>

                    <h3 class="text-lg font-semibold text-neutral-200 mb-3">
                        What We Collect
                    </h3>
                    <p class="leading-relaxed font-medium text-neutral-400">
                        IP addresses, browser type, ISP, timestamps, referring
                        pages, and click data. This information isn't linked to
                        personally identifiable information and is used for
                        analyzing trends, site administration, and gathering
                        demographic information.
                    </p>
                </section>

                <section class="mb-8">
                    <h2 class="text-2xl font-bold mb-4">
                        Children's Information
                    </h2>
                    <div class="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4 mb-4">
                        <p class="text-sm font-medium text-yellow-200 mb-0">
                            <strong>Important:</strong> We don't knowingly
                            collect information from children under 13.
                        </p>
                    </div>
                    <p class="leading-relaxed font-medium text-neutral-400">
                        We encourage parents to monitor their children's online
                        activity. If you believe your child provided information
                        on our website, contact us immediately and we'll remove
                        it promptly.
                    </p>
                </section>

                <section class="mb-8">
                    <h2 class="text-2xl font-bold mb-4">Scope</h2>
                    <p class="leading-relaxed font-medium text-neutral-400">
                        This policy applies only to our online activities and
                        website visitors. It doesn't cover information collected
                        offline or through other channels.
                    </p>
                </section>

                <section class="mb-8">
                    <h2 class="text-2xl font-bold mb-4">Consent</h2>
                    <p class="leading-relaxed font-medium text-neutral-400">
                        By using our website, you consent to this Privacy Policy
                        and our data collection practices as described above.
                    </p>
                </section>

                <div class="mt-12 p-6 bg-neutral-900 border border-neutral-700 rounded-lg">
                    <h3 class="text-lg font-semibold text-neutral-200 mb-2">
                        Questions?
                    </h3>
                    <p class="text-sm font-medium text-neutral-400">
                        Contact us at{' '}
                        <a
                            href="mailto:privacy@equicord.org"
                            class="text-blue-400 hover:text-blue-300 underline"
                        >
                            privacy@equicord.org
                        </a>{' '}
                        for any privacy-related concerns.
                    </p>
                </div>
            </div>
        </PageBootstrap>
    )
}
