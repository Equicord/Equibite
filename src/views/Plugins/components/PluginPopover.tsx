import { Blocks, Braces, Cog, Monitor } from "lucide-solid"
import { createSignal, onCleanup, Show } from "solid-js"

import Button from "@components/UI/Button"
import Dropdown from "@components/UI/Dropdown"
import Switch from "@components/UI/Switch"

interface Props {
    // Plugin filter
    pluginFilter: () => "all" | "equicord" | "vencord"
    setPluginFilter: (value: "all" | "equicord" | "vencord") => void

    // Platform filter
    platformFilter: () => "all" | "desktop" | "web"
    setPlatformFilter: (value: "all" | "desktop" | "web") => void

    // Commands filter
    filterHasCommands: () => boolean
    setFilterHasCommands: (value: boolean) => void

    // Compact mode
    compactMode: () => boolean
    setCompactMode: (value: boolean) => void
}

const Platforms = [
    {
        label: "All",
        value: "all" as const,
    },
    {
        label: "Desktop",
        value: "desktop" as const,
    },
    {
        label: "Web",
        value: "web" as const,
    },
]

const Sources = [
    {
        label: "All",
        value: "all" as const,
    },
    {
        label: "Vencord",
        icon: (
            <img
                src="/assets/icons/vencord/icon.png"
                class="size-6 select-none"
                alt="Vencord"
            />
        ),
        value: "vencord" as const,
    },
    {
        label: "Equicord",
        icon: (
            <img
                src="/assets/icons/equicord/icon-far.png"
                class="size-6 select-none"
                alt="Equicord"
            />
        ),
        value: "equicord" as const,
    },
    {
        label: "Modified",
        icon: (
            <img
                src="/assets/icons/equicord/modified.png"
                class="size-6 select-none"
                alt="Equicord"
            />
        ),
        value: "modified" as const,
    },
]

export default function PluginPopover(props: Props) {
    const [open, setOpen] = createSignal(false)

    const toggle = () => setOpen((prev) => !prev)
    const close = () => setOpen(false)

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        if (!target.closest(".popover-container")) close()
    }

    document.addEventListener("click", handleClickOutside)

    onCleanup(() => document.removeEventListener("click", handleClickOutside))

    return (
        <div class="popover-container relative inline-block">
            <Button
                icon={<Cog size={16} />}
                variant="secondary"
                onClick={toggle}
            >
                Options
            </Button>

            <Show when={open()}>
                <div class="absolute right-0 z-50 mt-2 flex w-68 flex-col gap-3 rounded-lg border border-neutral-800 bg-neutral-900 p-4 shadow-lg">
                    <Switch
                        icon={<Blocks size={16} />}
                        label="Compact Mode"
                        checked={props.compactMode()}
                        onChange={(e) =>
                            props.setCompactMode(e.currentTarget.checked)
                        }
                    />

                    <Switch
                        icon={<Braces size={16} />}
                        label="Has Commands"
                        checked={props.filterHasCommands()}
                        onChange={(e) =>
                            props.setFilterHasCommands(e.currentTarget.checked)
                        }
                    />

                    <Dropdown
                        icon={<Blocks size={16} />}
                        items={Sources.map((item) => ({
                            icon: item.icon,
                            label: item.label,
                            value: item.value,
                        }))}
                        selected={
                            Sources.find(
                                (item) => item.value === props.pluginFilter(),
                            ) ?? null
                        }
                        onSelect={(item) =>
                            props.setPluginFilter(item.value as any)
                        }
                        placeholder="Source"
                    />

                    <Dropdown
                        icon={<Monitor size={16} />}
                        items={Platforms.map((item) => ({
                            label: item.label,
                            value: item.value,
                        }))}
                        selected={
                            Platforms.find(
                                (item) => item.value === props.platformFilter(),
                            ) ?? null
                        }
                        onSelect={(item) =>
                            props.setPlatformFilter(item.value as any)
                        }
                        placeholder="Platform"
                    />
                </div>
            </Show>
        </div>
    )
}
