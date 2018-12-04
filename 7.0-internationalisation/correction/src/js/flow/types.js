//@flow

export type Comment = {
    id: number,
    content: string,
    nickname: string,
    createdAt: string
}

export type Post = {
    id: number,
    picture: string,
    filter: string,
    description?: string,
    createdAt: string,
    comments?: Array<Comment>
}