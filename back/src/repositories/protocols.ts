import { posts, users } from "@prisma/client"

export type NewPost = {
    ownerId: number,
    description: string,
    media?: string
}

export type NewCommunityPost = {
    postId: number, communityId: number
}

export type NewComment = {
    ownerId: number,
    postId: number,
    comment: string,
    createdAt?: Date
}

export type NewLike = {
    ownerId: number,
    postId: number
}

export type CompletePost = (posts & {
    users: users;
    _count: {
        comments: number;
        likes: number;
    };
});