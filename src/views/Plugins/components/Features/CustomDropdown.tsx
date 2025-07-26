import { createSignal, For } from 'solid-js'

const options = [
    { value: 'all', label: 'Show All Plugins' },
    { value: 'equicord', label: 'Show Equicord Plugins' },
    { value: 'vencord', label: 'Show Vencord Plugins' },
]

interface CustomDropdownProps {
    selected: () => string
    setSelected: (value: string) => void
}

export default function CustomDropdown({
    selected,
    setSelected,
}: CustomDropdownProps) {
    const [open, setOpen] = createSignal(false)

    const toggle = () => setOpen((o) => !o)
    const selectOption = (value: string) => {
        setSelected(value)
        setOpen(false)
    }

    return (
        <div class="relative w-fit">
            <button
                onClick={toggle}
                class="
                    w-full
                    px-6
                    h-[48px]
                    rounded-lg 
                    bg-neutral-800
                    text-neutral-300 
                    focus:outline-none 
                    hover:bg-neutral-800
                    transition-colors 
                    flex 
                    items-center 
                    justify-center 
                    gap-2 
                    whitespace-nowrap
                "
            >
                <span class="max-md:hidden">
                    {options.find((o) => o.value === selected())?.label}
                </span>
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {open() && (
                <ul
                    class="
                        max-md:right-0
                        min-w-[200px]
                        absolute 
                        mt-1 
                        w-full 
                        rounded-lg 
                        bg-neutral-900 
                        border border-neutral-700 
                        max-h-60 
                        overflow-auto 
                        text-neutral-300 
                        shadow-lg 
                        z-10
                        whitespace-nowrap
                    "
                    role="listbox"
                >
                    <For each={options}>
                        {(option) => (
                            <li
                                class="
                                    px-4 py-2 
                                    cursor-pointer 
                                    hover:bg-neutral-700 
                                    text-center
                                    overflow-hidden
                                    text-ellipsis
                                "
                                role="option"
                                onClick={() => selectOption(option.value)}
                                tabindex={0}
                            >
                                {option.label}
                            </li>
                        )}
                    </For>
                </ul>
            )}
        </div>
    )
}
