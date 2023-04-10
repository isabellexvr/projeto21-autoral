import { usersRepository } from './../repositories/usersRepository';
import { publicationsRepository } from './../repositories/publicationsRepository';
import { newPost } from "../controllers/publicationsControllers";
import { userDoesntExist } from '../errors';
import { communitiesRepository } from '../repositories';

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

async function findPostsByCommunity(communityId: number){
    const posts = await publicationsRepository.findPostsByCommunityId(communityId);
    return posts
}

async function findPostsByUserCommunities(userId: number){
    const userCommunities = await communitiesRepository.findCommunitiesByUserId(userId);
    const userCommunitiesIds = userCommunities.map( c => c.id)
    const posts = await publicationsRepository.findPostsByUserCommunities(userCommunitiesIds);
    return posts
}



export const publicationsServices = {
    createPost,
    findUserTimeline,
    findUsersPosts,
    findPostsByCommunity,
    findPostsByUserCommunities
}