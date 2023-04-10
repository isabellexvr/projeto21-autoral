import { Router } from "express";
import { authToken } from "../middlewares/authMiddleware";
import { createNewCommunity, findUsersCommunities, findCategoryCommunities } from "../controllers/communitiesControllers";
import { bodyValidation } from "../middlewares";
import { newCommunitySchema } from "../schemas/communitiesSchemas";

const communitiesRouter = Router();

communitiesRouter
    .get("/category/:categoryId", findCategoryCommunities)
    .get("/user/:userName", findUsersCommunities)
    .all("*", authToken)
    .post("/create", bodyValidation(newCommunitySchema), createNewCommunity)
    

export { communitiesRouter };