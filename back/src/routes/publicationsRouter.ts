import { Router } from "express";
import { bodyValidation, authToken } from "../middlewares";
import { newLike, newPostSchema } from "../schemas/publicationsSchemas";
import { createPost, findTimelineById, findUsersPosts, postComment, postLike } from "../controllers/publicationsControllers";

const publicationsRouter = Router();

publicationsRouter
    .all("/*", authToken)
    .post("/new", bodyValidation(newPostSchema), createPost)
    .get("/timeline", findTimelineById)
    .get("/profile", findUsersPosts)
    .post("/like", bodyValidation(newLike), postLike)
    .post("/comment", postComment)

export { publicationsRouter }