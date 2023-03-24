import { db } from "../config/db";
import { Response, Request } from "express";
import { users } from "@prisma/client";
import { usersServices } from "@/services";

export async function createUser(req: Request,res: Response) {
/*     const something = db.prisma.users.findFirst();
    res.send(something) */
    const userInfo:users = req.body;
    try{
        await usersServices.createUser(userInfo)
    } catch ( error ) {

    }
}
