import { Urls } from "@/constants"
import { TeamResponse } from "@/types"

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.substring(1)
}

export async function fetchEquibopVersion() {
    const res = await fetch(Urls.EQUIBOP_VERSION_URL)
    const data = (await res.text()).trim()

    return data
}

export async function fetchTeam(): Promise<TeamResponse> {
    const res = await fetch(Urls.TEAM_JSON_URL)
    const data: TeamResponse = await res.json()

    return data
}
