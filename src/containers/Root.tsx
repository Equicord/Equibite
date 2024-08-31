import type { ParentProps } from 'solid-js'
import Main from './Main'
import Navbar from '~/components/Layout/Navbar'

export default function Root({ children }: ParentProps) {
    return (
        <Main>
            <Navbar />
            {children}
        </Main>
    )
}
