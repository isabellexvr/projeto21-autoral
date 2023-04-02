import { Router } from "express";
import { bodyValidation, authToken } from "../middlewares";
import { newPostSchema } from "../schemas/publicationsSchemas";
import { createPost, findAllPosts } from "../controllers/publicationsControllers";

const publicationsRouter = Router();

publicationsRouter
    .all("/*", authToken)
    .post("/new-post", bodyValidation(newPostSchema), createPost)
    .get("/find-all-posts", findAllPosts)

export { publicationsRouter }