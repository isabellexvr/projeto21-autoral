import { db } from "../config/db";
import { posts, users } from "@prisma/client";
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
      users: true,
      _count: {
        select: { likes: true, comments: true }
      }
    }
  })
}

type CompletePost = (posts & {
  users: users;
  _count: {
      comments: number;
      likes: number;
  };
})

/* async function findUserTimeline(userId: number) {

  const followedPosts = await db.prisma.followers.findMany({
    where: { followedId: userId },
  });
  const usersPosts = await db.prisma.posts.findMany({
    where: { ownerId: userId },
    include: {
      users: true,
      _count: {
        select: { likes: true, comments: true }
      }
    }
  });

  if (followedPosts.length == 0 && usersPosts.length == 0) {
    return []
  }


  const concat = [...followedPosts, ...usersPosts];
  console.log(concat)

  const sorted = concat.sort((objA: CompletePost, objB: CompletePost) => {
    const dateA = new Date(objA.createdAt);
    const dateB = new Date(objB.createdAt);
    return dateA.getTime() - dateB.getTime();
  })

  return sorted
} */

async function findUserTimeline(userId: number) {
  const whoUserFollows = await db.prisma.followers.findMany({
    where: { followerId: userId },
    select: { followedId: true }
  });

  const ids = whoUserFollows.map( obj => obj.followedId);

  const followedUsersPosts = await db.prisma.posts.findMany({
    where: {ownerId: {in: ids}},
    include: {
      users: true,
      _count: {
        select: {likes: true, comments: true}
      }
    }
  });

  const usersPosts = await db.prisma.posts.findMany({
    where: { ownerId: userId },
    include: {
      users: true,
      _count: {
        select: { likes: true, comments: true }
      }
    }
  });

  const concat = [...followedUsersPosts, ...usersPosts];

  const sorted = concat.sort((objA: CompletePost, objB: CompletePost) => {

    return objB.id - objA.id
  });

  return sorted;

}

export const publicationsRepository = {
  createPost,
  setCommunityPost,
  findAll,
  findUserTimeline
}