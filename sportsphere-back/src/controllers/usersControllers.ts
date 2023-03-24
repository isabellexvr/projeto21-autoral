import { Response, Request } from "express";
import { users } from "@prisma/client";
import { usersServices } from "../services";
import { signIn } from "../protocols";

export async function createUser(req: Request, res: Response) {
    const userInfo: users = req.body;
    try {
        await usersServices.createUser(userInfo);
        return res.send("User created succesfully").status(201);
    } catch (error) {
        if (error.name === "UsernameConflictError") return res.status(409).send(error.message)
        if (error.name === "EmailConflictError") return res.status(409).send(error.message)
        return res.sendStatus(500)
    }
}

export async function login(req: Request, res: Response) {
    const loginInfo: signIn = req.body;

    try {
        const userInfo = await usersServices.login(loginInfo);
        return res.status(200).send(userInfo);
    } catch (error) {
        if (error.name === "UserNotFound") return res.status(404).send(error.message)
        if (error.name === "InvalidPasswordError") return res.status(401).send(error.message)
        return res.sendStatus(500)
    }
}