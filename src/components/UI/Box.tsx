import type { PropsWithChildren } from 'solid-js'

export default function Box({ children }: PropsWithChildren) {
    return <div class="px-2 py-2">{children}</div>
}
