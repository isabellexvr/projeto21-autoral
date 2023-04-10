import { Router } from "express";
import { bodyValidation, authToken } from "../middlewares";
import { newPostSchema } from "../schemas/publicationsSchemas";
import { createPost, findPostsByCommunity, findPostsByUserCommunities, findTimelineById, findUsersPosts} from "../controllers/publicationsControllers";

const publicationsRouter = Router();

publicationsRouter
    .get("/profile/:userName", findUsersPosts)
    
    .all("/*", authToken)
    .post("/new", bodyValidation(newPostSchema), createPost)
    .get("/timeline", findTimelineById)
    .get("/communities/:communityId", findPostsByCommunity)
    .get("/user-communities", findPostsByUserCommunities)

export { publicationsRouter }