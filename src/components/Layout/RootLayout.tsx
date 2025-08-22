import type { ParentProps } from 'solid-js'
import Navbar from '@components/Layout/Navbar'
import Footer from '@components/Layout/Footer'

export default function RootLayout({ children }: ParentProps) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}
