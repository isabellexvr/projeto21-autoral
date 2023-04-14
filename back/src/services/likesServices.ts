import { AlreadyLikedError, LikeNotFoundError } from "../errors/likesErrors";
import { likesRepository } from "../repositories";
import { NewLike } from "../repositories/protocols";

async function postLike(data: NewLike) {

    await checkLike(data, true);

    await likesRepository.postLike(data);
}

async function deleteLike(data: NewLike) {
    console.log(data)
    const likeId = await checkLike(data, false);
    await likesRepository.dislike(likeId);
}

async function checkLike(data: NewLike, post: boolean) {

    const like = await likesRepository.findLike(data);

    if(post && like) throw AlreadyLikedError()
    
    if(post && !like) return

    if(!post && !like) throw LikeNotFoundError()

    return like.id
}

async function findAllLikes(postId: number){
    const likes = await likesRepository.findAll(postId)
    return likes
}

export const likesServices = {
    postLike,
    deleteLike,
    findAllLikes
}