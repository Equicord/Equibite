import RootLayout from '@components/Layout/RootLayout'
import { MetaProvider } from '@solidjs/meta'
import { Route, Router } from '@solidjs/router'
import { Toaster } from 'solid-toast'

import Cloud from '@views/Cloud'
import CloudGDPR from '@views/Cloud/GDPR'
import CloudPolicy from '@views/Cloud/Policy'
import Discord from '@views/Discord'
import Download from '@views/Download'
import Home from '@views/Home'
import NotFound from '@views/NotFound'
import Plugins from '@views/Plugins'
import PluginDetails from '@views/Plugins/Details'
import Projects from '@views/Projects'
import Team from '@views/Team'

// Remove at some point.
import Icons from '@views/Icons'

export default function Routes() {
    return (
        <MetaProvider>
            <Toaster position="top-right" gutter={8} />
            <Router root={RootLayout}>
                <Route path="/" component={Home} />
                <Route path="/projects" component={Projects} />
                <Route path="/plugins" component={Plugins} />
                <Route path="/plugins/:name" component={PluginDetails} />
                <Route path="/cloud" component={Cloud} />
                <Route path="/cloud/policy" component={CloudPolicy} />
                <Route path="/cloud/gdpr" component={CloudGDPR} />
                <Route path="/icons" component={Icons} />
                <Route path="/download" component={Download} />
                <Route path="/team" component={Team} />
                <Route path="/discord" component={Discord} />
                <Route path="*" component={NotFound} />
            </Router>
        </MetaProvider>
    )
}
