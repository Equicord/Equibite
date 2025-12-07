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
    language: string | null
}

export interface GitHubContentFile {
    type: "file"
    name: string
    path: string
    sha: string
    size: number
    url: string
    html_url: string
    git_url: string
    download_url: string
}

export interface GitHubContentDir {
    type: "dir"
    name: string
    path: string
    sha: string
    size: number
    url: string
    html_url: string
    git_url: string
    download_url: null
}

export type GitHubContent = GitHubContentFile | GitHubContentDir
