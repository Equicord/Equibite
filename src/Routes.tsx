import RootLayout from '@components/Layout/RootLayout'
import { Router, Route } from '@solidjs/router'
import { MetaProvider } from '@solidjs/meta'

import Home from '@views/Home'
import Download from '@views/Download'
import DownloadThanks from '@views/Download/Thanks'
import Plugins from '@views/Plugins'
import PluginDetails from '@views/Plugins/Details'
import Team from '@views/Team'

// Todo: Rewrite these pages.
import Icons from '@views/Icons'
import FreeNitro from '@views/Freenitro'

import NotFound from '@views/NotFound'

export default function Routes() {
    return (
        <MetaProvider>
            <Router root={RootLayout}>
                <Route path="/" component={Home} />
                <Route path="/plugins" component={Plugins} />
                <Route path="/plugins/:name" component={PluginDetails} />
                <Route path="/team" component={Team} />
                <Route path="/icons" component={Icons} />
                <Route path="/freenitro" component={FreeNitro} />
                <Route path="/download" component={Download} />
                <Route path="/download/thanks" component={DownloadThanks} />
                <Route path="*" component={NotFound} />
            </Router>
        </MetaProvider>
    )
}
