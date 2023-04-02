import joi from "joi";

export const signupSchema = joi.object({
    fullName: joi.string().max(30).required(),
    userName: joi.string().max(15).required(),
    picture: joi.optional(),
    email: joi.string().email().required(),
    password: joi.string().required(),
});
