import PageBootstrap from "@components/PageBootstrap";
import { Scroll } from "lucide-react";
import Link from "next/link";

export default function CloudPolicy() {
    return (
        <PageBootstrap
            meta={{ title: "Cloud Privacy Policy" }}
            icon={<Scroll />}
            fullWidth
            title="Cloud Policy"
            description="Privacy policy for Equicord's cloud services."
        >
            <div className="prose prose-invert max-w-none">
                <p className="text-lg font-medium text-neutral-300 mb-8">
                    Last Updated: April 9, 2026
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Introduction</h2>

                    <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4 mb-4">
                        <p className="text-sm font-medium text-blue-200 mb-0">
                            <strong>Key Point:</strong> This policy only applies
                            if you enable cloud services. Without cloud enabled,
                            Equicord doesn&apos;t collect any data about you.
                        </p>
                    </div>

                    <p className="leading-relaxed font-medium text-neutral-400">
                        We take your privacy seriously and collect as little
                        information as possible, using it only for purposes
                        absolutely necessary to provide our services. Learn more
                        in our{" "}
                        <Link
                            href="/cloud/gdpr"
                            className="text-blue-400 hover:text-blue-300 underline"
                        >
                            GDPR policy
                        </Link>
                        .
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">What We Store</h2>
                    <p className="leading-relaxed font-medium text-neutral-400 mb-4">
                        We only store information you provide to us:
                    </p>

                    <div className="space-y-4">
                        <div className="bg-neutral-900/50 border border-neutral-700 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-neutral-200 mb-2">
                                Discord User ID Hash
                            </h3>
                            <p className="text-sm font-medium text-neutral-400">
                                We store the SHA-256 hash of your Discord user
                                ID to uniquely identify your data. This is a
                                one-way hash that cannot be reversed to reveal
                                your actual Discord ID.
                            </p>
                        </div>

                        <div className="bg-neutral-900/50 border border-neutral-700 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-neutral-200 mb-2">
                                Your Settings
                            </h3>
                            <p className="text-sm font-medium text-neutral-400">
                                Your Equicord settings are securely stored on
                                our servers, tied to only your generated hash
                                and able to synchronize across devices.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">
                        How We Use Your Information
                    </h2>
                    <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4 mb-4">
                        <p className="text-sm font-medium text-green-200 mb-0">
                            <strong>Simple Promise:</strong> We only use your
                            data for the services you&apos;ve enabled. We never
                            share it with third parties unless required by law.
                        </p>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
                    <p className="leading-relaxed font-medium text-neutral-400 mb-4">
                        We keep your data only as long as necessary to provide
                        our services.
                    </p>

                    <h3 className="text-lg font-semibold text-neutral-200 mb-3">
                        Delete Your Data
                    </h3>
                    <p className="leading-relaxed font-medium text-neutral-400 mb-4">
                        You can permanently delete all your data at any time:
                    </p>

                    <ul className="space-y-2">
                        <li className="flex items-start gap-3">
                            <span className="text-red-400 font-bold text-sm mt-0.5 min-w-6">
                                •
                            </span>
                            <span className="font-medium text-neutral-300">
                                Use the &quot;Erase All Data&quot; button in
                                Equicord Cloud settings
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-400 font-bold text-sm mt-0.5 min-w-6">
                                •
                            </span>
                            <span className="font-medium text-neutral-300">
                                Email us at{" "}
                                <a
                                    href="mailto:privacy@equicord.org"
                                    className="text-blue-400 hover:text-blue-300 underline"
                                >
                                    privacy@equicord.org
                                </a>
                            </span>
                        </li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Policy Changes</h2>
                    <p className="leading-relaxed font-medium text-neutral-400 mb-4">
                        We&apos;ll update this policy if we add new services
                        that require storing additional data.
                    </p>

                    <p className="leading-relaxed font-medium text-neutral-400">
                        You&apos;ll be notified of changes via announcements on
                        our Discord server, and the update date at the top of
                        this page will always reflect the latest version.
                    </p>
                </section>

                <div className="mt-12 p-6 bg-neutral-900 border border-neutral-700 rounded-lg">
                    <h3 className="text-lg font-semibold text-neutral-200 mb-2">
                        Questions About Your Privacy?
                    </h3>
                    <p className="text-sm font-medium text-neutral-400 mb-3">
                        Contact us at{" "}
                        <a
                            href="mailto:privacy@equicord.org"
                            className="text-blue-400 hover:text-blue-300 underline"
                        >
                            privacy@equicord.org
                        </a>{" "}
                        for any privacy concerns.
                    </p>
                    <p className="text-xs text-neutral-500">
                        Also see our{" "}
                        <Link
                            href="/cloud/gdpr"
                            className="text-blue-400 hover:text-blue-300 underline"
                        >
                            GDPR policy
                        </Link>{" "}
                        for additional legal information.
                    </p>
                </div>
            </div>
        </PageBootstrap>
    );
}
