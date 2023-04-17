import { follow, unfollow } from "../controllers";
import { Router } from "express";
import { authToken } from "../middlewares";

const followersRouter = Router()

followersRouter.use(authToken);

followersRouter
  .delete("/unfollow/:followedId", unfollow)
  .post("/follow/:followedId", follow);

export { followersRouter };
