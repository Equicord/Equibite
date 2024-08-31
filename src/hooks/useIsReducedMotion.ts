import { createSignal, onMount } from 'solid-js'

export const useIsReducedMotion = () => {
    const [isReducedMotion, setIsReducedMotion] = createSignal(false)

    onMount(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)')

        const listener = () => {
            setIsReducedMotion(query.matches)
        }

        query.addEventListener('change', listener)

        listener()

        return () => {
            query.removeEventListener('change', listener)
        }
    })

    return isReducedMotion
}
