import { db } from './../config/db';

export type NewCommunity = {
    name: string,
    description?: string,
    icon?: string,
    categoryId: number,
    adminId: number,
    cityId: number,
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
        include: {categories: true},
        orderBy: {createdAt: "desc"}
    })

};

function findCommunityByName(name: string) {
    return db.prisma.communities.findFirst({ where: { name } });
};

function findCommunitiesByCategoryId(categoryId: number) {
    return db.prisma.communities.findMany({ where: { categoryId } });
};

export const communitiesRepository = {
    createCommunity,
    findCommunitiesByUserId,
    findCommunitiesByCategoryId,
    findCommunityByName,
    addMemberIntoCommunity,
    checkUserCommunityMember
}