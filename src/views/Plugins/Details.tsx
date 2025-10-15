import { Title } from '@solidjs/meta'
import { A, useNavigate, useParams } from '@solidjs/router'
import {
    createMemo,
    createResource,
    createSignal,
    For,
    Match,
    Show,
    Switch,
} from 'solid-js'

import { type Plugin, fetchPlugins, formatAuthors } from '@utils/plugin'
import {
    ArrowLeft,
    Braces,
    ChartNoAxesColumnDecreasing,
    ChevronRight,
    Command,
    FileText,
    Globe,
    Link,
    Notebook,
    RotateCcw,
    Users,
} from 'lucide-solid'

import Button from '@components/UI/Button'
import toast from 'solid-toast'

const enum PluginSource {
    Equicord = 'Equicord',
    Vencord = 'Vencord',
    Modified = "Modified",
    Unknown = 'Unknown',
}

export const getPluginSource = (props: any): PluginSource => {
    const { filePath, isModified } = props
    const lower = filePath.toLowerCase()
    
    if (isModified) return PluginSource.Modified
    if (lower.startsWith('src/equicordplugins')) return PluginSource.Equicord
    if (lower.startsWith('src/plugins')) return PluginSource.Vencord

    return PluginSource.Unknown
}

interface PluginSourceProps {
    source: PluginSource
    size: number
}

const pluginIcons: Record<PluginSource, string> = {
    [PluginSource.Equicord]: '/assets/icons/equicord/icon.png',
    [PluginSource.Vencord]: '/assets/icons/vencord/icon.png',
    [PluginSource.Modified]: '/assets/icons/equicord/modified.png',
    [PluginSource.Unknown]: '/assets/icons/misc/userplugin.png',
}

export function PluginSourceIcon(props: PluginSourceProps) {
    const { size, source } = props
    const icon = pluginIcons[source]

    return (
        <span
            class={`rounded-full py-0.5 font-semibold flex items-center gap-1`}
        >
            {icon && <img src={icon} class={`size-${size}`} alt={source} />}
        </span>
    )
}

