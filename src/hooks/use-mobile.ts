import { createSignal, onMount } from 'solid-js'

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = createSignal(false)

    onMount(() => {
        const query = window.matchMedia('(any-pointer:coarse)')

        const listener = () => {
            setIsMobile(query.matches)
        }

        query.addEventListener('change', listener)

        listener()

        return () => {
            query.removeEventListener('change', listener)
        }
    })

    return isMobile
}
