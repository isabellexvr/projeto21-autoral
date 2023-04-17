import { db } from "../config/db";

export type FollowersEntity = {
    followerId: number,
    followedId: number
}

function follow(data: FollowersEntity) {
    return db.prisma.followers.create({
        data
    })
}

function unfollow(id: number) {
    return db.prisma.followers.delete({
        where: { id }
    })
}

function findFollowing(data: FollowersEntity) {
    return db.prisma.followers.findFirst({ where: data })
}

export const followersRepository = {
    follow, findFollowing, unfollow
}