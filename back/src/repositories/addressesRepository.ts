import { AddressEntity } from "../controllers";
import { db } from "../config/db";

function postNewAddress(data: AddressEntity) {
    return db.prisma.addresses.create({ data })
}

function findAddress(data: AddressEntity) {
    return db.prisma.addresses.findFirst({ where: data });
}

function findAddressByUserId(userId: number) {
    return db.prisma.users.findFirst({ where: { id: userId }, select: { addresses: true } })
}

function findAddressByCommunityId(communityId: number) {
    return db.prisma.communities.findFirst({
        where: { id: communityId },
        select: { addresses: true }
    })
}

export const addressesRepository = {
    postNewAddress, findAddress, findAddressByUserId, findAddressByCommunityId
}