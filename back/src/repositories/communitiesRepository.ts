import { db } from './../config/db';

type NewCommunity ={
    name: string,
    description?: string,
    icon?: string,
    categoryId: number,
    adminId: number,
    createdAt?: Date
}

function createCommunity(data: NewCommunity){
    return db.prisma.communities.create({data});
};

export const communitiesRepository = {
    createCommunity
}