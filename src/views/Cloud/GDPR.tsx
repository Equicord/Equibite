
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
            <h2 class="text-lg font-semibold text-neutral-300">
                Last Updated: 9/15/2025
            </h2>

            <div class="flex flex-col gap-3">
                <h1 class="text-2xl font-bold">Introduction</h1>
                <p class="leading-relaxed font-medium text-neutral-400">
                    This is the scary legal bit that we need to have (by law) to make sure that we are GDPR compliant. Long story short, we swear we won't do anything bad with your data, that we only use it for good and legitimate purposes, and that you can get it changed or removed at any time by contacting us at privacy@equicord.org.
                    We are a Data Controller of your information.
                    Equicord's legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Information we collect and the specific context in which we collect the information:
                </p>
                <ul class="ml-5 list-decimal font-medium text-neutral-300">
                    <li>
                        Equicord needs to perform a contract with you
                    </li>
                    <li>
                        You have given Equicord permission to do so
                    </li>
                    <li>
                        Processing your personal information is in Equicord's legitimate interests
                    </li>
                    <li>
                        Equicord needs to comply with the law
                    </li>
                </ul>

                <p class="leading-relaxed font-medium text-neutral-400">
                    Equicord will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy.We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.

                    If you are a resident of the European Economic Area (EEA), you have certain data protection rights.If you wish to be informed what Personal Information we hold about you and if you want it to be removed from our systems, please contact us.

                    In certain circumstances, you have the following data protection rights:
                </p>

                <ul class="ml-5 list-decimal font-medium text-neutral-300">
                    <li>
                        The right to access, update or to delete the information we have on you
                    </li>
                    <li>
                        The right of rectification
                    </li>
                    <li>
                        The right to object
                    </li>
                    <li>
                        The right of restriction
                    </li>
                    <li>
                        The right to data portability
                    </li>
                    <li>
                        The right to withdraw consent
                    </li>
                </ul>
            </div>

            <div class="mt-6 flex flex-col gap-3">
                <h1 class="text-2xl font-bold">Log Files</h1>
                <p class="leading-relaxed font-medium text-neutral-400">
                    Equicord follows a standard procedure of using log files.These files log visitors when they visit websites.All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
                </p>
            </div>

            <div class="mt-6 flex flex-col gap-3">
                <h1 class="text-2xl font-bold">Children's Information</h1>
                <p class="leading-relaxed font-medium text-neutral-400">
                    Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                    Equicord does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
                </p>
            </div>

            <div class="mt-6 flex flex-col gap-3">
                <h1 class="text-2xl font-bold">Online Privacy Policy Only</h1>
                <p class="leading-relaxed font-medium text-neutral-400">
                    This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Equicord. This policy is not applicable to any information collected offline or via channels other than this website.
                </p>
            </div>

            <div class="mt-6 flex flex-col gap-3">
                <h1 class="text-2xl font-bold">
                    Consent
                </h1>
                <p class="leading-relaxed font-medium text-neutral-400">
                    This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Equicord. This policy is not applicable to any information collected offline or via channels other than this website.
                    By using our website, you hereby consent to our Privacy Policy.
                </p>
            </div>
        </PageBootstrap >
    )
}