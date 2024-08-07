import type { ParentProps } from 'solid-js'
import Navbar from '~/components/Layout/Navbar'

// TODO: Add a layout navbar
export default function Root({ children }: ParentProps) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
