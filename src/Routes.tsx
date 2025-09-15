import RootLayout from '@components/Layout/RootLayout'
import { MetaProvider } from '@solidjs/meta'
import { Route, Router } from '@solidjs/router'
import { Toaster } from 'solid-toast'

import Cloud from '@views/Cloud'
import CloudPolicy from '@views/Cloud/Policy'
import Download from '@views/Download'
import DownloadThanks from '@views/Download/Thanks'
import Home from '@views/Home'
import Plugins from '@views/Plugins'
import PluginDetails from '@views/Plugins/Details'
import Team from '@views/Team'

// Todo: Rewrite these pages.
import Icons from '@views/Icons'

import NotFound from '@views/NotFound'
import Discord from '@views/Discord'

export default function Routes() {
    return (
        <MetaProvider>
            <Toaster position="top-right" gutter={8} />
            <Router root={RootLayout}>
                <Route path="/" component={Home} />
                <Route path="/plugins" component={Plugins} />
                <Route path="/plugins/:name" component={PluginDetails} />
                <Route path="/team" component={Team} />
                <Route path="/icons" component={Icons} />
                <Route path="/download" component={Download} />
                <Route path="/download/thanks" component={DownloadThanks} />
                <Route path="/cloud" component={Cloud} />
                <Route path="/cloud/policy" component={CloudPolicy} />
                <Route path="/discord" component={Discord} />
                <Route path="*" component={NotFound} />
            </Router>
        </MetaProvider>
    )
}
