import { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";

export function bodyValidation(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).send(error.details.map(d => d.message))
        }
        next();
    }
}