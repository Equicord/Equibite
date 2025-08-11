import type { ParentProps } from 'solid-js'
import classNames from 'classnames'

interface Props extends ParentProps {
    // Custom Class
    customClass?: string
    // Button Style
    style: Button
    // Click
    onclick?: () => void
}

export type Button = 'primary' | 'secondary' | 'blue'

function Button({ children, customClass, style, onclick }: Props) {
    return (
        <button
            class={classNames(
                customClass,
                'flex cursor-pointer items-center justify-center gap-1 rounded-xl px-6 py-3 font-bold transition-colors',
                {
                    'bg-white text-neutral-800 hover:bg-neutral-200':
                        style === 'primary',
                    'bg-neutral-800 text-neutral-200 hover:bg-neutral-700':
                        style === 'secondary',
                    'bg-sky-900 text-sky-200 hover:bg-sky-800':
                        style === 'blue',
                },
            )}
            onclick={onclick}
        >
            {children}
        </button>
    )
}

export default Button
