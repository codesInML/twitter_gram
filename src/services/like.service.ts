import { LikeInput, LikeOutput } from "../models/like";
import * as LikeDAL from "../DAL/like.dal"

export const like = async (payload: LikeInput): Promise<LikeOutput | string> => {
    return (payload.postId)? await LikeDAL.createPostLike(payload) : await LikeDAL.createCommentLike(payload)
}

export const unlike = async (payload: LikeInput) => {

}