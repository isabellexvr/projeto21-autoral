import { Response, Request } from "express";
import { users } from "@prisma/client";
import { usersServices } from "../services";
import { signIn } from "../protocols";
const uploadImage = require("../uploadImg")

export async function createUser(req: Request, res: Response) {
    const userInfo: users = req.body;
    try {
        await usersServices.createUser(userInfo);
        return res.status(201).send("User created succesfully")
    } catch (error) {
        console.log(error)
        if (error.name === "UsernameConflictError") return res.status(409).send(error);
        if (error.name === "EmailConflictError") return res.status(409).send(error);
        return res.status(500).send(error)
    }
}

export async function login(req: Request, res: Response) {
    const loginInfo: signIn = req.body;
    console.log(loginInfo)

    try {
        const userInfo = await usersServices.login(loginInfo);
        return res.status(200).send(userInfo);
    } catch (error) {
        console.log(error)
        if (error.name === "UserNotFound") return res.status(404).send(error);
        if (error.name === "InvalidPasswordError") return res.status(401).send(error);
        return res.status(500).send(error)
    }
}

export async function upload(req: Request, res: Response) {
    const img = req.body.image;

    uploadImage(img)
        .then(url => res.send(url))
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}