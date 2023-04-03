import joi from "joi";

export const signInSchema = joi.object({
    email: joi.string().email().required(),
    username: joi.string(),
    password: joi.string().required()
});
