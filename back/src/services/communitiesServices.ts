import { NewCommunity, NewMember, communitiesRepository } from "../repositories/communitiesRepository";
import { ExceededLimitError, NameAlreadyExistsError, UserIsAlreadyAMember } from "../errors/communitiesErrors";

async function createCommunity(data: NewCommunity) {
    checkCommunitiesAmmount(data.adminId);
    checkCommunityName(data.name);


    const community = await communitiesRepository.createCommunity(data);

    addMemberIntoCommunity({ communityId: community.id, userId: community.adminId });
}

async function addMemberIntoCommunity(data: NewMember) {

    const user = communitiesRepository.checkUserCommunityMember(data);

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

async function findUserCommunities(userId: number) {

    const communities = await communitiesRepository.findCommunitiesByUserId(userId);
    return communities;
}

async function findCategoryCommunities(categoryId: number) {

    const communities = await communitiesRepository.findCommunitiesByCategoryId(categoryId);
    return communities;
}

export const communitiesServices = {
    createCommunity,
    findUserCommunities,
    findCategoryCommunities,
    addMemberIntoCommunity
}