import { follow } from "../controllers";
import { Router } from "express";
import { authToken } from "../middlewares";

const followersRouter = Router()

followersRouter
    .all("*", authToken)
    .post("/follow/:followedId", follow)
    .delete("/unfollow/:followedId")


export { followersRouter };
