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

function createPost(data: NewPost) {
    return db.prisma.posts.create({
        data
    })
}

function setCommunityPost(data: NewCommunityPost) {
    return db.prisma.communitiesPosts.create({ data });
}

function findAll() {
    return db.prisma.posts.findMany({
        orderBy: { id: 'desc' },
        include: {
            _count: {
                select: { likes: true, comments: true }
            }
        }
    });
}

export const publicationsRepository = {
    createPost,
    setCommunityPost,
    findAll
}