import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { commentsServices } from "../services/commentsServices";

type PartNewComment = {
    postId: number;
    comment: string;
    createdAt?: Date;
}

export async function postComment(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;
    const comment: PartNewComment = req.body.postId;

    try {
        await commentsServices.postComment({ ...comment, ownerId: userId });
        res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function editComment(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;
    const comment: PartNewComment = req.body.postId;

    try {
        await commentsServices.editComment({ ...comment, ownerId: userId });
        res.sendStatus(200)
    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function deleteComment(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;
    const comment: PartNewComment = req.body.postId;

    try {
        await commentsServices.deleteComment({ ...comment, ownerId: userId });
        res.sendStatus(200)
    } catch (error) {
        return res.status(500).send(error);
    }
}