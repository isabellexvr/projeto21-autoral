import { db } from "../config/db";
import { users } from "@prisma/client";



function findUserByUsername(username: string) {
    return (db.prisma.users.findFirst({
        where: { userName: username },
        include: { followers_followers_followedIdTousers: { include: { users_followers_followerIdTousers: true } } }
    }));
};

function findUserByEmail(email: string) {
    return db.prisma.users.findFirst({
        where: { email }
    })
}

function findUserById(id: number) {
    return db.prisma.users.findFirst({ where: { id } })
}

type NewUserEntity = {
    fullName: string;
    userName: string;
    picture: string | null;
    cover: string | null;
    addressId: number;
    email: string;
    password: string;
}

function createNewUser(data: NewUserEntity) {
    return db.prisma.users.create({ data });
}

export const usersRepository = {
    findUserByUsername,
    findUserByEmail,
    findUserById,
    createNewUser
};
