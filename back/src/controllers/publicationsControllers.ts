import { Response, Request } from "express";
import { posts } from "@prisma/client";

type newPost = {
    description: string,
    media?: string
}

export async function createPost(req: Request, res: Response) {
    const postInfo: newPost = req.body;

    try{

    }catch (error) {

    }
}