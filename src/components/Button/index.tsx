import type { JSX } from 'solid-js'
import classNames from 'classnames'

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    // Custom Class
    customClass?: string
    // Button Style
    style: Button
    // Use extended width
    full?: boolean
}

export type Button = 'primary' | 'secondary'

const Button = ({ children, customClass, style, full, ...rest }: Props) => {
    return (
        <button
            class={classNames(
                customClass,
                full ? 'w-full' : 'w-fit',
                'px-6 py-3 flex justify-center items-center gap-1 text-md max-md:text-sm font-bold rounded-xl transition-all',
                {
                    'text-neutral-800 bg-white hover:bg-neutral-200':
                        style === 'primary',
                    'text-neutral-200 bg-neutral-800 hover:bg-neutral-700':
                        style === 'secondary',
                },
            )}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button
