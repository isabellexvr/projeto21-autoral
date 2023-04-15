import { db } from "../config/db";

function findAll() {
    return db.prisma.categories.findMany({})
}

export const categoriesRepository = {
    findAll
}