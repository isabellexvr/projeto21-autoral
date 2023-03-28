import { Response, Request } from "express";
import { publicationsServices } from "services/publicationsServices";

export type newPost = {
    description: string,
    media?: string
}



export async function createPost(req: Request, res: Response) {
    const postInfo: newPost = req.body;
    const communityId = req.params;

    try{
        await publicationsServices.createPost(postInfo, Number(communityId));
        res.status(201).send('Post created successfully')
    }catch (error) {

    }
}