import { Router } from "express";
import { testController } from "../controllers";

const usersRouter = Router();

usersRouter.get("/test", testController)
//usersRouter.post("/")

export { usersRouter };
