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

    try{
        await publicationsServices.createPost(postInfo, Number(communityId), userId);
        res.status(201).send('Post created successfully')
    }catch (error) {
        return res.status(500).send(error)
    }
}

export async function findAllPosts(req: AuthenticatedRequest, res: Response) {
    try{
        const posts = await publicationsServices.findAll()
        res.status(200).send(posts)
    }catch(error){
        return res.status(500).send(error)
    }
}