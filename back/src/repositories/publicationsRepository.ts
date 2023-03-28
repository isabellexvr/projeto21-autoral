import { db } from "config/db";

//pra postar => modal: tipos de conteúdo possíveis pra postar, comunidades do usuário => communityId pode ser nulo!

export function findAllContentTypes() {
    return db.prisma.postsContentTypes.findMany();
}

