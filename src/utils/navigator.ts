const getUserAgent = (): string => window.navigator.userAgent

export const isWindows = (): boolean =>
    getUserAgent().toLowerCase().includes("windows")

export const isMac = (): boolean =>
    getUserAgent().toLowerCase().includes("macintosh")

export const getMacArch = (): "arm64" | "x64" | "unknown" => {
    const ua = getUserAgent().toLowerCase();
    if (!isMac()) return "unknown";
    if (ua.includes("arm") || ua.includes("aarch64")) return "arm64";
    if (ua.includes("x86_64") || ua.includes("intel")) return "x64";
    return "unknown";
};

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
