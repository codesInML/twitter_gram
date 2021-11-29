import { CommentInput, CommentOutput } from "../models/comment"
import * as ReplyDAL from "../DAL/reply.dal"

export const createReply = async (payload: CommentInput): Promise<CommentOutput> => {
    return ReplyDAL.create(payload)
}