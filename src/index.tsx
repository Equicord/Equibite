/* @refresh reload */
import './index.css'

import { render } from 'solid-js/web'
import Routes from './router'

const root = document.getElementById('app') as HTMLDivElement
render(() => <Routes />, root)
