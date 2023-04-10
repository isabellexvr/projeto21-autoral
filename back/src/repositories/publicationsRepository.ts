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

async function findUsersPosts(userId: number) {
  return db.prisma.posts.findMany({
    where: { ownerId: userId },
    orderBy: { id: "desc" },
    include: {
      users: true,
      _count: {
        select: { likes: true, comments: true }
      }
    }
  });
};

function findPostsByCommunityId(communityId: number) {
  return db.prisma.communities.findMany({ where: { id: communityId } })
}

function findPostsByUserCommunities(userId: number) {
  return db.prisma.posts.findMany({
    where: {
      users: { usersCommunities: { some: { userId } } }

    },
    include: {
      users: true,
      _count: {
        select: { likes: true, comments: true }
      }
    }

  })
}


export const publicationsRepository = {
  createPost,
  setCommunityPost,
  findUserTimeline,
  findUsersPosts,
  findPostsByCommunityId,
  findPostsByUserCommunities
}