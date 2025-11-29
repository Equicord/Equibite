export interface AvatarDecoration {
    sku_id: string
    asset: string
    expires_at: string | null
}

export interface Activity {
    id: string
    name: string
    type: number
    state?: string
    details?: string
}

export type DiscordStatus = "online" | "idle" | "dnd" | "offline"

export interface LanyardUser {
    discord_user: {
        id: string
        username: string
        avatar: string | null
        discriminator: string
        public_flags: number
        global_name: string | null
        avatar_decoration_data?: AvatarDecoration | null
    }
    discord_status: DiscordStatus
    activities: Activity[]
}

export interface LanyardHelloMessage {
    op: 1
    d: {
        heartbeat_interval: number
    }
}

export interface LanyardInitMessage {
    op: 2
    d: {
        subscribe_to_ids: string[]
    }
}

export interface LanyardHeartbeatMessage {
    op: 3
}

export interface LanyardPresenceUpdateMessage {
    op: 0
    t: "PRESENCE_UPDATE"
    d: LanyardUser
}

export interface LanyardInitStateMessage {
    op: 0
    t: "INIT_STATE"
    d: Record<string, LanyardUser>
}

export type LanyardIncomingMessage =
    | LanyardHelloMessage
    | LanyardPresenceUpdateMessage
    | LanyardInitStateMessage

export type LanyardOutgoingMessage =
    | LanyardInitMessage
    | LanyardHeartbeatMessage
