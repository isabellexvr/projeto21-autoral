import { users } from "@prisma/client";
import { usersRepository } from "../repositories";
import { usernameConflictError, emailConflictError } from "../errors";
import bcrypt from "bcrypt";

async function createUser(userInfo: users) {
    await checkUsername(userInfo.userName);
    await checkEmail(userInfo.email);
    const hashedPassword = encrypt(userInfo.password);
    delete userInfo.password;
    await createUser({ ...userInfo, password: hashedPassword });
};

const checkUsername = async (username: string) => {
    const userExists = await usersRepository.findUserByUsername(username);
    if (userExists) throw usernameConflictError();
};

const checkEmail = async (email: string) => {
    const userExists = await usersRepository.findUserByEmail(email);
    if (userExists) throw emailConflictError();
};

const encrypt = (password: string) => {
    return bcrypt.hashSync(password, 10);
}

export const usersServices = {
    createUser
};
