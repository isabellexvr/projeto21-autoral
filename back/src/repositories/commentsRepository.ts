import { db } from "../config/db";
import { NewComment } from "./protocols";

function findComment(data: NewComment) {
    return db.prisma.comments.findFirst({ where: data })
}

function editComment(commentId: number, comment: string) {
    return db.prisma.comments.update({
        where: { id: commentId },
        data: {
            comment
        }
    })
}

function postComment(data: NewComment) {
    return db.prisma.comments.create({ data })
}

function deleteComment(commentId: number) {
    return db.prisma.comments.delete({ where: { id: commentId } })
}

function findCommentsByPostId(postId: number) {
    return db.prisma.comments.findMany({ where: { postId }, include: { users: true }, orderBy: {id: "desc"} });
}

export const commentsRepository = {
    editComment,
    postComment,
    deleteComment,
    findComment,
    findCommentsByPostId
}