import { onMount, type ParentProps } from 'solid-js'
import { Portal } from 'solid-js/web'
import { useOutsideClick } from '@hooks/use-outside-click'

interface Props extends ParentProps {
    onclose: () => void
}

export default function Modal({ children, onclose }: Props) {
    let ref!: HTMLDivElement

    onMount(() => {
        useOutsideClick(ref, onclose)
    })

    return (
        <Portal>
            <div class="fixed inset-0 w-full h-screen flex justify-center items-center bg-black/20 backdrop-blur-lg">
                <div ref={ref} class="z-10">
                    {children}
                </div>
            </div>
        </Portal>
    )
}
