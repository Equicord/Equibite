import type { ParentProps } from 'solid-js'
import Navbar from '@components/Layout/Navbar'
import Footer from '@components/Layout/Footer'

export default function RootLayout({ children }: ParentProps) {
    return (
        <>
            <div class="max-w-page mx-auto px-6">
                <Navbar />
                {children}
            </div>
            <Footer />
        </>
    )
}
