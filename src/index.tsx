/* @refresh reload */
import { render } from 'solid-js/web'
import { consoleWarn } from './utils/warn'

import './index.css'
import Page from './page'

consoleWarn()

const app = () => <Page />

const root = document.getElementById('app') as HTMLDivElement
render(app, root)
