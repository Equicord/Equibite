const getUserAgent = (): string => window.navigator.userAgent

const getVendor = (): string => window.navigator.vendor

const isIE = (): boolean => /MSIE |Trident\//.test(getUserAgent())

const isEdge = (): boolean => /Edg\//.test(getUserAgent())

const isMS = (): boolean => isIE() || isEdge()

const isSafari = (): boolean =>
    /Safari/.test(getUserAgent()) && /Apple Computer, Inc/.test(getVendor())

export { getUserAgent, getVendor, isIE, isEdge, isMS, isSafari }
