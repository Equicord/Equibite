import RootLayout from '@containers/RootLayout'
import { Router, Route } from '@solidjs/router'
import { MetaProvider } from '@solidjs/meta'
import Home from '@views/Home'
import Icons from '@views/Icons'
import Plugins from '@views/Plugins'
import Team from '@views/Team'
import ColorGen from '@views/Colorgen'
import FreeNitro from '@views/Freenitro'

const NotFound = () => <h1>404 - Page Not Found</h1>;

const Routes = () => {
    return (
        <MetaProvider>
            <Router root={RootLayout}>
                <Route path="/" component={Home} />
                <Route path="/plugins" component={Plugins} />
                <Route path="/team" component={Team} />
                <Route path="/icons" component={Icons} />
                <Route path="/colorgen" component={ColorGen} />
                <Route path="/freenitro" component={FreeNitro} />
                <Route path="*" component={NotFound} />
            </Router>
        </MetaProvider>
    )
}

export default Routes