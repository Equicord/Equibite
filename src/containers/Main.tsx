import type { ParentProps } from 'solid-js'

export default function Main({ children }: ParentProps) {
    return <main class="max-w-read mx-auto py-24 px-6">{children}</main>
}
