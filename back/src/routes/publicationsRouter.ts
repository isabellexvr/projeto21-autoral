import { Router } from "express";
import { bodyValidation, authToken } from "../middlewares";
import { newPostSchema } from "../schemas/publicationsSchemas";
import { createPost } from "../controllers/publicationsControllers";

const publicationsRouter = Router();

publicationsRouter
    .all("/*", authToken)
    .post("/user", bodyValidation(newPostSchema), createPost)

export { publicationsRouter }