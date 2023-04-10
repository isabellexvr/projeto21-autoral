import { NewComment } from './../repositories/protocols';
import { usersRepository } from './../repositories/usersRepository';
import { publicationsRepository } from './../repositories/publicationsRepository';
import { newPost } from "../controllers/publicationsControllers";
import { userDoesntExist } from '../errors';
import { NewLike } from '../repositories/protocols';

async function createPost(info: newPost, communityId: number | null, userId: number) {
    const { description, media } = info;
    const presentTime = new Date();
    const newPostData = {
        ownerId: userId,
        description,
        media,
        createdAt: presentTime.toISOString()
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

async function checkUserExists(userId: number) {
    const user = await usersRepository.findUserById(userId);
    if(!user) throw userDoesntExist();
}

async function findUserTimeline(userId: number) {
    await checkUserExists(userId);
    const posts = await publicationsRepository.findUserTimeline(userId);
    return posts

}

async function findUsersPosts(userId: number) {
    await checkUserExists(userId);
    const posts = await publicationsRepository.findUsersPosts(userId);
    return posts;
}

async function postLike(data: NewLike) {
    await publicationsRepository.postLike(data);
}

async function postComment(data: NewComment){
    await publicationsRepository.postComment(data);
}

export const publicationsServices = {
    createPost,
    findUserTimeline,
    findUsersPosts,
    postLike,
    postComment
}