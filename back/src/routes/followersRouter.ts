import { follow, unfollow } from "../controllers";
import { Router } from "express";
import { authToken } from "../middlewares";

const followersRouter = Router()

followersRouter.use(authToken);

followersRouter
  .delete("/unfollow/:followedId", unfollow)
  .post("/follow/:followedId", follow);

followersRouter.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

export { followersRouter };
