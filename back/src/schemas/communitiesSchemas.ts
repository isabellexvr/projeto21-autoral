import joi from "joi";

export const newCommunitySchema = joi.object({
    communityInfo: {
        name: joi.string().required(),
        description: joi.string(),
        icon: joi.string().allow(null),
        cover: joi.string().allow(null),
        categoryId: joi.number().required(),
        createdAt: joi.date().optional()
    },
    locationInfo: joi.object({
        country: joi.string().required(),
        countryIso2: joi.string().max(2).required(),
        state: joi.string().required(),
        stateIso2: joi.string().max(2).required(),
        city: joi.string().required()
    })
});