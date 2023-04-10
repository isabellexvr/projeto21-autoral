import joi from "joi";

export const newPostSchema = joi.object({
    description: joi.string().required(),
    media: joi.string()
})

export const newLikeSchema = joi.object({
    postId: joi.number().required()
});

export const newCommentSchema = joi.object({
    postId: joi.number().required(),
    comment: joi.string().required()
})