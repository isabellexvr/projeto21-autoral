import { Router } from "express";
import { authToken } from "../middlewares/authMiddleware";
import { createNewCommunity, findUsersCommunities, findCategoryCommunities } from "../controllers/communitiesControllers";
import { bodyValidation } from "../middlewares";
import { newCommunitySchema } from "../schemas/communitiesSchemas";

const communitiesRouter = Router();

communitiesRouter
    .get("/category/:categoryId", findCategoryCommunities)
    .all("*", authToken)
    .post("/create", bodyValidation(newCommunitySchema), createNewCommunity)
    .get("/user", findUsersCommunities)

export { communitiesRouter };