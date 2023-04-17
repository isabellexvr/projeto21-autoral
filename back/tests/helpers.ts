import { db } from "../src/config/db";

export async function cleanDb() {
    await db.prisma.likes.deleteMany({});
    await db.prisma.comments.deleteMany({});
    await db.prisma.communitiesPosts.deleteMany({});
    await db.prisma.posts.deleteMany({});
    await db.prisma.usersCommunities.deleteMany({});
    await db.prisma.communities.deleteMany({});
    await db.prisma.followers.deleteMany({});
    await db.prisma.users.deleteMany({});
    const users = await db.prisma.users.findMany({});
    if (!users) db.prisma.addresses.deleteMany({})
}

export async function cleanUsers() {
    await db.prisma.users.deleteMany({});
}

export async function disconnectDb() {
    await db.prisma.$disconnect();
    process.exit(1);
}