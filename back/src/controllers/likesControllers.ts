
import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { likesServices } from "../services/likesServices";

export async function postLike(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;
    const postId = req.params.postId;
    try {
        const data = { ownerId: userId, postId: Number(postId) };
        await likesServices.postLike(data);
        res.sendStatus(201);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export async function dislike(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;
    const postId = req.params.postId;
    try {
        console.log("oi")
        const data = { ownerId: userId, postId: Number(postId) };
        await likesServices.deleteLike(data);
        res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function findAll(req: AuthenticatedRequest, res: Response) {
    const postId = req.params.postId;
    try {
        const likes = await likesServices.findAllLikes(Number(postId));
        res.send(likes).status(200)

    } catch (error) {
        return res.status(500).send(error);
    }
}