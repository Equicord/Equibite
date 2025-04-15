import { createSignal, createEffect, For } from 'solid-js'

const ownerIds = [
     848339671629299742,
].map(String)

const teamIds = [
    840854894881538079n,
    1207087393929171095n,
    929208515883569182n,
    400111022901559298n,
    1120045713867423835n,
    209830981060788225,
].map(String)

const helperIds = [
    516750892372852754n,
    1273447359417942128n,
].map(String)

const teamMembers = [
    ...ownerIds,
    ...teamIds,
    ...helperIds,
]

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
        <div class="p-4 sm:p-6">
            <h2 class="text-xl sm:text-2xl font-bold text-white mb-4">Meet the Team</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                        const isOwner = ownerIds.includes(u.id)
                        const isTeamMember = teamIds.includes(u.id)
                        const isHelper = helperIds.includes(u.id)

                        return (
                            <div class="flex items-center gap-4 p-4 sm:p-5 bg-neutral-900 rounded-2xl shadow-md">
                                <div class="relative w-[72px] h-[72px] sm:w-[90px] sm:h-[90px] grid place-items-center shrink-0">
                                    {decoration && (
                                        <img
                                            src={decoration}
                                            class="w-[60px] h-[60px] sm:w-[66px] sm:h-[66px] z-20 pointer-events-none rounded-full absolute"
                                        />
                                    )}
                                    <img
                                        src={avatar}
                                        class="w-12 h-12 sm:w-14 sm:h-14 rounded-full z-5 border-2 border-zinc-900"
                                    />
                                </div>
                                <div class="flex flex-col">
                                    <div class="text-white font-semibold text-lg sm:text-xl leading-tight">
                                        {username}
                                        {isOwner && (
                                            <span class="ml-2 text-xs sm:text-sm font-medium text-indigo-400 bg-indigo-900 bg-opacity-40 px-2 py-0.5 rounded-md">
                                                Owner
                                            </span>
                                        )}
                                        {isTeamMember && (
                                            <span class="ml-2 text-xs sm:text-sm font-medium text-indigo-400 bg-indigo-900 bg-opacity-40 px-2 py-0.5 rounded-md">
                                                Team
                                            </span>
                                        )}
                                        {isHelper && (
                                            <span class="ml-2 text-xs sm:text-sm font-medium text-pink-400 bg-pink-900 bg-opacity-40 px-2 py-0.5 rounded-md">
                                                Helper
                                            </span>
                                        )}
                                    </div>
                                    <div class="text-sm sm:text-base text-gray-400">
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
