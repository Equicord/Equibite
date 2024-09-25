import type { ParentProps } from 'solid-js'
import Navbar from '@/components/Layout/Navbar'

export default function RootLayout({ children }: ParentProps) {
    return (
        <>
            <main class="max-w-page mx-auto px-6">
                <Navbar />
                {children}
            </main>
        </>
    )
}
