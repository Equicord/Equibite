export interface Commit {
    sha: string
    commit: {
        message: string
        author: {
            date: string
        }
    }
}

export interface Repository {
    name: string
    full_name: string
    description: string
    archived: boolean
    stargazers_count: number
    language: string
}
