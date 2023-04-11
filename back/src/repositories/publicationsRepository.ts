
import { db } from "../config/db";
import { NewPost, NewCommunityPost, CompletePost } from "./protocols";

function createPost(data: NewPost) {
  console.log(data)
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

  const ids = whoUserFollows.map(obj => obj.followedId); //1

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

  const postsIds = concat.map(p => p.id);//2

  const communityPosts = await db.prisma.communitiesPosts.findMany({
    where: { postId: { in: postsIds } }
  });

  const hashtable = {};

  communityPosts.forEach(e => hashtable[e.postId] = true)//3

  const subtracted = concat.filter(p => { 
    if(!hashtable[p.id]){
      return p
    }
  })//4


  const sorted = subtracted.sort((objA: CompletePost, objB: CompletePost) => {

    return objB.id - objA.id
  });//5

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
  return db.prisma.posts.findMany({
    where: {
      communitiesPosts: { some: { communityId } },
    },
    include: {
      users: true,
      _count: {
        select: { likes: true, comments: true }
      }
    }
  })
}

function findPostsByUserCommunities(userCommunities: number[]) {
  return db.prisma.posts.findMany({
    where: {
      communitiesPosts: { some: { communityId: { in: userCommunities } } }

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