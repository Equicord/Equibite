import { onMount } from "solid-js"

export default function FreeNitro() {
    onMount(() => {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    })

    return <p>Redirecting to your free Nitro...</p>
}