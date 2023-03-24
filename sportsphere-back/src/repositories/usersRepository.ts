import { db } from "@/config/db";

function findUserByUsername(username: string) {
    return (db.prisma.users.findFirst({
        where: { userName: username }
    }))
};

export const usersRepository = {
    findUserByUsername
};
