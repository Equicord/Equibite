import classNames from 'classnames'
import { type JSX, splitProps } from 'solid-js'

export type ButtonStyle = 'primary' | 'secondary' | 'blue' | 'red'

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    style: ButtonStyle
    icon?: JSX.Element
}

export default function Button(props: Props) {
    const [local, rest] = splitProps(props, [
        'style',
        'class',
        'icon',
        'children',
    ])

    return (
        <button
            {...rest}
            class={classNames(
                'flex cursor-pointer items-center justify-center gap-1 rounded-xl border px-6 py-3 font-bold transition-all active:scale-[.95]',
                local.class,
                {
                    'border-white bg-neutral-100 text-neutral-800 hover:bg-neutral-300 hover:text-neutral-900':
                        local.style === 'primary',
                    'border-neutral-800/50 bg-neutral-900 text-neutral-300 hover:bg-neutral-800/70 hover:text-neutral-200':
                        local.style === 'secondary',
                    'border-sky-700/50 bg-sky-900 text-sky-200 hover:bg-sky-800':
                        local.style === 'blue',
                    'border-red-300/50 bg-red-300 text-red-900 hover:bg-red-400 hover:text-red-950':
                        local.style === 'red',
                },
            )}
        >
            {local.icon && <span class="flex-shrink-0">{local.icon}</span>}
            {local.children}
        </button>
    )
}
