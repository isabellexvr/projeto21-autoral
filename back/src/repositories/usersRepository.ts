import { db } from "../config/db";
import { users } from "@prisma/client";

function findUserByUsername(username: string) {
    return (db.prisma.users.findFirst({
        where: { userName: username }
    }))
};

function findUserByEmail(email: string) {
    return db.prisma.users.findFirst({
        where: { email }
    })
}

function findUserById(id: number) {
    return db.prisma.users.findFirst({where: {id}})
}

function createNewUser(data: users) {
    return db.prisma.users.create({ data });
}

export const usersRepository = {
    findUserByUsername,
    findUserByEmail,
    findUserById,
    createNewUser
};
