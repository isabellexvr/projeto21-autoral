import { Response, Request } from "express";
import { users } from "@prisma/client";
import { usersServices } from "../services";

export async function createUser(req: Request, res: Response) {
    const userInfo: users = req.body;
    try {
        await usersServices.createUser(userInfo);
        return res.send("User created succesfully").status(201);
    } catch (error) {
        if(error.name === "UsernameConflictError") return res.status(409).send(error.message)
        if(error.name === "EmailConflictError")return res.status(409).send(error.message)
        return res.sendStatus(500)
    }
}
