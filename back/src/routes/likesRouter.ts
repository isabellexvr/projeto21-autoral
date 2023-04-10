import { Router } from "express";
import { bodyValidation, authToken } from "../middlewares";
import { dislike, postLike } from "../controllers/likesControllers";
import { likeSchema } from "../schemas";

const likesRouter = Router();

likesRouter
    .all("/*", authToken)
    .post("/new", bodyValidation(likeSchema), postLike)
    .delete("/dislike", bodyValidation(likeSchema), dislike)

export { likesRouter }