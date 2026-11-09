export interface DisplayImage {
    title: string
    artist?: string
    url: string
    holiday?: boolean
}

export interface FolderImages {
    folder: string
    images: DisplayImage[]
}
