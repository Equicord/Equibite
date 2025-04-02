import { createSignal, createEffect, For } from 'solid-js'

const teamIds = [
    921098159348924457n,
    1207087393929171095n,
    929208515883569182n,
    400111022901559298n,
    1120045713867423835n,
].map(String)

const helperIds = [
    516750892372852754n,
    209830981060788225n,
    1273447359417942128n,
].map(String)

const teamMembers = [
    848339671629299742n,
    921098159348924457n,
    1207087393929171095n,
    929208515883569182n,
    400111022901559298n,
    1120045713867423835n,
    516750892372852754n,
    209830981060788225n,
    1273447359417942128n,
].map(String)

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
                const res = await fetch(`https://lanyard.equicord.org/v1/users/${id}`)
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
        <div class="p-6">
            <h2 class="text-2xl font-bold text-white mb-4">Meet the Team</h2>
    
            <div class="grid grid-cols-2 gap-6">
                <For each={Object.values(users())}>
                    {(userData) => {
                        const u = userData.discord_user
                        const avatar = u.avatar
                            ? `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png`
                            : 'https://cdn.discordapp.com/embed/avatars/0.png'
                        const decoration = u.avatar_decoration_data
                            ? `https://cdn.discordapp.com/avatar-decoration-presets/${u.avatar_decoration_data.asset}.png`
                            : null
                        const customActivity = userData.activities.find(a => a.type === 4)
                        const username = u.global_name ?? u.username
                        const status = customActivity?.state ?? userData.discord_status
                        const isOwner = u.id === '848339671629299742'
                        const isTeamMember = teamIds.includes(u.id)
                        const isHelper = helperIds.includes(u.id)
    
                        return (
                            <div class="flex items-center gap-5 p-5 bg-neutral-900 rounded-2xl shadow-md">
                                <div class="grid place-items-center w-[90px] h-[90px]">
                                    <div class="absolute -mt-1">
                                        {decoration && (
                                            <img
                                                src={decoration}
                                                class="w-[66px] h-[66px] z-20 pointer-events-none rounded-full"
                                            />
                                        )}
                                    </div>
                                    <img
                                        src={avatar}
                                        class="w-14 h-14 rounded-full z-5 border-2 border-zinc-900"
                                    />
                                </div>
                                <div class="flex flex-col">
                                    <div class="text-white font-semibold text-xl leading-tight">
                                        {username}
                                        {isOwner && (
                                            <span class="ml-2 text-sm font-medium text-indigo-400 bg-indigo-900 bg-opacity-40 px-2 py-0.5 rounded-md">
                                                Owner
                                            </span>
                                        )}
                                        {isTeamMember && (
                                            <span class="ml-2 text-sm font-medium text-indigo-400 bg-indigo-900 bg-opacity-40 px-2 py-0.5 rounded-md">
                                                Team
                                            </span>
                                        )}
                                        {isHelper && (
                                            <span class="ml-2 text-sm font-medium text-indigo-400 bg-indigo-900 bg-opacity-40 px-2 py-0.5 rounded-md">
                                                Helper
                                            </span>
                                        )}
                                    </div>
                                    <div class="text-base text-gray-400">
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