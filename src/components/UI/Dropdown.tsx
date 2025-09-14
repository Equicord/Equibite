import { type JSX, createSignal, For, Show, onCleanup } from 'solid-js'
import { ChevronDown, ChevronUp } from 'lucide-solid'

const [openDropdown, setOpenDropdown] = createSignal<string | null>(null)

interface DropdownItem {
    label: string
    value?: string | number
    icon?: JSX.Element
    onSelect?: () => void
}

interface Props {
    id: string
    icon?: JSX.Element
    items: DropdownItem[]
    placeholder?: string
    selected?: DropdownItem | null
    onSelect?: (item: DropdownItem) => void
    openDropdown?: string | null
    setOpenDropdown?: (id: string | null) => void
}

export default function Dropdown(props: Props) {
    const isOpen = () => props.id === props.openDropdown

    const toggle = () => {
        if (!props.setOpenDropdown) return
        props.setOpenDropdown(isOpen() ? null : props.id)
    }

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        if (!target.closest('.dropdown-container')) props.setOpenDropdown?.(null)
    }

    const handleSelect = (item: DropdownItem) => {
        props.onSelect?.(item)
        props.setOpenDropdown?.(null)
    }
    document.addEventListener('click', handleClickOutside)

    onCleanup(() => document.removeEventListener('click', handleClickOutside))

    return (
        <div class="dropdown-container relative w-full">
            <button
                onClick={toggle}
                class={`flex w-full cursor-pointer items-center justify-between rounded-lg border border-neutral-800 px-3 py-3 font-medium transition-colors hover:bg-neutral-900 focus:outline-none ${isOpen() ? 'bg-neutral-900 text-white' : 'bg-neutral-950 text-neutral-400'}`}
            >
                <span class="flex flex-wrap items-center gap-1">
                    <Show when={props.icon}>{props.icon}</Show>

                    {props.placeholder ?? 'Select option'}

                    <Show when={props.selected}>
                        <span class="rounded bg-green-400 px-2 py-0.5 text-xs font-semibold text-green-950">
                            {props.selected!.label}
                        </span>
                    </Show>
                </span>
                {isOpen() ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {/* Menu */}
            <Show when={isOpen()}>
                <div class="absolute z-50 mt-2 flex w-full flex-col divide-y divide-neutral-800 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 shadow-lg">
                    <For each={props.items}>
                        {(item) => (
                            <button
                                class="flex w-full cursor-pointer items-center gap-2 px-3 py-3 font-medium text-neutral-200 hover:bg-neutral-800/70"
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
