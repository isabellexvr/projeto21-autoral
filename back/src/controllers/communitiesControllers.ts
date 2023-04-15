import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { communitiesServices } from "../services/communitiesServices";

type NewCommunityPayload = {
    name: string,
    description?: string,
    icon?: string,
    cover?: string,
    categoryId: number,
    cityId: number,
    createdAt?: Date
}

export async function createNewCommunity(req: AuthenticatedRequest, res: Response) {

    const userId = req.userId;
    const body: NewCommunityPayload = req.body;

    try {
        const data = { ...body, adminId: userId };
        await communitiesServices.createCommunity(data);
        res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error)
    };
};

export async function findUsersCommunities(req: AuthenticatedRequest, res: Response) {
    const userName = req.params.userName;

    try {
        const communities = await communitiesServices.findUserCommunities(userName);
        res.send(communities).status(200);
    } catch (error) {
        return res.status(500).send(error)
    };
};

export async function findCategoryCommunities(req: AuthenticatedRequest, res: Response) {
    const categoryId = req.params.categoryId;

    try {
        const communities = await communitiesServices.findCategoryCommunities(Number(categoryId));
        res.send(communities).status(200);
    } catch (error) {
        return res.status(500).send(error)
    };
};

export async function addMemberToCommunity(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;
    const communityId = req.params.communityId;

    try {
        await communitiesServices.addMemberIntoCommunity({ userId, communityId: Number(communityId) });
        res.sendStatus(201)
    } catch (error) {
        return res.status(500).send(error);
    }
}