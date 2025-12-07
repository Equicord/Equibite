import { ChevronDown, ChevronUp } from "lucide-solid"
import { For, type JSX, Show, createSignal, onCleanup, onMount } from "solid-js"

export interface DropdownItem<T extends string | number = string> {
    label: string
    value: T
    icon?: JSX.Element
}

interface Props<T extends string | number = string> {
    icon?: JSX.Element
    items: DropdownItem<T>[]
    placeholder?: string
    selected?: DropdownItem<T> | null
    onSelect?: (item: DropdownItem<T>) => void
}

export default function Dropdown<T extends string | number = string>(
    props: Props<T>,
) {
    const [open, setOpen] = createSignal(false)
    let containerRef: HTMLDivElement | undefined

    const toggle = () => setOpen((open) => !open)
    const close = () => setOpen(false)

    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef && !containerRef.contains(event.target as Node)) {
            close()
        }
    }

    const handleSelect = (item: DropdownItem<T>) => {
        props.onSelect?.(item)
        close()
    }

    onMount(() => {
        document.addEventListener("click", handleClickOutside)
    })

    onCleanup(() => {
        document.removeEventListener("click", handleClickOutside)
    })

    return (
        <div ref={containerRef} class="relative w-full">
            <button
                onClick={toggle}
                aria-haspopup="listbox"
                aria-expanded={open()}
                class={`flex w-full cursor-pointer items-center gap-1 justify-between rounded-lg border border-neutral-800 px-3 py-3 font-medium transition-colors hover:bg-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${open() ? "bg-neutral-900 text-white" : "bg-neutral-950 text-neutral-400"}`}
            >
                <div class="flex flex-1 justify-between items-center gap-1">
                    <span class="flex items-center gap-1">
                        <Show when={props.icon}>{props.icon}</Show>
                        {props.placeholder ?? "Select option"}
                    </span>

                    <Show when={props.selected}>
                        <span class="rounded bg-green-400 px-2 py-0.5 text-xs font-semibold text-green-950">
                            {props.selected!.label}
                        </span>
                    </Show>
                </div>

                {open() ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {/* Menu */}
            <Show when={open()}>
                <div
                    role="listbox"
                    class="absolute z-50 mt-2 flex w-full flex-col divide-y divide-neutral-800 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 shadow-lg"
                >
                    <For each={props.items}>
                        {(item) => (
                            <button
                                role="option"
                                aria-selected={
                                    props.selected?.value === item.value
                                }
                                class="flex w-full cursor-pointer items-center gap-2 px-3 py-3 font-medium text-neutral-200 hover:bg-neutral-800/70 focus-visible:bg-neutral-800/70 focus-visible:outline-none transition-colors duration-150"
                                onClick={() => handleSelect(item)}
                            >
                                <Show when={item.icon}>{item.icon}</Show>

                                {item.label}
                            </button>
                        )}
                    </For>
                </div>
            </Show>
        </div>
    )
}
