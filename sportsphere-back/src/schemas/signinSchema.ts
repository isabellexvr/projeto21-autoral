import joi from "joi";

type signIn = {
    email?: string,
    username?: string,
    password: string
}

export const signInSchema = joi.object({
    email: joi.string().email(),
    username: joi.string(),
    password: joi.string().required()
});
