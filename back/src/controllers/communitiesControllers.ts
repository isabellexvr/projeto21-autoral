import { Response, Request } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { communitiesServices } from "../services/communitiesServices";

export type NewCommunityPayload = {
    communityInfo: {
        name: string,
        description?: string,
        icon?: string,
        cover?: string,
        categoryId: number,
        createdAt?: Date,
        ownerId: number
    },
    locationInfo: {
        country: string,
        countryIso2: string,
        state: string,
        stateIso2: string,
        city: string
    }

}

export async function createNewCommunity(req: AuthenticatedRequest, res: Response) {

    const userId = req.userId;
    const body: NewCommunityPayload = req.body;

    try {
        const data = { ...body, adminId: userId };
        await communitiesServices.createCommunity(data);
        res.sendStatus(201);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    };
};

export async function findUsersCommunities(req: Request, res: Response) {
    const userName = req.params.userName;

    try {
        const communities = await communitiesServices.findUserCommunities(userName);
        res.send(communities).status(200);
    } catch (error) {
        return res.status(500).send(error)
    };
};

export async function findCategoryCommunities(req: Request, res: Response) {
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

export async function findCommunityInfo(req: Request, res: Response) {
    const categoryName = req.params.categoryName;

    try {
        const info = await communitiesServices.findCommunityInfo(categoryName);
        res.send(info).status(200);
    } catch (error) {
        return res.status(500).send(error)
    };
};