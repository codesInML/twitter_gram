import { LikeInput, LikeOutput } from "../models/love";
import models from "../models"

const { Post, Comment } = models

export const createPostLike = async (payload: LikeInput): Promise<LikeOutput | string> => {
    const post = await Post.findOne({ where: { id: payload.postId } })
    // check if the user has previously liked the post
    const hasLiked = await post.getPostLikes({ where: { userId: payload.userId } })

    if (hasLiked.length == 1) return "you already liked this post"

    return await post.createPostLike(payload)
}

export const createCommentLike = async (payload: LikeInput) => {
    const comment = await Comment.findOne({ where: { id: payload.commentId } })
    // check if the user has previously liked the comment
    const hasLiked = await comment.getCommentLikes({ where: { userId: payload.userId } })

    if (hasLiked.length == 1) return "you already liked this post"
    
    return await comment.createCommentLike(payload)
}