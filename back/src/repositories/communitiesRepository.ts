import { addresses } from '@prisma/client';
import { db } from './../config/db';

export type NewCommunity = {
    name: string,
    description?: string,
    icon?: string,
    categoryId: number,
    ownerId: number,
    addressId: number,
    createdAt?: Date
}

function createCommunity(data: NewCommunity) {
    return db.prisma.communities.create({ data });
};

export type NewMember = {
    communityId: number,
    userId: number
}

function checkUserCommunityMember(data: NewMember) {
    return db.prisma.usersCommunities.findFirst({ where: { AND: [{ userId: data.userId }, { communityId: data.communityId }] } });
}

function addMemberIntoCommunity(data: NewMember) {
    return db.prisma.usersCommunities.create({ data });
};

function findCommunitiesByUserId(userId: number) {

    return db.prisma.communities.findMany({
        where: {
            usersCommunities: { some: { userId } }
        },
        include: { categories: true },
        orderBy: { createdAt: "desc" }
    })

};

function findCommunityByName(name: string) {
    return db.prisma.communities.findFirst({ where: { name } });
};

function findCommunitiesByCategoryId(categoryId: number) {
    return db.prisma.communities.findMany({ where: { categoryId } });
};

function findCommunityInfoByName(communityName: string) {
    console.log(communityName)
    return db.prisma.communities.findFirst({
        where: { name: communityName },
        include: { usersCommunities: { include: { users: true } }, addresses: true }
    })
}

export const communitiesRepository = {
    createCommunity,
    findCommunitiesByUserId,
    findCommunitiesByCategoryId,
    findCommunityByName,
    addMemberIntoCommunity,
    checkUserCommunityMember,
    findCommunityInfoByName
}