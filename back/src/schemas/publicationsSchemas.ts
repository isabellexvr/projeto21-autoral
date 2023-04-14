import joi from "joi";

export const newPostSchema = joi.object({
    description: joi.string().required(),
    media: joi.string(),
    communityId: joi.number()
})
