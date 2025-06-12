export const Urls = {
    PLUGINS_URL:
        'https://raw.githubusercontent.com/Equicord/Equibored/main/plugins.json',
    DISCORD_URL: 'https://discord.gg/hC5VG9FzMG',
    GITHUB_URL: 'https://github.com/equicord',
    DISCORD_API: 'https://discord.com/api/v10',
    DISCORD_CDN: 'https://cdn.discordapp.com',
}

export const ownerIds = [
    848339671629299742n, // thor
].map(String)

export const teamIds = [
    400111022901559298n, // cortex
    209830981060788225n, // creations
    929208515883569182n, //indi 
    1207087393929171095n, // nyx
    840854894881538079n, // vmohammad 
].map(String)

export const helperIds = [
    516750892372852754n, // aspy
    755144413411410060n, // DrWhoFan13
].map(String)

export const teamMembers = [
    ...ownerIds,
    ...teamIds,
    ...helperIds,
]