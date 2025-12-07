import { createSignal, type JSX, Show, splitProps } from "solid-js"

interface Props extends Omit<
    JSX.InputHTMLAttributes<HTMLInputElement>,
    "onChange"
> {
    label?: string
    icon?: JSX.Element
    onChange?: JSX.EventHandler<HTMLInputElement, Event>
}

export default function Switch(props: Props) {
    const [local, rest] = splitProps(props, [
        "icon",
        "class",
        "label",
        "checked",
        "onChange",
    ])
    const [isChecked, setIsChecked] = createSignal(!!local.checked)

    const handleChange: JSX.EventHandler<HTMLInputElement, Event> = (event) => {
        setIsChecked(event.currentTarget.checked)
        local.onChange?.(event)
    }

    return (
        <label
            class={`group flex w-full cursor-pointer items-center justify-between gap-3 ${local.class ?? ""}`}
        >
            <div class="flex items-center gap-2">
                <Show when={local.icon}>{local.icon}</Show>

                <Show when={local.label}>
                    <span class="text-sm font-medium text-white">
                        {local.label}
                    </span>
                </Show>
            </div>

            <div
                class={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors duration-200 ${
                    isChecked()
                        ? "border-green-500 bg-green-400"
                        : "border-neutral-800 bg-neutral-950 group-hover:bg-neutral-900"
                }`}
            >
                <input
                    {...rest}
                    type="checkbox"
                    checked={isChecked()}
                    onChange={handleChange}
                    class="peer sr-only"
                />
                <span
                    class={`inline-block h-4 w-4 transform rounded-full shadow transition-all duration-200 ${
                        isChecked()
                            ? "translate-x-6 bg-green-950"
                            : "translate-x-1 bg-neutral-200"
                    }`}
                />
            </div>
        </label>
    )
}
