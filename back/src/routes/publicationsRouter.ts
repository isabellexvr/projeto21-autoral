import { Router } from "express";
import { bodyValidation } from "middlewares";
import { newPostSchema } from "schemas/publicationsSchemas";

const publicationsRouter = Router();

publicationsRouter.post("/user", bodyValidation(newPostSchema), )