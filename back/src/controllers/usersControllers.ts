import { Response, Request } from "express";
import { usersServices } from "../services";
import { signIn } from "../protocols";
import { NewUserPayload } from "../protocols";
const uploadImage = require("../uploadImg")

export async function createUser(req: Request, res: Response) {
    const payload: NewUserPayload = req.body;
    try {
        await usersServices.createUser(payload);
        return res.status(201).send("User created succesfully")
    } catch (error) {
        if (error.name === "UsernameConflictError") return res.status(409).send(error);
        if (error.name === "EmailConflictError") return res.status(409).send(error);
        console.error(error)
        return res.status(500).send(error)
    }
}

export async function login(req: Request, res: Response) {
    const loginInfo: signIn = req.body;

    try {
        const userInfo = await usersServices.login(loginInfo);
        return res.status(200).send(userInfo);
    } catch (error) {
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

export async function findInfo(req: Request, res: Response) {
    const userName = req.params.userName
    try {
        const userInfo = await usersServices.findInfoByUsername(userName);
        res.send(userInfo).status(200)
    } catch (error) {
        return res.send(error).status(500)
    }
}