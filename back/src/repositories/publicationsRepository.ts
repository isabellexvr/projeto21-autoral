import { db } from "../config/db";
import { NewPost, NewCommunityPost, NewLike, NewComment, CompletePost } from "./protocols";



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


async function findUserTimeline(userId: number) {
  const whoUserFollows = await db.prisma.followers.findMany({
    where: { followerId: userId },
    select: { followedId: true }
  });

  const ids = whoUserFollows.map(obj => obj.followedId);

  const followedUsersPosts = await db.prisma.posts.findMany({
    where: { ownerId: { in: ids } },
    include: {
      users: true,
      _count: {
        select: { likes: true, comments: true }
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

async function postLike(data: NewLike) {
  return db.prisma.likes.create({ data });
}

async function postComment(data: NewComment) {
  return db.prisma.comments.create({ data })
}

async function findCommunitiesTimeline() { }

export const publicationsRepository = {
  createPost,
  setCommunityPost,
  findAll,
  findUserTimeline,
  postLike,
  postComment
}