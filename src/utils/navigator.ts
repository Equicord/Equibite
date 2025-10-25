const getUserAgent = (): string => window.navigator.userAgent
// const getVendor = (): string => window.navigator.vendor

// Check if the OS is Windows
export const isWindows = (): boolean =>
    getUserAgent().toLowerCase().includes('win')

// Check if the OS is Mac
export const isMac = (): boolean => getUserAgent().toLowerCase().includes('mac')

// Check if the OS is Linux
export const isLinux = (): boolean =>
    getUserAgent().toLowerCase().includes('linux')

// Check if the OS is Android
export const isAndroid = (): boolean =>
    getUserAgent().toLowerCase().includes('android')
