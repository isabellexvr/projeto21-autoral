import { Router } from "express";
import { bodyValidation, authToken } from "../middlewares";
import { newPostSchema } from "../schemas/publicationsSchemas";
import { createPost, findAllPosts, findTimelineById } from "../controllers/publicationsControllers";

const publicationsRouter = Router();

publicationsRouter
    .all("/*", authToken)
    .post("/new", bodyValidation(newPostSchema), createPost)
    .get("/findAll", findAllPosts)
    .get("/findById", findTimelineById)

export { publicationsRouter }