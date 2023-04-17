import { Response, Request } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { followersServices } from "../services";

export async function follow(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;
    const followedId = req.params.followedId
    try {
        await followersServices.follow(userId, Number(followedId))
        res.sendStatus(201);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

export async function unfollow(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;
    const followedId = req.params.followedId
    try {
        console.log(userId, followedId)
        await followersServices.unfollow(userId, Number(followedId))
        res.sendStatus(201);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}