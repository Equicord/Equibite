/* @refresh reload */
import { render } from 'solid-js/web'
import { Router, Route } from '@solidjs/router'

import { warn } from '~/utils/warn'
import '~/utils/index.css'

// Pages
import Fallback from '~/pages/Fallback'
import Home from '~/pages/Home'

warn()

const root = document.getElementById('app') as HTMLDivElement
render(
    () => (
        <Router>
            <Route path="*" component={Fallback} />
            <Route path="/" component={Home} />
        </Router>
    ),
    root,
)
