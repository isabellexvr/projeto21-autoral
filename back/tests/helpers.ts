import { db } from "../src/config/db";

export async function cleanDb() {
    await db.prisma.likes.deleteMany({});
    await db.prisma.comments.deleteMany({});
    await db.prisma.communitiesPosts.deleteMany({});
    await db.prisma.posts.deleteMany({});
    await db.prisma.usersCommunities.deleteMany({});
    await db.prisma.communities.deleteMany({});
    await db.prisma.users.deleteMany({});
    await db.prisma.categories.deleteMany({});
}