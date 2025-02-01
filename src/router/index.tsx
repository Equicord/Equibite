import { Router, Route } from '@solidjs/router'
import RootLayout from '@/containers/RootLayout'

import Home from '@/views/Home'
import Plugins from '@/views/Plugins'

const Routes = () => {
    return (
        <Router root={RootLayout}>
            <Route path="*404" />
            <Route path="/" component={Home} />
            <Route path="/plugins" component={Plugins} />
        </Router>
    )
}

export default Routes
