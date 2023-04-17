import { YouDontFollowError } from "../errors/followersErrors";
import { FollowersEntity, followersRepository } from "../repositories/followersRepository";


async function follow(followerId: number, followedId: number) {
    await followersRepository.follow({ followerId, followedId });

}

async function findFollowingOrFail(data: FollowersEntity) {
    const following = await followersRepository.findFollowing(data);
    if (!following) throw YouDontFollowError();
    return following.id
}

async function unfollow(followerId: number, followedId: number) {

    const id = await findFollowingOrFail({ followerId, followedId });

    await followersRepository.unfollow(id);
}

export const followersServices = {
    follow, unfollow
}