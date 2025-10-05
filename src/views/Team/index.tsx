import PageBootstrap from '@components/PageBootstrap'
import {
    artistIds,
    helperIds,
    ownerIds,
    teamIds,
    teamMembers,
} from '@utils/constants'
import { Shield } from 'lucide-solid'
import { createEffect, createSignal, For, Show } from 'solid-js'

// ---- Types ----
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

// ---- Constants ----
const StatusColours: Record<string, string> = {
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-500',
}

const StatusLabels: Record<string, string> = {
    online: 'Online',
    idle: 'Away',
    dnd: 'Do Not Disturb',
    offline: 'Offline',
}

const RoleHeaders: Record<string, string> = {
    owner: 'text-purple-300',
    team: 'text-blue-300',
    helper: 'text-green-300',
    artist: 'text-pink-300',
}

const ActivityTypes: Record<number, string> = {
    0: 'Playing ',
    1: 'Streaming ',
    2: 'Listening to ',
    3: 'Watching ',
    4: 'Custom ',
    5: 'Competing in ',
}

const ROLE_MAP = {
    owners: ownerIds,
    team: teamIds,
    helpers: helperIds,
    artists: artistIds,
} as const

async function fetchUsers(ids: string[]): Promise<Record<string, LanyardUser>> {
    const results = await Promise.all(
        ids.map(async (id) => {
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
    )

    const filtered = results.filter(Boolean) as [string, LanyardUser][]
    return Object.fromEntries(filtered)
}

function getGroupedUsers(users: Record<string, LanyardUser>) {
    const userList = Object.values(users)

    return Object.fromEntries(
        Object.entries(ROLE_MAP).map(([role, ids]) => [
            role,
            userList.filter((u) => ids.includes(u.discord_user.id)),
        ]),
    ) as Record<keyof typeof ROLE_MAP, LanyardUser[]>
}

function getActivityLabel(activity: Activity) {
    return ActivityTypes[activity.type] ?? ''
}

function UserCard({ userData }: { userData: LanyardUser }) {
    const u = userData.discord_user

    const avatar = u.avatar
        ? `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.webp?size=128`
        : 'https://cdn.discordapp.com/embed/avatars/0.png'

    const decoration = u.avatar_decoration_data
        ? `https://cdn.discordapp.com/avatar-decoration-presets/${u.avatar_decoration_data.asset}.png?size=128`
        : null

    const customStatus = userData.activities.find((a) => a.type === 4)
    const otherActivity = userData.activities.find((a) => a.type !== 4)

    const username = u.global_name ?? u.username
    const status =
        customStatus?.state ??
        StatusLabels[userData.discord_status] ??
        'Unknown'

    return (
        <div class="group relative overflow-hidden rounded-xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-6">
            <div class="relative z-10 flex flex-col items-center text-center">
                <div class="relative mb-4">
                    <div class="relative">
                        <Show when={decoration}>
                            <img
                                src={decoration!}
                                draggable={false}
                                class="absolute inset-0 z-10 size-16 object-fit select-none scale-115"
                            />
                        </Show>

                        <img
                            src={avatar}
                            draggable={false}
                            class="size-16 rounded-full border-2 border-neutral-700 select-none"
                        />

                        <div
                            class={`absolute -right-1 -bottom-1 z-20 h-5 w-5 rounded-full border-2 border-neutral-900 ${StatusColours[userData.discord_status] ?? 'bg-gray-500'}`}
                        ></div>
                    </div>
                </div>

                <h3 class="text-lg font-semibold text-white">{username}</h3>

                <div class="mt-3 flex flex-col gap-1 text-center">
                    <Show when={customStatus?.state}>
                        <p class="text-sm font-medium text-neutral-300">
                            {customStatus!.state}
                        </p>
                    </Show>

                    <Show when={otherActivity}>
                        <p class="text-xs text-neutral-400">
                            {getActivityLabel(otherActivity!)}
                            {otherActivity!.details ?? otherActivity!.name}
                        </p>
                    </Show>

                    <Show when={!customStatus?.state && !otherActivity}>
                        <p class="text-sm text-neutral-400">{status}</p>
                    </Show>
                </div>
            </div>
        </div>
    )
}

function RoleSection({
    title,
    users,
    colorClass,
}: {
    title: string
    users: LanyardUser[]
    colorClass: string
}) {
    return (
        <Show when={users.length > 0}>
            <section class="flex flex-col gap-4">
                <h2 class={`text-xl font-bold ${colorClass}`}>{title}</h2>
                <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <For each={users}>{(u) => <UserCard userData={u} />}</For>
                </div>
            </section>
        </Show>
    )
}

export default function Teams() {
    const [users, setUsers] = createSignal<Record<string, LanyardUser>>({})
    const [loading, setLoading] = createSignal(true)

    createEffect(() => {
        fetchUsers(teamMembers).then((data) => {
            setUsers(data)
            setLoading(false)
        })
    })

    const grouped = () => getGroupedUsers(users())

    return (
        <PageBootstrap
            meta={{ title: 'Team' }}
            fullWidth
            icon={<Shield />}
            title="Meet the Team"
            description="The amazing people behind Equicord"
        >
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
                    <RoleSection
                        title="Owner"
                        users={grouped().owners}
                        colorClass={RoleHeaders.owner}
                    />
                    <RoleSection
                        title="Team"
                        users={grouped().team}
                        colorClass={RoleHeaders.team}
                    />
                    <RoleSection
                        title="Helpers"
                        users={grouped().helpers}
                        colorClass={RoleHeaders.helper}
                    />
                    <RoleSection
                        title="Artists"
                        users={grouped().artists}
                        colorClass={RoleHeaders.artist}
                    />
                </div>
            </Show>
        </PageBootstrap>
    )
}
