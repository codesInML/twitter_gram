import { NextFunction } from "express"
import { flatten } from "lodash"
import * as PostDAL from "../DAL/post.dal"
import { PostInput, PostOutput } from "../models/post"

export const createPost = async (payload: PostInput): Promise<PostOutput> => {
    return await PostDAL.create(payload)
}

export const getUserPosts = async (userId: string): Promise<PostOutput []> => {
    return await PostDAL.findAllUserPosts(userId)
}

export const getPosts = async (userId: string) => {
    const data = await PostDAL.findAllPosts(userId)
    const posts = flatten(data.map((item: any) => item.toJSON().Posts.map((post: any) => post.toJSON())))
    return posts
}

export const getPost = async (postId: number): Promise<PostOutput> => {
    return await PostDAL.findPost(postId)
}

export const updatePost = async (postId: number, {img_url, caption}: {img_url?: string, caption?: string}): Promise<PostOutput> => {
    const payload = {img_url, caption}
    return await PostDAL.update(postId, payload)
}

export const deletePost = async (postId: number, userId: string, next: NextFunction) => {
    await PostDAL.deletepost(postId, userId, next)
}