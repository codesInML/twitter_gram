import { CommentInput, CommentOutput } from "../models/comment";
import * as CommentDAL from "../DAL/comment.dal"


export const createComment = async (payload: CommentInput): Promise<CommentOutput> => {
    return CommentDAL.create(payload)
}

export const updateComment = async (payload: CommentInput) => {
    return CommentDAL.update(payload)
}

export const getComment = async (commentId: number) => {
    return await CommentDAL.find(commentId)
}