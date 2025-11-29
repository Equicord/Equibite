import type { Activity, LanyardUser } from "@/types"
import PageBootstrap from "@components/PageBootstrap"
import LoadingState from "@components/UI/LoadingState"
import {
    artistIds,
    helperIds,
    ownerIds,
    teamIds,
    teamMembers,
} from "@utils/constants"
import { Shield } from "lucide-solid"
import { createSignal, For, onCleanup, onMount, Show } from "solid-js"

// ---- Constants ----
const StatusColours: Record<string, string> = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-gray-500",
}

const StatusLabels: Record<string, string> = {
    online: "Online",
    idle: "Away",
    dnd: "Do Not Disturb",
    offline: "Offline",
}

const RoleHeaders: Record<string, string> = {
    owner: "text-purple-300",
    team: "text-blue-300",
    helper: "text-green-300",
    artist: "text-pink-300",
}

const ActivityTypes: Record<number, string> = {
    0: "Playing ",
    1: "Streaming ",
    2: "Listening to ",
    3: "Watching ",
    4: "Custom ",
    5: "Competing in ",
}

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

function createLanyardSocket(
    ids: string[],
    onUpdate: (userId: string, user: LanyardUser) => void,
): WebSocket {
    const ws = new WebSocket("wss://lanyard.equicord.org/socket")
    let heartbeatInterval: ReturnType<typeof setInterval> | null = null

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data)

        switch (message.op) {
            case 1:
                heartbeatInterval = setInterval(() => {
                    ws.send(JSON.stringify({ op: 3 }))
                }, message.d.heartbeat_interval)

                ws.send(
                    JSON.stringify({
                        op: 2,
                        d: { subscribe_to_ids: ids },
                    }),
                )
                break

            case 0:
                if (message.t === "PRESENCE_UPDATE") {
                    const user = message.d as LanyardUser
                    if (user.discord_user?.id) {
                        onUpdate(user.discord_user.id, user)
                    }
                }
                break
        }
    }

    ws.onclose = () => {
        if (heartbeatInterval) clearInterval(heartbeatInterval)
    }

    return ws
}

function getActivityLabel(activity: Activity) {
    return ActivityTypes[activity.type] ?? ""
}

function UserCard(props: { userData: LanyardUser }) {
    const u = () => props.userData.discord_user

    const avatar = () => {
        const user = u()
        return user.avatar
            ? user.avatar.startsWith("a_")
                ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?size=128`
                : `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=128`
            : "https://cdn.discordapp.com/embed/avatars/0.png"
    }

    const decoration = () => {
        const user = u()
        return user.avatar_decoration_data
            ? `https://cdn.discordapp.com/avatar-decoration-presets/${user.avatar_decoration_data.asset}.png?size=128`
            : null
    }

    const customStatus = () =>
        props.userData.activities.find((a) => a.type === 4)
    const otherActivity = () =>
        props.userData.activities.find((a) => a.type !== 4)

    const username = () => u().global_name ?? u().username
    const status = () =>
        customStatus()?.state ??
        StatusLabels[props.userData.discord_status] ??
        "Unknown"

    return (
        <div class="group relative overflow-hidden rounded-xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-6">
            <div class="relative z-10 flex flex-col items-center text-center">
                <div class="relative mb-4">
                    <div class="relative">
                        <Show when={decoration()}>
                            <img
                                src={decoration()!}
                                draggable={false}
                                class="absolute inset-0 z-10 size-16 object-fit select-none scale-115"
                            />
                        </Show>

                        <img
                            src={avatar()}
                            draggable={false}
                            class="size-16 rounded-full border-2 border-neutral-700 select-none"
                        />

                        <div
                            class="absolute -right-1 -bottom-1 z-20 h-5 w-5 rounded-full border-2 border-neutral-900"
                            classList={{
                                "bg-green-500":
                                    props.userData.discord_status === "online",
                                "bg-yellow-500":
                                    props.userData.discord_status === "idle",
                                "bg-red-500":
                                    props.userData.discord_status === "dnd",
                                "bg-gray-500":
                                    props.userData.discord_status ===
                                        "offline" ||
                                    !props.userData.discord_status,
                            }}
                        ></div>
                    </div>
                </div>

                <h3 class="text-lg font-semibold text-white">{username()}</h3>

                <div class="mt-3 flex flex-col gap-1 text-center">
                    <Show when={customStatus()?.state}>
                        <p class="text-sm font-medium text-neutral-300">
                            {customStatus()!.state}
                        </p>
                    </Show>

                    <Show when={otherActivity()}>
                        <p class="text-xs text-neutral-400">
                            {getActivityLabel(otherActivity()!)}
                            {otherActivity()!.details ?? otherActivity()!.name}
                        </p>
                    </Show>

                    <Show when={!customStatus()?.state && !otherActivity()}>
                        <p class="text-sm text-neutral-400">{status()}</p>
                    </Show>
                </div>
            </div>
        </div>
    )
}

function RoleSection(props: {
    title: string
    userIds: string[]
    users: Record<string, LanyardUser>
    colorClass: string
}) {
    const filteredUsers = () =>
        props.userIds
            .map((id) => props.users[id])
            .filter((u): u is LanyardUser => !!u)

    return (
        <Show when={filteredUsers().length > 0}>
            <section class="flex flex-col gap-4">
                <h2 class={`text-xl font-bold ${props.colorClass}`}>
                    {props.title}
                </h2>
                <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <For each={props.userIds}>
                        {(id) => (
                            <Show when={props.users[id]}>
                                <UserCard userData={props.users[id]} />
                            </Show>
                        )}
                    </For>
                </div>
            </section>
        </Show>
    )
}

export default function Teams() {
    const [users, setUsers] = createSignal<Record<string, LanyardUser>>({})
    const [loading, setLoading] = createSignal(true)
    let ws: WebSocket | null = null

    onMount(async () => {
        const data = await fetchUsers(teamMembers)
        setUsers(data)
        setLoading(false)

        ws = createLanyardSocket(teamMembers, (userId, user) => {
            setUsers((prev) => ({ ...prev, [userId]: user }))
        })
    })

    onCleanup(() => {
        ws?.close()
    })

    return (
        <PageBootstrap
            meta={{ title: "Team" }}
            fullWidth
            icon={<Shield />}
            title="Meet the Team"
            description="The amazing people behind Equicord"
        >
            <LoadingState
                loading={loading()}
                loadingText="Loading team members"
            >
                <div class="flex flex-col gap-8">
                    <RoleSection
                        title="Owner"
                        userIds={ownerIds}
                        users={users()}
                        colorClass={RoleHeaders.owner}
                    />
                    <RoleSection
                        title="Team"
                        userIds={teamIds}
                        users={users()}
                        colorClass={RoleHeaders.team}
                    />
                    <RoleSection
                        title="Helpers"
                        userIds={helperIds}
                        users={users()}
                        colorClass={RoleHeaders.helper}
                    />
                    <RoleSection
                        title="Artists"
                        userIds={artistIds}
                        users={users()}
                        colorClass={RoleHeaders.artist}
                    />
                </div>
            </LoadingState>
        </PageBootstrap>
    )
}
