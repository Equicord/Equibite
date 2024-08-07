import { createSignal, type JSXElement, onCleanup, onMount } from 'solid-js'

interface Props {
    children: JSXElement
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
}

export type Direction = 'up' | 'down' | 'left' | 'right'

const Animate = ({
    children,
    customClass,
    direction,
    offset = 50,
    duration = 0.5,
    delay = 0,
}: Props) => {
    const [animate, setAnimate] = createSignal(false)
    let ref: HTMLDivElement | undefined

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                observer.disconnect()
                console.log('[Observer] Entry is in view, animating...')
                setAnimate(true)
            }
        },
        { threshold: 0.5 },
    )

    // TODO: Refactor this
    // const observer = new IntersectionObserver(
    //     (entries) =>
    //         entries.forEach((entry) => {
    //             if (entry.isIntersecting) {
    //                 setAnimate(true)
    //                 observer.disconnect()
    //             }
    //         }),
    //     { threshold: 0.1 },
    // )

    // When mounted start the observer
    onMount(() => {
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
        transition: `all ${duration}s ease ${delay}s`,
    })

    return (
        <div ref={ref} style={styles()} class={customClass}>
            {children}
        </div>
    )
}

export default Animate
