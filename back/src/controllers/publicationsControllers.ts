import { NewComment } from './../repositories/protocols';
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
        return res.status(500).send(error)
    }
}

export async function findAllPosts(req: AuthenticatedRequest, res: Response) {
    try {
        const posts = await publicationsServices.findAll()
        res.status(200).send(posts)
    } catch (error) {
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


export async function postLike(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;
    const postId: number = req.body.postId;
    try {
        const data = { ownerId: userId, postId };
        await publicationsServices.postLike(data);
        res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error);
    }
}

type PartNewComment = {
    postId: number;
    comment: string;
    createdAt?: Date;
}

export async function postComment(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;
    const comment: PartNewComment = req.body.postId;

    try {
        await publicationsServices.postComment({ ...comment, ownerId: userId });
        res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error);
    }
}