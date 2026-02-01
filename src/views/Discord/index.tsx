import SimpleBootstrap from "@components/SimpleBootstrap"

import { ExternalLink } from "lucide-solid"
import { onMount } from "solid-js"

export default function Discord() {
    onMount(() => {
        window.location.href = "https://discord.gg/wKgT9j2xfN"
    })

    return (
        <SimpleBootstrap
            meta={{ title: "Discord | Equicord" }}
            icon={<ExternalLink size={72} />}
            title={"Redirecting to our Discord."}
        />
    )
}
