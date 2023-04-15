import joi from "joi";

export const newCommunitySchema = joi.object({
    name: joi.string().required(),
    description: joi.string(),
    icon: joi.string().allow(null),
    cover: joi.string().allow(null),
    categoryId: joi.number().required(),
    createdAt: joi.date()
});