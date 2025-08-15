import RootLayout from '@components/Layout/RootLayout'
import { Router, Route } from '@solidjs/router'

import Home from '@views/Home'
import Download from '@views/Download'
import Plugins from '@views/Plugins'

// Todo: Rewrite these pages.
import Icons from '@views/Icons'
import Team from '@views/Team'
import ColorGen from '@views/Colorgen'
import FreeNitro from '@views/Freenitro'

const NotFound = () => <h1>404 - Page Not Found</h1>

export default function Routes() {
    return (
        <Router root={RootLayout}>
            <Route path="/" component={Home} />
            <Route path="/plugins" component={Plugins} />
            <Route path="/team" component={Team} />
            <Route path="/icons" component={Icons} />
            <Route path="/colorgen" component={ColorGen} />
            <Route path="/freenitro" component={FreeNitro} />
            <Route path="/download" component={Download} />
            <Route path="*" component={NotFound} />
        </Router>
    )
}
