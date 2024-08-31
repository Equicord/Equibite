import { type ParentProps, createSignal, onCleanup, onMount } from 'solid-js'
import { useIsReducedMotion } from '~/hooks/useIsReducedMotion'

interface Props extends ParentProps {
    // Custom Class
    customClass?: string
    // Direction
    direction?: Direction
    // Offset
    offset?: number
    // Duration
    duration?: number
    // Delay
    delay?: number
    // Ignore reduced motion
    ignoreReducedMotion?: boolean
}

export type Direction = 'up' | 'down' | 'left' | 'right'

const Animate = ({
    children,
    customClass,
    direction,
    offset = 50,
    duration = 0.5,
    delay = 0,
    ignoreReducedMotion = false,
}: Props) => {
    const [animate, setAnimate] = createSignal(false)
    let ref!: HTMLDivElement

    const prefersReducedMotion = useIsReducedMotion()

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setAnimate(true)
                observer.disconnect()
            }
        },
        { threshold: 0.5 },
    )

    // When mounted start the observer
    onMount(() => {
        if (prefersReducedMotion() && !ignoreReducedMotion) return

        if (ref) observer.observe(ref)
    })

    // When unmounted cleanup the observer
    onCleanup(() => observer.disconnect())

    const initial = () => {
        switch (direction) {
            case 'up':
                return `translateY(${offset}px)`
            case 'down':
                return `translateY(-${offset}px)`
            case 'left':
                return `translateX(${offset}px)`
            case 'right':
                return `translateX(-${offset}px)`
        }
    }

    const styles = () => ({
        opacity: animate() ? 1 : 0,
        transform: animate() && direction ? 'translate(0, 0)' : initial(),
        transition: `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`,
    })

    return (
        <div ref={ref} style={styles()} class={customClass}>
            {children}
        </div>
    )
}

export default Animate
