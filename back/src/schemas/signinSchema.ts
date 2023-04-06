import joi from "joi";

export const signInSchema = joi.object({
    email: joi.string().email(),
    userName: joi.string(),
    password: joi.string().required()
});
