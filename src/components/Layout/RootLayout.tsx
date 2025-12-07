import Footer from "@components/Layout/Footer"
import Navbar from "@components/Layout/Navbar"
import type { ParentProps } from "solid-js"

export default function RootLayout({ children }: ParentProps) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}
