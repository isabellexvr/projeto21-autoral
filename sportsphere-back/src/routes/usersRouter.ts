import { bodyValidation } from "../middlewares";
import { Router } from "express";
import { createUser } from "../controllers";
import { signupSchema } from "../schemas";

const usersRouter = Router();

usersRouter.post("/signup", bodyValidation(signupSchema), createUser);

export { usersRouter };
