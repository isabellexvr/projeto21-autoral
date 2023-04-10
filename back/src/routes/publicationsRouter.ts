import { Router } from "express";
import { bodyValidation, authToken } from "../middlewares";
import { newPostSchema } from "../schemas/publicationsSchemas";
import { createPost, findTimelineById, findUsersPosts} from "../controllers/publicationsControllers";

const publicationsRouter = Router();

publicationsRouter
    .all("/*", authToken)
    .post("/new", bodyValidation(newPostSchema), createPost)
    .get("/timeline", findTimelineById)
    .get("/profile", findUsersPosts)

export { publicationsRouter }