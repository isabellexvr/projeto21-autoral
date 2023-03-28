import { Router } from "express";
import { bodyValidation } from "middlewares";
import { authToken } from "middlewares/authMiddleware";
import { newPostSchema } from "schemas/publicationsSchemas";

const publicationsRouter = Router();

publicationsRouter
    .all("/*", authToken)
    .post("/user", bodyValidation(newPostSchema),)

export { publicationsRouter }