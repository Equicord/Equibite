import { onMount } from "solid-js"
import { Title, Meta } from "@solidjs/meta"

export default function FreeNitro() {
    onMount(() => {
        // setTimeout(() => {
        //     window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        // }, 1000)
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    })

    return (
        <>
            {/* Meta Tags for Discord Embed */}
            <Title>Free Discord Nitro</Title>
            <Meta property="og:title" content="Free Discord Nitro" />
            <Meta property="og:description" content="Get 3 years of Discord Nitro for free. Limited time offer!" />
            <Meta property="og:image" content="/src/assets/nitro.png" />
            <Meta property="og:url" content="/freenitro" />
            <Meta name="twitter:card" content="summary_large_image" />

            <p>Redirecting to your free Nitro...</p>
        </>
    )
}
