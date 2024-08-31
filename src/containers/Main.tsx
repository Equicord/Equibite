import type { ParentProps } from 'solid-js'

export default function Main({ children }: ParentProps) {
    return <main class="max-w-page mx-auto px-6">{children}</main>
}
