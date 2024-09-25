import { onMount, onCleanup } from 'solid-js'

export const useOutsideClick = (
    ref: HTMLDivElement | null,
    callback: () => void,
) => {
    const listener = (event: MouseEvent) => {
        if (ref && !ref.contains(event.target as Node)) {
            callback()
        }
    }

    onMount(() => {
        document.addEventListener('mousedown', listener)

        onCleanup(() => {
            document.removeEventListener('mousedown', listener)
        })
    })
}
