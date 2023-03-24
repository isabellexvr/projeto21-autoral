import joi from "joi";

//TO DO: Arrumar o profilePic pra upload de imagem

export const signupSchema = joi.object({
    name: joi.string().max(30).required(),
    username: joi.string().max(15).required(),
    profilePic: joi.string(),
    email: joi.string().email().required(),
    password: joi.string().required(),
});
