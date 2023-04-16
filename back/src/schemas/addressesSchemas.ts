import joi from "joi";

export const newAddressSchema = joi.object({
    country: joi.string().required(),
    countryIso2: joi.string().max(2).required(),
    state: joi.string().required(),
    stateIso2: joi.string().max(2).required(),
    city: joi.string().required()
})