import { bodyValidation } from "../middlewares";
import { Router } from "express";
import { createUser } from "../controllers";
import { signupSchema, signInSchema } from "../schemas";

const usersRouter = Router();

usersRouter.post("/signup", bodyValidation(signupSchema), createUser);

usersRouter.post("/signin", bodyValidation(signInSchema))

export { usersRouter };
