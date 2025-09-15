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

const RoleHeaders = {
    owner: 'text-purple-300',
    team: 'text-blue-300',
    helper: 'text-green-300',
    artist: 'text-pink-300',
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

    const groupedUsers = () => {
        const userList = Object.values(users())
        return {
            owners: userList.filter(u => ownerIds.includes(u.discord_user.id)),
            team: userList.filter(u => teamIds.includes(u.discord_user.id)),
            helpers: userList.filter(u => helperIds.includes(u.discord_user.id)),
            artists: userList.filter(u => artistIds.includes(u.discord_user.id))
        }
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

    const renderUserCard = (userData: LanyardUser) => {
        const u = userData.discord_user
        const avatar = u.avatar
            ? `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.webp?size=128`
            : 'https://cdn.discordapp.com/embed/avatars/0.png'

        const decoration = u.avatar_decoration_data
            ? `https://cdn.discordapp.com/avatar-decoration-presets/${u.avatar_decoration_data.asset}.png`
            : null

        const customStatus = userData.activities.find((a) => a.type === 4)
        const otherActivity = userData.activities.find((a) => a.type !== 4)

        const username = u.global_name ?? u.username
        const status = customStatus?.state ?? StatusLabels[userData.discord_status as keyof typeof StatusLabels] ?? 'Unknown'

        return (
            <div class="group relative overflow-hidden rounded-xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-6">
                <div class="relative z-10 flex flex-col items-center text-center">
                    <div class="relative mb-4">
                        <div class="relative">
                            <Show when={decoration}>
                                <img
                                    src={decoration!}
                                    draggable={false}
                                    class="absolute inset-0 z-10 size-20 object-contain select-none"
                                />
                            </Show>

                            <img
                                src={avatar}
                                draggable={false}
                                class="size-16 rounded-full border-2 border-neutral-700 select-none"
                            />

                            <div
                                class={`absolute -right-1 -bottom-1 z-20 h-5 w-5 rounded-full border-2 border-neutral-900 ${StatusColours[userData.discord_status as keyof typeof StatusColours] ?? 'bg-gray-500'}`}
                            ></div>
                        </div>
                    </div>

                    <div class="flex flex-col items-center">
                        <h3 class="text-lg font-semibold text-white">
                            {username}
                        </h3>
                    </div>

                    <div class="mt-3 flex flex-col gap-1 text-center">
                        <Show when={customStatus?.state}>
                            <p class="text-sm font-medium text-neutral-300">
                                {customStatus!.state}
                            </p>
                        </Show>

                        <Show when={otherActivity}>
                            <p class="text-xs text-neutral-400">
                                {activityType(otherActivity!.type)}
                                {otherActivity!.details ?? otherActivity!.name}
                            </p>
                        </Show>

                        <Show when={!customStatus?.state && !otherActivity}>
                            <p class="text-sm text-neutral-400">
                                {status}
                            </p>
                        </Show>
                    </div>
                </div>
            </div>
        )
    }

    const renderSection = (title: string, users: LanyardUser[], colorClass: string) => (
        <Show when={users.length > 0}>
            <section class="flex flex-col gap-4">
                <h2 class={`text-xl font-bold ${colorClass}`}>
                    {title}
                </h2>
                <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <For each={users}>
                        {renderUserCard}
                    </For>
                </div>
            </section>
        </Show>
    )

    return (
        <>
            <Title>Team | Equicord</Title>

            <div ref={containerRef} class="max-w-eq-lg mx-auto px-6">
                <div class="flex flex-col gap-6">
                    <header class="flex flex-col gap-1">
                        <h1 class="text-3xl font-bold md:text-4xl">
                            Meet the Team
                        </h1>
                        <p class="text-lg font-medium text-neutral-400">
                            The amazing people behind Equicord
                        </p>
                    </header>

                    <Show when={loading()}>
                        <div class="flex flex-col items-center gap-2">
                            <div class="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-sky-500" />
                            <p class="text-sm font-bold text-sky-200">
                                Loading team members
                            </p>
                        </div>
                    </Show>

                    <Show when={!loading()}>
                        <div class="flex flex-col gap-8">
                            {renderSection('Owner', groupedUsers().owners, RoleHeaders.owner)}
                            {renderSection('Team', groupedUsers().team, RoleHeaders.team)}
                            {renderSection('Helpers', groupedUsers().helpers, RoleHeaders.helper)}
                            {renderSection('Artists', groupedUsers().artists, RoleHeaders.artist)}
                        </div>
                    </Show>
                </div>
            </div>
        </>
    )
}