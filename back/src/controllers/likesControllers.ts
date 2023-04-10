
import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { likesServices } from "../services/likesServices";

export async function postLike(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;
    const postId: number = req.body.postId;
    try {
        const data = { ownerId: userId, postId };
        await likesServices.postLike(data);
        res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function dislike(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;
    const postId: number = req.body.postId;
    try {
        const data = { ownerId: userId, postId };
        await likesServices.deleteLike(data);
        res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error);
    }
}