import * as PostDAL from "../DAL/post.dal"
import { PostInput, PostOutput } from "../models/post"

export const createPost = async (payload: PostInput): Promise<PostOutput> => {
    return await PostDAL.create(payload)
}