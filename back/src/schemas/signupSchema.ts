import joi from "joi";

export const signupSchema = joi.object({
    userInfo: joi.object({
        fullName: joi.string().max(30).required(),
        userName: joi.string().max(15).required(),
        picture: joi.string().optional(),
        cover: joi.string().optional(),
        email: joi.string().email().required(),
        password: joi.string().required(),
    }),
    locationInfo: joi.object({
        country: joi.string().required(),
        countryIso2: joi.string().max(2).required(),
        state: joi.string().required(),
        stateIso2: joi.string().max(2).required(),
        city: joi.string().required()
    })
});
