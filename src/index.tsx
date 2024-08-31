/* @refresh reload */
import { render } from 'solid-js/web'
import { Router, Route } from '@solidjs/router'
import { lazy } from 'solid-js'

import '~/styles.css'
import Root from '~/containers/Root'

// Pages
import Fallback from '~/pages/Fallback'
import Home from '~/pages/Home'
const Developer = lazy(() => import('~/pages/Developer'))
const Plugins = lazy(() => import('~/pages/Plugin/Discovery'))

const root = document.getElementById('app') as HTMLDivElement
render(
    () => (
        <Router root={Root}>
            <Route path="*" component={Fallback} />
            <Route path="/developer/:id" component={Developer} />
            <Route path="/" component={Home} />
            <Route path="/plugins" component={Plugins} />
        </Router>
    ),
    root,
)
