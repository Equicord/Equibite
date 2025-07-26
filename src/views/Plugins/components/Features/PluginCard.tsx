import { Urls } from '@utils/constants';
import { For, Show } from 'solid-js'

export interface Dev {
    name: string;
    id: string;
}

export interface Command {
    name: string;
    description: string;
}

export interface PluginData {
    name: string;
    description: string;
    tags: string[];
    authors: Dev[];
    dependencies: string[];
    hasPatches: boolean;
    hasCommands: boolean;
    commands: Command[];
    required: boolean;
    enabledByDefault: boolean;
    target: "discordDesktop" | "vesktop" | "equibop" | "desktop" | "web" | "dev" | undefined;
    filePath: string;
}

export async function fetchPlugins(all: boolean): Promise<PluginData[]> {
    const url = Urls.ALL_PLUGINS_URL;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${all ? "all" : "equicord"} plugins`);
    }
    return response.json();
}


export function formatAuthors(authors: Dev[]): string {
    const names = authors.map(author => author.name);

    switch (names.length) {
        case 0:
            return "";
        case 1:
            return names[0];
        case 2:
            return names.join(" & ");
        default:
            return names.join(", ");
    }
}

export function formatTarget(target: PluginData["target"]) {
    return target
        ? target
            .replace(/([A-Z])/g, ' $1')
            .toLowerCase()
            .trim()
        : 'all platforms'
}

export function cleanDescription(text: string) {
    return text.replace(/[!.,:;?]+/g, "").replace(/\s+/g, " ").trim();
}

export function getAvailabilityText(name: string, required: boolean, target: PluginData["target"]) {
    if (name === 'WebContextMenus') return 'required on vesktop & equibop';
    return required ? `required on ${formatTarget(target)}` : `available on ${formatTarget(target)}`;
}



export function PluginCard({
    name,
    description,
    authors,
    hasCommands,
    commands,
    required,
    target,
}: PluginData) {
    return (
        <div class="w-full p-6 flex flex-col gap-1 bg-neutral-900 rounded-2xl transition-transform duration-200 hover:outline-2 hover:bg-neutral-800 hover:outline-neutral-700 hover:-translate-y-0.5">
            <h3 class="text-lg text-neutral-300 font-bold">
                {name}
            </h3>
            <p class="text-xs text-neutral-500">
                by {formatAuthors(authors)}
            </p>
            <p class="text-sm text-neutral-400 font-medium">
                {cleanDescription(description)}, {getAvailabilityText(name, required, target)}.
            </p>

            <Show when={hasCommands && commands.length > 0}>
                <div class="relative group text-sm text-neutral-400 font-medium w-fit">
                    <span class="cursor-pointer">
                        Hover to view commands
                    </span>
                    <ul class="absolute left-0 top-full bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg p-4 w-72 hidden group-hover:block z-10">
                        <For each={commands}>
                            {(command) => (
                                <li class="text-sm text-neutral-300 py-1">
                                    <span class="font-semibold">{command.name}:</span>{' '}
                                    {command.description.toLowerCase()}
                                </li>
                            )}
                        </For>
                    </ul>
                </div>
            </Show>

        </div>
    )
}
