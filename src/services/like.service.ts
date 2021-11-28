import { LikeInput, LikeOutput } from "../models/love";
import * as LikeDAL from "../DAL/like.dal"

export const likeToggle = async (payload: LikeInput): Promise<[LikeOutput, string]> => {
    return (payload.postId)? await LikeDAL.togglePostLike(payload) : await LikeDAL.toggleCommentLike(payload)
}
