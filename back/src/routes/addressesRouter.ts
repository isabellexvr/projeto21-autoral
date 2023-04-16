import { Router } from "express";
import { bodyValidation } from "middlewares";
import { newAddressSchema } from "schemas/addressesSchemas";

const addressesRouter = Router()

addressesRouter.post("/new", bodyValidation(newAddressSchema), )

addressesRouter.get("/find-by-user/:userId", )

addressesRouter.get("/find-by-community/:communityId")

export {addressesRouter};