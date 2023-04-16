import { findAddressByCommunity, findAddressByUser, postNewAddress } from "../controllers";
import { Router } from "express";
import { bodyValidation } from "../middlewares";
import { newAddressSchema } from "../schemas/addressesSchemas";

const addressesRouter = Router()

addressesRouter.post("/new", bodyValidation(newAddressSchema), postNewAddress)

addressesRouter.get("/find-by-user/:userId", findAddressByUser)

addressesRouter.get("/find-by-community/:communityId", findAddressByCommunity)

export { addressesRouter };