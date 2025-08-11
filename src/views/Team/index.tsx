import { createSignal, createEffect, For } from 'solid-js'
import {
    teamMembers,
    ownerIds,
    teamIds,
    helperIds,
    artistIds,
} from '../../utils/constants'

type AvatarDecoration = {
    sku_id: string
    asset: string
    expires_at: string | null
}

type Activity = {
    id: string
    name: string
    type: number
    state?: string
}

type LanyardUser = {
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

export default function Teams() {
    const [users, setUsers] = createSignal<Record<string, LanyardUser>>({})

    createEffect(() => {
        Promise.all(
            teamMembers.map(async (id) => {
                const res = await fetch(
                    `https://lanyard.equicord.org/v1/users/${id}`,
                )
                if (!res.ok) return null
                const json = await res.json()
                return json.success ? [id, json.data as LanyardUser] : null
            }),
        ).then((entries) => {
            const filtered = entries.filter(Boolean) as [string, LanyardUser][]
            setUsers(Object.fromEntries(filtered))
        })
    })

    return (
        <div class="p-4 sm:p-6">
            <h2 class="mb-4 text-xl font-bold text-white sm:text-2xl">
                Meet the Team
            </h2>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <For each={Object.values(users())}>
                    {(userData) => {
                        const u = userData.discord_user
                        const avatar = u.avatar
                            ? `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png`
                            : 'https://cdn.discordapp.com/embed/avatars/0.png'
                        const decoration = u.avatar_decoration_data
                            ? `https://cdn.discordapp.com/avatar-decoration-presets/${u.avatar_decoration_data.asset}.png`
                            : null
                        const customActivity = userData.activities.find(
                            (a) => a.type === 4,
                        )
                        const username = u.global_name ?? u.username
                        const status =
                            customActivity?.state ?? userData.discord_status
                        const isOwner = ownerIds.includes(u.id)
                        const isTeamMember = teamIds.includes(u.id)
                        const isHelper = helperIds.includes(u.id)
                        const isArtist = artistIds.includes(u.id)

                        return (
                            <div class="flex items-center gap-4 rounded-2xl bg-neutral-900 p-4 shadow-md sm:p-5">
                                <div class="relative grid h-[72px] w-[72px] shrink-0 place-items-center sm:h-[90px] sm:w-[90px]">
                                    {decoration && (
                                        <img
                                            alt="Avatar Decoration"
                                            src={decoration}
                                            class="pointer-events-none absolute h-[60px] w-[60px] rounded-full sm:h-[66px] sm:w-[66px]"
                                        />
                                    )}
                                    <img
                                        alt="User Avatar"
                                        src={avatar}
                                        class="z-5 h-12 w-12 rounded-full border-2 border-zinc-900 sm:h-14 sm:w-14"
                                    />
                                </div>
                                <div class="flex flex-col">
                                    <div class="text-lg leading-tight font-semibold text-white sm:text-xl">
                                        {username}
                                        {isOwner && (
                                            <span class="bg-opacity-40 ml-2 rounded-md bg-[#aa3b3b] px-2 py-0.5 text-xs font-medium text-[#ff4848] sm:text-sm">
                                                Owner
                                            </span>
                                        )}
                                        {isTeamMember && (
                                            <span class="bg-opacity-40 ml-2 rounded-md bg-[#9e6bff] px-2 py-0.5 text-xs font-medium text-[#9fc1ff] sm:text-sm">
                                                Team
                                            </span>
                                        )}
                                        {isHelper && (
                                            <span class="bg-opacity-40 ml-2 rounded-md bg-[#ff5dd6] px-2 py-0.5 text-xs font-medium text-[#ff9cbf] sm:text-sm">
                                                Helper
                                            </span>
                                        )}
                                        {isArtist && (
                                            <span class="bg-opacity-40 ml-2 rounded-md bg-[#854d1c] px-2 py-0.5 text-xs font-medium text-[#dba423] sm:text-sm">
                                                Artist
                                            </span>
                                        )}
                                    </div>
                                    <div class="text-sm text-gray-400 sm:text-base">
                                        {status}
                                    </div>
                                </div>
                            </div>
                        )
                    }}
                </For>
            </div>
        </div>
    )
}
