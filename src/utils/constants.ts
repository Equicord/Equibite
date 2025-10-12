export const Urls = {
    ALL_PLUGINS_URL:
        'https://raw.githubusercontent.com/Equicord/Equibored/main/plugins.json',
    EQUICORD_PLUGINS_URL:
        'https://raw.githubusercontent.com/Equicord/Equibored/main/equicordplugins.json',
    VENCORD_PLUGINS_URL:
        'https://raw.githubusercontent.com/Equicord/Equibored/main/vencordplugins.json',
    DISCORD_URL: '/discord',
    GITHUB_URL: 'https://github.com/equicord',
    DISCORD_API: 'https://discord.com/api/v10',
    DISCORD_CDN: 'https://cdn.discordapp.com',
}

export const ownerIds = [
    848339671629299742n, // thor
].map(String)

export const teamIds = [
    913205935319691335n, // cortex
    209830981060788225n, // creations
    929208515883569182n, // indi
    1120045713867423835n, // naibuu
].map(String)

export const helperIds = [
    516750892372852754n, // aspy
    755144413411410060n, // drwhofan13
].map(String)

export const artistIds = [
    789872551731527690n, // foxstorm1
    989197238687387709n, // zunne
    1124341362955919371n, // blade0
    1344190786476183643n, // stealtech
].map(String)

export const teamMembers = [...ownerIds, ...teamIds, ...helperIds, ...artistIds]
