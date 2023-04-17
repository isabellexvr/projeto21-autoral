import { NewCommunity, NewMember, communitiesRepository } from "../repositories/communitiesRepository";
import { ExceededLimitError, NameAlreadyExistsError, UserIsAlreadyAMember } from "../errors/communitiesErrors";
import { usersRepository } from "../repositories";
import { NewCommunityPayload } from "controllers";
import { addressesServices } from "./addressesServices";

async function createCommunity(payload: NewCommunityPayload) {
    await checkCommunitiesAmmount(payload.communityInfo.ownerId);
    await checkCommunityName(payload.communityInfo.name);

   // console.log("aqui ó: ",payload.communityInfo.ownerId)

    const addressId = await addressesServices.findOrCreateAddress(payload.locationInfo)

    const community = await communitiesRepository.createCommunity({ ...payload.communityInfo, addressId });

    await addMemberIntoCommunity({ communityId: community.id, userId: community.ownerId });
}

async function addMemberIntoCommunity(data: NewMember) {

    const user = await communitiesRepository.checkUserCommunityMember(data);

    if (user) throw UserIsAlreadyAMember();

    await communitiesRepository.addMemberIntoCommunity(data);
}

async function checkCommunitiesAmmount(userId: number) {
    const quantity = await communitiesRepository.findCommunitiesByUserId(userId);

    if (quantity.length > 3) throw ExceededLimitError();
}

async function checkCommunityName(name: string) {

    const community = await communitiesRepository.findCommunityByName(name);

    if (community) throw NameAlreadyExistsError();
}

async function findUserCommunities(userName: string) {

    const user = await usersRepository.findUserByUsername(userName);

    const communities = await communitiesRepository.findCommunitiesByUserId(user.id);
    return communities;
}

async function findCategoryCommunities(categoryId: number) {

    const communities = await communitiesRepository.findCommunitiesByCategoryId(categoryId);
    return communities;
}

async function findCommunityInfo(communityName: string) {
    const info = communitiesRepository.findCommunityInfoByName(communityName)
    return info
}

export const communitiesServices = {
    createCommunity,
    findUserCommunities,
    findCategoryCommunities,
    addMemberIntoCommunity,
    findCommunityInfo
}