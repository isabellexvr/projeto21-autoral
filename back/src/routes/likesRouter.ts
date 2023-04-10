import { Router } from "express";
import { bodyValidation, authToken } from "../middlewares";
import { newLikeSchema } from "../schemas";
import { postLike } from "../controllers/likesControllers";

const likesRouter = Router();

likesRouter
.all("/*", authToken)
.post("/new", bodyValidation(newLikeSchema), postLike)

export { likesRouter }