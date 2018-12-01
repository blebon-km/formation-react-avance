//@flow

export type Comment = {
    content: string,
    nickname: string,
    createdAt: string
}

export type Post = {
    id: number,
    picture: string,
    description?: string,
    createdAt: string,
    comments?: Array<Comment>
}