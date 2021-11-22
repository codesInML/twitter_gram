import { LikeInput, LikeOutput } from "../models/like";
import models from "../models"

const { Post, Comment } = models

export const createPostLike = async (payload: LikeInput): Promise<LikeOutput | string> => {
    const post = await Post.findOne({ where: { id: payload.postId } })
    // check if the user has previously liked the post
    const hasLiked = await post.getLikes({ where: { userId: payload.userId } })

    if (hasLiked.length == 1) return "you already liked this post"

    return await post.createLike(payload)
}

export const createCommentLike = async (payload: LikeInput) => {
    const comment = await Comment.findOne({ where: { id: payload.commentId } })
    // check if the user has previously liked the comment
    const hasLiked = await comment.getLikes({ where: { userId: payload.userId } })

    if (hasLiked.length == 1) return "you already liked this post"
    
    return await comment.createLike(payload)
}