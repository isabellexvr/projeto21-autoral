import { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";

export function bodyValidation(schema: ObjectSchema) {

    return (req: Request, res: Response, next: NextFunction) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send("Request body cannot be empty");
        }
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).send(error.details.map(d => d.message))
        }
        next();
    }
}