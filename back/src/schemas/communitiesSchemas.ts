import joi from "joi";

export const newCommunitySchema = joi.object({
    name: joi.string().required(),
    description: joi.string(),
    icon: joi.string(),
    cover: joi.string(),
    categoryId: joi.number().required(),
    createdAt: joi.date()
});