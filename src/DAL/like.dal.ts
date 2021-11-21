import { LikeInput, LikeOutput } from "../models/like";
import models from "../models"

const { Post, Comment } = models

export const createPostLike = async (payload: LikeInput): Promise<LikeOutput> => {
    const post = await Post.findOne({ where: { id: payload.postId } })
    return await post.createLike({
        userId: payload.userId,
        postId: payload.postId
    })
}

export const createCommentLike = async (payload: LikeInput) => {
    const comment = await Comment.findOne({ where: { id: payload.commentId } })
    return await comment.createLike({
        userId: payload.userId,
        postId: payload.commentId
    })
}