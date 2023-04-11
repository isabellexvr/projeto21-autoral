import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { publicationsServices } from "../services/publicationsServices";

export type newPost = {
    description: string,
    media?: string
}

export async function createPost(req: AuthenticatedRequest, res: Response) {
    const postInfo: newPost = req.body;
    const communityId = req.params;
    const userId = req.userId

    try {
        await publicationsServices.createPost(postInfo, Number(communityId), userId);
        res.status(201).send('Post created successfully')
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

// procura a timeline (posts do usuário + posts dos quais ele segue)
export async function findTimelineById(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId
    try {
        const posts = await publicationsServices.findUserTimeline(userId);
        res.status(200).send(posts);
    } catch (error) {
        if (error.name === "UserDoesNotExist") return res.status(404).send(error.message);
        return res.status(500).send(error);
    }
}

export async function findUsersPosts(req: AuthenticatedRequest, res: Response) {
    const userName = req.params.userName

    try {
        const posts = await publicationsServices.findUsersPosts(userName);
        res.status(200).send(posts);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function findPostsByCommunity(req: AuthenticatedRequest, res: Response) {
    const communityId = req.params.communityId

    try {
        const posts = await publicationsServices.findPostsByCommunity(Number(communityId));
        res.status(200).send(posts);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function findPostsByUserCommunities(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;

    try {
        const posts = await publicationsServices.findPostsByUserCommunities(userId);
        res.status(200).send(posts);
    } catch (error) {
        return res.status(500).send(error);
    }
}