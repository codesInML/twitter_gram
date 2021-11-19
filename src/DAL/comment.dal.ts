import { CommentInput, CommentOutput } from "../models/comment"
import db from "../models"

const {Post} = db

export const create = async (payload: CommentInput): Promise<CommentOutput> => {
    const post = await Post.findOne({
        where: { id: payload.postId }
    })
    return await post.createComment(payload)
}

export const update = async () => {

}

export const deleteComment = async () => {

}