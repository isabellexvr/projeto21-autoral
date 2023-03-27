import { bodyValidation } from "../middlewares";
import { Router } from "express";
import { createUser, login } from "../controllers";
import { signupSchema, signInSchema } from "../schemas";

const usersRouter = Router();

usersRouter.post("/sign-up", bodyValidation(signupSchema), createUser);

usersRouter.post("/sign-in", bodyValidation(signInSchema), login);

//logout => retirar token do localstorage => expira em 3 horas

export { usersRouter };
