import RootLayout from '@containers/RootLayout'
import { Router, Route } from '@solidjs/router'

import Home from '@views/Home'
import Plugins from '@views/Plugins'
import Team from '@views/Team'

const NotFound = () => <h1>404 - Page Not Found</h1>;

const Routes = () => {
    return (
        <Router root={RootLayout}>
            <Route path="/" component={Home} />
            <Route path="/plugins" component={Plugins} />
            <Route path="/team" component={Team} />
            <Route path="*" component={NotFound}/>
        </Router>
    )
}

export default Routes
