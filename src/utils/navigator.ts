const getUserAgent = (): string => window.navigator.userAgent
// TODO(fix): windows.navigator.vendor is deprecated, remove it.
const getVendor = (): string => window.navigator.vendor

// Check if the browser is Internet Explorer.
export const isIE = (): boolean => /MSIE |Trident\//.test(getUserAgent())

// Check if the browser is Edge.
export const isEdge = (): boolean => /Edg\//.test(getUserAgent())

// Check if the browser is from Microsoft (IE / Edge).
export const isMS = (): boolean => isIE() || isEdge()

// Check if the browser is Safari.
export const isSafari = (): boolean =>
    /Safari/.test(getUserAgent()) && /Apple Computer, Inc/.test(getVendor())

// Check if the OS is Windows
export const isWindows = (): boolean =>
    getUserAgent().toLowerCase().includes('win')

// Check if the OS is Mac
export const isMac = (): boolean => getUserAgent().toLowerCase().includes('mac')

// Check if the OS is Linux
export const isLinux = (): boolean =>
    getUserAgent().toLowerCase().includes('linux')
