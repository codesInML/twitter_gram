import { PostInput, PostOutput } from "../models/post"
import { findOne } from "./user.dal"

export const create = async (payload: PostInput): Promise<PostOutput> => {
    const user = await findOne(payload.userId)
    return await user.createPost(payload)
}