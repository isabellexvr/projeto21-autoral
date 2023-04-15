import { CommentNotFoundError } from "../errors/commentsErrors";
import { commentsRepository } from "../repositories";
import { NewComment } from "../repositories/protocols";
import { publicationsServices } from "./publicationsServices";

async function postComment(data: NewComment) {
    await commentsRepository.postComment(data);
}

async function checkComment(data: NewComment) {
    const comment = await commentsRepository.findComment(data);
    if (!comment) throw CommentNotFoundError
    return comment.id
}

async function deleteComment(data: NewComment) {
    const commentId = await checkComment(data);
    await commentsRepository.deleteComment(commentId);
}

async function editComment(data: NewComment) {
    const commentId = await checkComment(data);
    await commentsRepository.editComment(commentId, data.comment);
}

async function findCommentsByPostId(postId: number){
    await publicationsServices.checkPostExistence(postId);
    const comments = await commentsRepository.findCommentsByPostId(postId);
    return comments;
}

export const commentsServices = {
    postComment,
    deleteComment, editComment, findCommentsByPostId
}