import classNames from "classnames"
import { type JSX, splitProps } from "solid-js"

export type ButtonVariant = "primary" | "secondary" | "blue" | "red"

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: ButtonVariant
    icon?: JSX.Element
}

export default function Button(props: Props) {
    const [local, rest] = splitProps(props, [
        "variant",
        "class",
        "icon",
        "children",
    ])

    return (
        <button
            {...rest}
            class={classNames(
                "flex items-center justify-center gap-1 rounded-xl border px-6 py-3 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer active:enabled:scale-[.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
                local.class,
                {
                    "border-white bg-neutral-100 text-neutral-800 hover:enabled:bg-neutral-300 hover:enabled:text-neutral-900 focus-visible:ring-white":
                        local.variant === "primary",
                    "border-neutral-800/50 bg-neutral-900 text-neutral-300 hover:enabled:bg-neutral-800/70 hover:enabled:text-neutral-200 focus-visible:ring-neutral-500":
                        local.variant === "secondary",
                    "border-sky-700/50 bg-sky-900 text-sky-200 hover:enabled:bg-sky-800 focus-visible:ring-sky-500":
                        local.variant === "blue",
                    "border-red-300/50 bg-red-300 text-red-900 hover:enabled:bg-red-400 hover:enabled:text-red-950 focus-visible:ring-red-400":
                        local.variant === "red",
                },
            )}
        >
            {local.icon && <span class="flex-shrink-0">{local.icon}</span>}
            {local.children}
        </button>
    )
}
