import { usersRepository } from './../repositories/usersRepository';
import { publicationsRepository } from './../repositories/publicationsRepository';
import { newPost } from "../controllers/publicationsControllers";
import { userDoesntExist } from '../errors';

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

async function findAll(){
    const posts = await publicationsRepository.findAll();
    return posts
}

async function checkUserExists(userId: number) {
    const user = await usersRepository.findUserById(userId);
    if(!user) throw userDoesntExist();
}

async function findUserTimeline(userId: number) {
    await checkUserExists(userId);
    const posts = await publicationsRepository.findUserTimeline(userId);
    return posts

}

export const publicationsServices = {
    createPost,
    findAll,
    findUserTimeline
}