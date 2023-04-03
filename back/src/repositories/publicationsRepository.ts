import { db } from "../config/db";
import { posts } from "@prisma/client";
import { communitiesPosts } from "@prisma/client";

type NewPost = {
  ownerId: number,
  description: string,
  media?: string
}

type NewCommunityPost = {
  postId: number, communityId: number
}

function createPost(data: NewPost) {
  return db.prisma.posts.create({
    data
  })
}

function setCommunityPost(data: NewCommunityPost) {
  return db.prisma.communitiesPosts.create({ data });
}

function findAll() {
  return db.prisma.posts.findMany({
    orderBy: { id: 'desc' },
    include: {
      _count: {
        select: { likes: true, comments: true }
      }
    }
  });
}

/* const results = await db.prisma.user.findUnique({
    where: { id: userId },
    select: {
      followers: {
        where: { followedId: userId }
      },
      posts: {
        where: { ownerId: userId }
      }
    }
  }); */

type CompletePost = {
  id: number;
  ownerId: number;
  description: string;
  media: string | null;
  createdAt: Date;
}

async function findUserTimeline(userId: number) {

  const followedPosts = await db.prisma.followers.findMany({ where: { followedId: userId } });
  const usersPosts = await db.prisma.posts.findMany({ where: { ownerId: userId } });

  if (followedPosts.length == 0 && usersPosts.length == 0) {
    return []
  }

  const concat = [...followedPosts, ...usersPosts];

  const sorted = concat.sort((objA: CompletePost, objB: CompletePost) => {
    const dateA = new Date(objA.createdAt);
    const dateB = new Date(objB.createdAt);
    return dateA.getTime() - dateB.getTime();
  })

  return sorted
}

export const publicationsRepository = {
  createPost,
  setCommunityPost,
  findAll,
  findUserTimeline
}