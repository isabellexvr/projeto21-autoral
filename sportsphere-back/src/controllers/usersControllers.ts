import { db } from "../config/db";
import { Response, Request } from "express";

export async function testController(req: Request,res: Response) {
    const something = db.prisma.users.findFirst();
    res.send(something)
}
