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
    discord_status: string
    activities: Activity[]
}
