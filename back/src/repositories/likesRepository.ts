import { db } from "../config/db";
import { NewLike } from "./protocols";

async function postLike(data: NewLike) {
    return db.prisma.likes.create({ data });
}

async function findLike(data: NewLike) {
    return db.prisma.likes.findFirst({ where: data })
}
async function dislike(likeId: number) {
    return db.prisma.likes.delete({
        where: { id: likeId }
    })
}

export const likesRepository = {
    postLike, dislike, findLike
}