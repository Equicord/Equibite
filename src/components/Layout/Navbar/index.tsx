// Hooks
// import { useLocation } from '@solidjs/router'
import { useIsMobile } from '~/hooks/useIsMobile'
import _Logo from '~/assets/logo.svg'

import Button from '~/components/Button'
import { Urls } from '~/constants'

import Fa from 'solid-fa'
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    // const location = useLocation()
    // TODO(naibuu): theres prolly a better way to do this
    const mobile = useIsMobile()

    // const isActive = (path: string) => {
    //     return path == location.pathname
    // }

    return (
        <nav class="py-8 flex justify-between items-center">
            <div class="flex items-center gap-6">
                <a href="/" class="size-10">
                    <img src={_Logo} draggable={false} />
                </a>
            </div>

            <div class="flex gap-3">
                {mobile() ? (
                    <Button style="secondary" customClass="!h-12 w-12">
                        <Fa icon={faBars} class="!size-5" />
                    </Button>
                ) : (
                    <>
                        <a href="/download">
                            <Button style="secondary">Download</Button>
                        </a>

                        <a href={Urls.DISCORD_URL} target="_blank">
                            <Button style="secondary" customClass="!h-12 w-12">
                                <Fa icon={faDiscord} class="!size-5" />
                            </Button>
                        </a>

                        <a href={Urls.GITHUB_URL} target="_blank">
                            <Button style="secondary" customClass="!h-12 w-12">
                                <Fa icon={faGithub} class="!size-5" />
                            </Button>
                        </a>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar
