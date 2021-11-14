import { create } from "../DAL/post.dal"
import { PostInput, PostOutput } from "../models/post"

export const createPost = async (payload: PostInput): Promise<PostOutput> => {
    return await create(payload)
}