import { onMount, onCleanup } from 'solid-js'

// TODO: do not let me cook
export const useOutsideClick = (
    ref: { current: HTMLDivElement | null },
    callback: () => void,
) => {
    const listener = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
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
