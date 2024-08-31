import { createSignal, onCleanup } from 'solid-js'

export const useMousePosition = () => {
    const [position, setPosition] = createSignal({ x: 0, y: 0 })

    const listener = (event: MouseEvent) => {
        setPosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('mousemove', listener)

    onCleanup(() => {
        window.removeEventListener('mousemove', listener)
    })

    return position
}
