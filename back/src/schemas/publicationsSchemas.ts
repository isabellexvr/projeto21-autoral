import joi from "joi";

export const newPostSchema = joi.object({
    description: joi.string().required(),
    media: joi.string()
})

export const newLike = joi.object({
    postId: joi.number().required()
})