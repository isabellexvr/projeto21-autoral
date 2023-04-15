import { bodyValidation } from "../middlewares";
import { Router } from "express";
import { createUser, findInfo, login, upload } from "../controllers";
import { signupSchema, signInSchema } from "../schemas";

const usersRouter = Router();

usersRouter.post("/sign-up", bodyValidation(signupSchema), createUser);

usersRouter.post("/sign-in", bodyValidation(signInSchema), login);

usersRouter.post("/upload-image", upload);

usersRouter.get("/info/:userName", findInfo)

//TO-DO: tem algumas rotas que são autenticadas e outras não => decidir se um user deslogado pode ver as coisas

export { usersRouter };
