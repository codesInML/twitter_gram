import { flatten } from "lodash"
import * as PostDAL from "../DAL/post.dal"
import { PostInput, PostOutput } from "../models/post"

export const createPost = async (payload: PostInput): Promise<PostOutput> => {
    return await PostDAL.create(payload)
}

export const getUserPosts = async (userId: string): Promise<PostOutput []> => {
    return await PostDAL.findAllUserPosts(userId)
}

export const getPosts = async (userId: string): Promise<PostOutput []> => {
    const data = await PostDAL.findAllPosts(userId)
    const posts = flatten(data.map((item: any) => item.toJSON().Posts.map((post: any) => post.toJSON())))
    return posts
}