import { Router, Route } from '@solidjs/router'
import RootLayout from '@/containers/RootLayout'

import Home from '@/views/Home'

const Routes = () => {
    return (
        <Router root={RootLayout}>
            <Route path="*404" />
            <Route path="/" component={Home} />
        </Router>
    )
}

export default Routes
