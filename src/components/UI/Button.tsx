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

export type Button = 'primary' | 'secondary'

function Button({ children, customClass, style, onclick }: Props) {
    return (
        <button
            class={classNames(
                customClass,
                'px-6 py-3 flex justify-center items-center font-bold rounded-xl transition-colors',
                {
                    'text-neutral-800 bg-white hover:bg-neutral-200':
                        style === 'primary',
                    'text-neutral-200 bg-neutral-800 hover:bg-neutral-700':
                        style === 'secondary',
                },
            )}
            onclick={onclick}
        >
            {children}
        </button>
    )
}

export default Button
