import { UnauthorizedError } from "../errors/authErrors";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
    userId: number;
};

export async function authToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(403).send(UnauthorizedError());

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(403).send(UnauthorizedError());

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
        req.userId = userId;
    } catch (error) {
        if(error.name === "TokenExpiredError") return res.status(403).send(error.message)
        return res.status(500).send(error)
    }

    return next()
}