import { CommentInput } from "../models/comment";
import * as CommentDAL from "../DAL/comment.dal"


export const createComment = async (payload: CommentInput) => {
    return CommentDAL.create(payload)
}