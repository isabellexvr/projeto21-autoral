import { Router } from "express";
import { bodyValidation, authToken } from "../middlewares";
import { newCommentSchema } from "../schemas";
import { postComment } from "../controllers/commentsControllers";

const commentsRouter = Router();

commentsRouter
    .all("/*", authToken)
    .post("/new", bodyValidation(newCommentSchema), postComment);

export { commentsRouter };