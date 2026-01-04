const getUserAgent = (): string => window.navigator.userAgent

export const isWindows = (): boolean =>
    getUserAgent().toLowerCase().includes("windows")

export const isMac = (): boolean =>
    getUserAgent().toLowerCase().includes("macintosh")

export const isLinux = (): boolean =>
    getUserAgent().toLowerCase().includes("linux")

export const isChromeOS = (): boolean =>
    getUserAgent().toLowerCase().includes("cros")

export const isAndroid = (): boolean =>
    getUserAgent().toLowerCase().includes("android")

export const isIOS = (): boolean => {
    const agent = getUserAgent().toLowerCase()
    return (
        agent.includes("iphone") ||
        agent.includes("ipad") ||
        agent.includes("ipod")
    )
}
