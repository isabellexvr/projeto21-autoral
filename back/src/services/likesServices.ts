import { AlreadyLikedError } from "errors/likesErrors";
import { likesRepository } from "../repositories";
import { NewLike } from "../repositories/protocols";

async function postLike(data: NewLike) {

    await checkLike(data);

    await likesRepository.postLike(data);
}

async function deleteLike(data: NewLike) {
    const likeId = await checkLike(data);
    await likesRepository.dislike(likeId);
}

async function checkLike(data: NewLike) {
    const like = await likesRepository.findLike(data);
    if (!like) throw AlreadyLikedError();
    return like.id
}

export const likesServices = {
    postLike,
    deleteLike
}