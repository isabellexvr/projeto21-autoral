import bodyValidation from "@/middlewares/bodyValidationMiddleware";
import { Router } from "express";
import { testController } from "../controllers";
import { signupSchema } from "@/schemas";

const usersRouter = Router();

usersRouter.post("/signup", bodyValidation(signupSchema))

export { usersRouter };
