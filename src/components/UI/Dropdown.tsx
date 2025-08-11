import { createSignal, For, Show } from 'solid-js'
import { ChevronDown, ChevronUp } from 'lucide-solid'
import classNames from 'classnames'

interface Option {
    label: string
    value: string
}

interface Props {
    // Custom Class
    customClass?: string
    // Options
    options: Option[]
    // Selected option
    selected: () => string
    // Set selected option
    setSelected: (value: string) => void
}

export default function Dropdown({
    customClass,
    options,
    selected,
    setSelected,
}: Props) {
    const [open, setOpen] = createSignal(false)

    const toggleOpen = () => setOpen((prev) => !prev)

    const selectOption = (value: string) => {
        setSelected(value)
        setOpen(false)
    }

    return (
        <div class={classNames(customClass, 'relative w-fit max-w-[240px]')}>
            <button
                class="relative flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-neutral-800 px-6 text-neutral-300 transition-colors hover:bg-neutral-700"
                onClick={toggleOpen}
            >
                <span class="font-medium">
                    {
                        options.find((option) => option.value === selected())
                            ?.label
                    }
                </span>

                <div class="absolute right-4">
                    <ChevronDown
                        size="14"
                        class={classNames(
                            open() && 'rotate-180',
                            'transition-transform',
                        )}
                    />
                </div>
            </button>

            <Show when={open()}>
                <div class="absolute z-10 mt-2 flex max-h-60 w-full flex-col overflow-auto rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-3 text-neutral-300 shadow-lg max-md:right-0">
                    <For each={options}>
                        {(option) => (
                            <span
                                class="cursor-pointer rounded px-4 py-2 text-ellipsis hover:bg-neutral-800"
                                tabIndex={0}
                                onClick={() => selectOption(option.value)}
                            >
                                {option.label}
                            </span>
                        )}
                    </For>
                </div>
            </Show>
        </div>
    )
}
