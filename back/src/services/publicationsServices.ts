import { publicationsRepository } from './../repositories/publicationsRepository';
import { newPost } from "controllers/publicationsControllers";

async function createPost(info: newPost, communityId: number | null, userId: number) {
    const { description, media } = info;
    const newPostData = {
        ownerId: userId,
        description,
        media
    }
    if (!communityId) {

        await publicationsRepository.createPost(newPostData)
        return
    }

    const post = await publicationsRepository.createPost(newPostData);
    const communityPostData = {
        postId: post.id, communityId
    }
    await publicationsRepository.setCommunityPost(communityPostData);
    return
}

export const publicationsServices = {
    createPost
}