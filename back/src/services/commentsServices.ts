import { CommentNotFoundError } from "../errors/commentsErrors";
import { commentsRepository } from "../repositories";
import { NewComment } from "../repositories/protocols";

async function postComment(data: NewComment){
    await commentsRepository.postComment(data);
}

async function checkComment(data: NewComment){
    const comment =  await commentsRepository.findComment(data);
    if(!comment) throw CommentNotFoundError
    return comment.id
}

async function deleteComment(data: NewComment){
    const commentId = await checkComment(data);
    await commentsRepository.deleteComment(commentId);
}

export const commentsServices = {
    postComment,
    deleteComment
}