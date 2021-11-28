import { LikeInput, LikeOutput } from "../models/love";
import models from "../models"

const { Post, Comment, Love } = models

export const togglePostLike = async (payload: LikeInput): Promise<[LikeOutput, string]> => {
    const post = await Post.findOne({ where: { id: payload.postId } })
    // check if the user has previously liked the post
    const liked = await Love.findOne({ where: { userId: payload.userId, commentId: null } })

    const hasLiked = await post.hasPostLikes(liked)

    if (hasLiked) return [await liked.destroy(), "like removed"]

    return [await post.createPostLike(payload), "like added"]
}

export const toggleCommentLike = async (payload: LikeInput): Promise<[LikeOutput, string]> => {
    const comment = await Comment.findOne({ where: { id: payload.commentId } })
    // check if the user has previously liked the comment
    const liked = await Love.findOne({ where: { userId: payload.userId, postId: null } })

    const hasLiked = await comment.hasCommentLikes(liked)

    if (hasLiked) return [await liked.destroy(), "like removed"]
    
    return [await comment.createCommentLike(payload), "like added"]
}