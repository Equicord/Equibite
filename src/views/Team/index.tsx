import { Title } from '@solidjs/meta'
import {
    artistIds,
    helperIds,
    ownerIds,
    teamIds,
    teamMembers,
} from '@utils/constants'
import gsap from 'gsap'
import { createEffect, createSignal, For, onMount, Show } from 'solid-js'

interface AvatarDecoration {
    sku_id: string
    asset: string
    expires_at: string | null
}

interface Activity {
    id: string
    name: string
    type: number
    state?: string
    details?: string
}

interface LanyardUser {
    discord_user: {
        id: string
        username: string
        avatar: string | null
        discriminator: string
        public_flags: number
        global_name: string | null
        avatar_decoration_data?: AvatarDecoration | null
    }
    discord_status: string
    activities: Activity[]
}

const StatusColours = {
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-500',
}

const StatusLabels = {
    online: 'Online',
    idle: 'Away',
    dnd: 'Do Not Disturb',
    offline: 'Offline',
}

const RoleColours = {
    owner: 'bg-purple-900/40 text-purple-300 border-purple-600/30',
    team: 'bg-blue-900/40 text-blue-300 border-blue-600/30',
    helper: 'bg-green-900/40 text-green-300 border-green-600/30',
    artist: 'bg-pink-900/40 text-pink-300 border-pink-600/30',
}

export default function Teams() {
    const [users, setUsers] = createSignal<Record<string, LanyardUser>>({})
    const [loading, setLoading] = createSignal(true)

    let containerRef: HTMLDivElement | undefined

    createEffect(() => {
        Promise.all(
            teamMembers.map(async (id) => {
                try {
                    const res = await fetch(
                        `https://lanyard.equicord.org/v1/users/${id}`,
                    )
                    if (!res.ok) return null
                    const json = await res.json()
                    return json.success ? [id, json.data as LanyardUser] : null
                } catch {
                    return null
                }
            }),
        ).then((entries) => {
            const filtered = entries.filter(Boolean) as [string, LanyardUser][]
            setUsers(Object.fromEntries(filtered))
            setLoading(false)
        })
    })

    const getUserRole = (userId: string) => {
        // Owner
        if (ownerIds.includes(userId)) return { label: 'Owner', type: 'owner' }

        // Team
        if (teamIds.includes(userId)) return { label: 'Team', type: 'team' }

        // Helper
        if (helperIds.includes(userId))
            return { label: 'Helper', type: 'helper' }

        // Artist
        if (artistIds.includes(userId))
            return { label: 'Artist', type: 'artist' }

        return null
    }

    onMount(() => {
        if (containerRef) {
            gsap.from(containerRef, {
                opacity: 0,
                y: 50,
                filter: 'blur(6px)',
                duration: 0.4,
            })
        }
    })

    const activityType = (type: number) => {
        switch (type) {
            case 0:
                return 'Playing '
            case 1:
                return 'Streaming '
            case 2:
                return 'Listening to '
            case 3:
                return 'Watching '
            case 4:
                return 'Custom '
            case 5:
                return 'Competing in '
        }
    }

    return (
        <>
            <Title>Team | Equicord</Title>

            <div ref={containerRef} class="max-w-eq-lg mx-auto px-6">
                <div class="flex flex-col gap-6">
                    {/* Header */}
                    <header class="flex flex-col gap-1">
                        <h1 class="text-3xl font-bold md:text-4xl">
                            Meet the Team
                        </h1>
                        <p class="text-lg font-medium text-neutral-400">
                            The amazing people behind Equicord
                        </p>
                    </header>

                    {/* Loading */}
                    <Show when={loading()}>
                        <div class="flex flex-col items-center gap-2">
                            <div class="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-sky-500" />

                            <p class="text-sm font-bold text-sky-200">
                                Loading team members
                            </p>
                        </div>
                    </Show>

                    {/* Grid */}
                    <Show when={!loading()}>
                        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <For each={Object.values(users())}>
                                {(userData) => {
                                    const u = userData.discord_user
                                    const avatar = u.avatar
                                        ? `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.webp?size=128`
                                        : 'https://cdn.discordapp.com/embed/avatars/0.png'

                                    const decoration = u.avatar_decoration_data
                                        ? `https://cdn.discordapp.com/avatar-decoration-presets/${u.avatar_decoration_data.asset}.png`
                                        : null

                                    const customStatus =
                                        userData.activities.find(
                                            (a) => a.type === 4,
                                        )
                                    const otherActivity =
                                        userData.activities.find(
                                            (a) => a.type !== 4,
                                        )

                                    const username = u.global_name ?? u.username
                                    const status =
                                        customStatus?.state ??
                                        StatusLabels[
                                        userData.discord_status as keyof typeof StatusLabels
                                        ] ??
                                        'Unknown'
                                    const role = getUserRole(u.id)

                                    return (
                                        <div class="group relative overflow-hidden rounded-xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-6">
                                            <div class="relative z-10 flex flex-col items-center text-center">
                                                <div class="relative mb-4">
                                                    <div class="relative">
                                                        {/* Decoration */}
                                                        <Show when={decoration}>
                                                            <img
                                                                src={decoration!}
                                                                draggable={false}
                                                                class="absolute inset-0 z-10 size-16 object-contain select-none top-[-3.5px] scale-x-110"
                                                            />
                                                        </Show>

                                                        {/* Avatar */}
                                                        <img
                                                            src={avatar}
                                                            draggable={false}
                                                            class="size-16 rounded-full border-2 border-neutral-700 select-none"
                                                        />

                                                        {/* Status */}
                                                        <div
                                                            class={`absolute -right-1 -bottom-1 z-20 h-5 w-5 rounded-full border-2 border-neutral-900 ${StatusColours[userData.discord_status as keyof typeof StatusColours] ?? 'bg-gray-500'}`}
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div class="flex flex-col items-center">
                                                    <h3 class="text-lg font-semibold text-white">
                                                        {username}
                                                    </h3>

                                                    <Show when={role}>
                                                        <span
                                                            class={`rounded-full border px-3 py-1 text-xs font-medium ${RoleColours[role!.type as keyof typeof RoleColours]}`}
                                                        >
                                                            {role!.label}
                                                        </span>
                                                    </Show>
                                                </div>

                                                <div class="mt-3 flex flex-col gap-1 text-center">
                                                    <Show
                                                        when={
                                                            customStatus?.state
                                                        }
                                                    >
                                                        <p class="text-sm font-medium text-neutral-300">
                                                            {
                                                                customStatus!
                                                                    .state
                                                            }
                                                        </p>
                                                    </Show>

                                                    <Show when={otherActivity}>
                                                        <p class="text-xs text-neutral-400">
                                                            {activityType(
                                                                otherActivity!
                                                                    .type,
                                                            )}
                                                            {otherActivity!
                                                                .details ??
                                                                otherActivity!
                                                                    .name}
                                                        </p>
                                                    </Show>

                                                    <Show
                                                        when={
                                                            !customStatus?.state &&
                                                            !otherActivity
                                                        }
                                                    >
                                                        <p class="text-sm text-neutral-400">
                                                            {status}
                                                        </p>
                                                    </Show>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }}
                            </For>
                        </div>
                    </Show>
                </div>
            </div>
        </>
    )
}
