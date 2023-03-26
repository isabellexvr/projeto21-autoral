import joi from "joi";

//TO DO: Arrumar o profilePic pra upload de imagem

export const signupSchema = joi.object({
    fullName: joi.string().max(30).required(),
    userName: joi.string().max(15).required(),
    picture: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
});
