import { db } from "../config/db";
import { posts } from "@prisma/client";
import { communitiesPosts } from "@prisma/client";

type NewPost = {
    ownerId: number,
    description: string,
    media?: string
}

type NewCommunityPost = {
    postId: number, communityId: number
}

export function createPost(data: NewPost) {
    return db.prisma.posts.create({
        data
    })
}

export function setCommunityPost(data: NewCommunityPost){
    return db.prisma.communitiesPosts.create({data});
}

export const publicationsRepository = {
    createPost,
    setCommunityPost
}