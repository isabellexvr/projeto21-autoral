import { users } from "@prisma/client";
import { usersRepository } from "../repositories";
import { usernameConflictError, emailConflictError, userNotFoundError, invalidPasswordError } from "../errors";
import bcrypt from "bcrypt";
import { signIn } from "../protocols";
import jwt from "jsonwebtoken";
import { addressesServices } from "./addressesServices";
import { NewUserPayload } from "../protocols";


async function createUser(payload: NewUserPayload) {
    await checkUsername(payload.userInfo.userName);

    await checkEmail(payload.userInfo.email);

    const hashedPassword = bcrypt.hashSync(payload.userInfo.password, 10);

    delete payload.userInfo.password;

    const addressId = await addressesServices.findOrCreateAddress(payload.locationInfo);

    await usersRepository.createNewUser({ ...payload.userInfo, password: hashedPassword, addressId });
};

async function checkUsername(username: string) {
    const userExists = await usersRepository.findUserByUsername(username);

    if (userExists?.userName === username) throw usernameConflictError();

};

async function checkEmail(email: string) {
    const userExists = await usersRepository.findUserByEmail(email);

    if (userExists) throw emailConflictError();
};

async function login(userInfo: signIn) {
    let user: users;

    if (userInfo.email) {
        user = await findUserByEmailOrFail(userInfo.email)
    } else {
        user = await findUserByUsernameOrFail(userInfo.username)
    }

    validatePasswordOrFail(userInfo.password, user.password);

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: 10800 });

    delete user.password;
    delete userInfo.password;

    return {
        ...user, token
    }
}

const findUserByEmailOrFail = async (email: string) => {
    const user = await usersRepository.findUserByEmail(email)
    if (!user) throw userNotFoundError("e-mail")
    return user
}

const findUserByUsernameOrFail = async (username: string) => {
    const user = await usersRepository.findUserByUsername(username);
    if (!user) throw userNotFoundError("username");
    return user
}

const validatePasswordOrFail = (enteredPassword: string, userPassword: string) => {
    const isValid = bcrypt.compareSync(enteredPassword, userPassword);
    if (!isValid) throw invalidPasswordError();
}

async function findInfoByUsername(userName: string) {
    const userInfo = await usersRepository.findUserByUsername(userName);
    delete userInfo.password;
    return userInfo;
}

export const usersServices = {
    createUser, login, findInfoByUsername
};