export default function PluginDetails() {
    const params = useParams()
    const navigate = useNavigate()

    const [plugins, { refetch }] = createResource<Plugin[]>(() =>
        fetchPlugins('all'),
    )

    const plugin = createMemo(() =>
        plugins()?.find(
            (plugin) =>
                plugin.name.toLowerCase() === params.name?.toLowerCase(),
        ),
    )

    const [activeTab, setActiveTab] = createSignal<'overview' | 'commands'>(
        'overview',
    )

    const copyLink = (plugin: Plugin) => {
        const url = `https://equicord.org/plugins/${plugin.name}`
        navigator.clipboard.writeText(url)
        toast.success('Copied Link', {
            className:
                'border-1 !rounded-xl !bg-neutral-900 !text-white !font-medium border-neutral-800',
            iconTheme: {
                secondary: 'var(--color-neutral-900)',
            },
        })
    }

    return (
        <>
            <Title>Plugins | Equicord</Title>

            <div class="max-w-eq-lg mx-auto flex flex-col gap-6 px-6 py-12">
                <Show
                    when={plugins.state === 'ready'}
                    fallback={
                        <div class="flex items-center justify-center py-12">
                            <Show
                                when={plugins.error}
                                fallback={
                                    <div class="flex flex-col items-center gap-2">
                                        <div class="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-sky-500" />

                                        <p class="text-sm font-bold text-sky-200">
                                            Loading plugin
                                        </p>
                                    </div>
                                }
                            >
                                <div class="flex flex-col items-center gap-2">
                                    <p class="text-sm font-bold text-red-400">
                                        Failed to load plugin
                                    </p>

                                    <Button
                                        variant="red"
                                        icon={<RotateCcw size={16} />}
                                        onClick={() => refetch()}
                                    >
                                        Retry
                                    </Button>
                                </div>
                            </Show>
                        </div>
                    }
                >
                    <Show
                        when={plugin()}
                        fallback={
                            <div class="flex flex-col items-center justify-center gap-1 text-neutral-200">
                                <FileText size={48} class="text-neutral-500" />

                                <p class="text-lg font-bold">
                                    Plugin not found.
                                </p>

                                <p class="max-w-92 text-center font-medium text-neutral-300">
                                    The plugin "{params.name}" could not be
                                    found.
                                </p>

                                <Button
                                    variant="secondary"
                                    class="mt-2"
                                    icon={<Globe size={16} />}
                                    onClick={() => navigate('/plugins')}
                                >
                                    Browse plugins
                                </Button>
                            </div>
                        }
                    >
                        {(plugin) => (
                            <div class="flex flex-col gap-6">
                                <A
                                    href="/plugins"
                                    class="flex w-fit items-center gap-1 font-medium transition-all hover:opacity-80 active:scale-[.95]"
                                >
                                    <ArrowLeft size={16} />
                                    Back to plugins
                                </A>
                                {/* Header */}
                                <header class="flex items-center justify-between">
                                    <div class="flex items-center gap-6">
                                        <div class="flex size-16 items-center justify-center rounded-xl border border-neutral-800 bg-gradient-to-t from-neutral-900 to-neutral-800/90 outline-2 outline-offset-2 outline-neutral-600/50">
                                            <PluginSourceIcon
                                                source={getPluginSource(plugin())}
                                                size={8}
                                            />
                                        </div>

                                        <div class="flex flex-col">
                                            <div class="flex gap-2 items-center">
                                                <h1 class="text-2xl font-bold">
                                                    {plugin().name}
                                                </h1>
                                            </div>
                                            <div class="flex items-center gap-2 font-medium text-neutral-300">
                                                <Users size={16} />

                                                <span>
                                                    By{' '}
                                                    {formatAuthors(
                                                        plugin().authors,
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex w-fit items-center gap-2">
                                        <Button
                                            icon={<Link size={16} />}
                                            variant="secondary"
                                            class="!px-4 !py-2.5 text-sm"
                                            onClick={() => copyLink(plugin())}
                                        >
                                            Copy Link
                                        </Button>
                                    </div>
                                </header>

                                {/* Tabs */}
                                <div class="flex items-center gap-2">
                                    <Button
                                        icon={
                                            <ChartNoAxesColumnDecreasing
                                                size={16}
                                            />
                                        }
                                        variant={
                                            activeTab() === 'overview'
                                                ? 'primary'
                                                : 'secondary'
                                        }
                                        class="text-sm"
                                        onClick={() => setActiveTab('overview')}
                                    >
                                        Overview
                                    </Button>
                                    <Button
                                        icon={<Braces size={16} />}
                                        disabled={!plugin().hasCommands}
                                        variant={
                                            activeTab() === 'commands'
                                                ? 'primary'
                                                : 'secondary'
                                        }
                                        class="text-sm"
                                        onClick={() =>
                                            plugin().hasCommands &&
                                            setActiveTab('commands')
                                        }
                                    >
                                        Commands
                                    </Button>
                                </div>

                                {/* Content */}
                                <Switch>
                                    <Match when={activeTab() === 'overview'}>
                                        <div class="flex flex-col gap-3">
                                            <h4 class="flex items-center gap-2 text-sm font-medium text-neutral-300">
                                                <Notebook size={16} />{' '}
                                                Description
                                            </h4>

                                            <p class="leading-relaxed font-medium">
                                                {plugin().description ||
                                                    'No description available.'}
                                            </p>
                                        </div>
                                    </Match>

                                    <Match when={activeTab() === 'commands'}>
                                        <div class="flex flex-col gap-6">
                                            <h4 class="flex items-center gap-2 text-sm font-medium text-neutral-300">
                                                <Command size={16} />
                                                Commands
                                                <span class="rounded-full bg-neutral-800 px-3 text-xs font-medium">
                                                    {plugin().commands.length}
                                                </span>
                                            </h4>

                                            <div class="flex flex-col gap-3">
                                                <For each={plugin().commands}>
                                                    {(command) => (
                                                        <div class="flex flex-col gap-2 border-b border-neutral-900 pb-3">
                                                            <h4 class="flex items-center gap-2 font-medium">
                                                                <span class="rounded-lg bg-neutral-800 p-1">
                                                                    <ChevronRight
                                                                        size={
                                                                            14
                                                                        }
                                                                    />
                                                                </span>
                                                                {command.name}
                                                            </h4>

                                                            <Show
                                                                when={
                                                                    command.description
                                                                }
                                                            >
                                                                <p class="text-sm text-neutral-400">
                                                                    {
                                                                        command.description
                                                                    }
                                                                </p>
                                                            </Show>
                                                        </div>
                                                    )}
                                                </For>
                                            </div>
                                        </div>
                                    </Match>
                                </Switch>
                            </div>
                        )}
                    </Show>
                </Show>
            </div>
        </>
    )
}
