import { Router } from "express";
import { authToken } from "../middlewares";
import { dislike, findAll, postLike } from "../controllers/likesControllers";

const likesRouter = Router();

likesRouter
    .get("/find-all/:postId", findAll)
    .all("/*", authToken)
    .post("/new/:postId", postLike)
    .delete("/dislike/:postId", dislike)

export { likesRouter }