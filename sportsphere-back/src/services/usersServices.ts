import { users } from "@prisma/client";
import { usersRepository } from "../repositories";
import { usernameConflictError, emailConflictError } from "../errors";
import bcrypt from "bcrypt";

async function createUser(userInfo: users) {

    await checkUsername(userInfo.userName);

    await checkEmail(userInfo.email);

    const hashedPassword = bcrypt.hashSync(userInfo.password, 10);

    delete userInfo.password;

    await usersRepository.createNewUser({ ...userInfo, password: hashedPassword });
};

async function checkUsername(username: string) {
    const userExists = await usersRepository.findUserByUsername(username);

    if (userExists) throw usernameConflictError();
};

async function checkEmail(email: string) {
    const userExists = await usersRepository.findUserByEmail(email);

    if (userExists) throw emailConflictError();
};

export const usersServices = {
    createUser
};
