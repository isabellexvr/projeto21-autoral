import { Router } from "express";
import { bodyValidation, authToken } from "../middlewares";
import { newLike, newPostSchema } from "../schemas/publicationsSchemas";
import { createPost, findAllPosts, findTimelineById, postComment, postLike } from "../controllers/publicationsControllers";

const publicationsRouter = Router();

publicationsRouter
    .all("/*", authToken)
    .post("/new", bodyValidation(newPostSchema), createPost)
    .get("/findAll", findAllPosts)
    .get("/findById", findTimelineById)
    .post("/like", bodyValidation(newLike), postLike)
    .post("/comment", postComment)

export { publicationsRouter }