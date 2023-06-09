import { Router } from "express";
import { bodyValidation, authToken } from "../middlewares";
import { commentSchema } from "../schemas";
import { deleteComment, editComment, findCommentsByPost, postComment } from "../controllers/commentsControllers";

const commentsRouter = Router();

commentsRouter
    .all("/*", authToken)
    .get("/find/:postId", findCommentsByPost)
    .post("/new", bodyValidation(commentSchema), postComment)
    .patch("/edit", bodyValidation(commentSchema), editComment)
    .delete("/delete", bodyValidation(commentSchema), deleteComment)

export { commentsRouter };