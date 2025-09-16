import { type JSX, splitProps } from 'solid-js'

interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {
    icon?: JSX.Element
}

export default function Input(props: Props) {
    const [local, rest] = splitProps(props, ['icon', 'class'])

    return (
        <div class="flex flex-1 items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 focus-within:bg-neutral-900">
            {local.icon && (
                <span class="flex-shrink-0 text-neutral-400">{local.icon}</span>
            )}

            <input
                {...rest}
                class={`w-full bg-transparent text-sm font-medium text-white placeholder-neutral-600 outline-none ${local.class ?? ''}`}
            />
        </div>
    )
}
