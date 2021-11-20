import { CommentInput, CommentOutput } from "../models/comment"
import db from "../models"

const {Post, Comment} = db

export const create = async (payload: CommentInput): Promise<CommentOutput> => {
    const post = await Post.findOne({
        where: { id: payload.postId }
    })
    return await post.createComment(payload)
}

export const find = async (commentId: number): Promise<CommentOutput> => {
    return await Comment.findOne({ where: { id: commentId } })
}

export const update = async ({
    text,
    img_url,
    commentId
}: {
    text?: string
    img_url?: string
    commentId?: number
}) => {
    const comment = await Comment.findOne({ where: { id: commentId } })
    return await comment.update({text, img_url})
}

export const deleteComment = async () => {

}