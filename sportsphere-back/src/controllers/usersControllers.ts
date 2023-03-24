import { Response, Request } from "express";
import { users } from "@prisma/client";
import { usersServices } from "../services";

export async function createUser(req: Request, res: Response) {
    const userInfo: users = req.body;
    try {
        await usersServices.createUser(userInfo);
        res.send("User created succesfully").status(201);
    } catch (error) {
        switch (error.name) {
            case "UsernameConflictError": return res.send(error.message).status(409)
            case "EmailConflictError": return res.send(error.message).status(409)
            default: res.send(error.message).status(500)
        }
    }
}
