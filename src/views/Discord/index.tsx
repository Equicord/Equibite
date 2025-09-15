import { onMount } from 'solid-js'

export default function Discord() {
    onMount(() => {
        window.location.href = 'https://discord.gg/equicord-1173279886065029291'
    })

    return <p>Redirecting to our Discord server.</p>
}