import { PostInput, PostOutput } from "../models/post"
import { findOne } from "./user.dal"
import db from "../models"

const {Post} = db

export const create = async (payload: PostInput): Promise<PostOutput> => {
    const user = await findOne(payload.userId)
    return await user.createPost(payload)
}

export const findAllUserPosts = async (userId: string): Promise<PostOutput []> => {
    const user = await findOne(userId)
    return await user.getPosts()
}

export const findAllPosts = async (userId: string) => {
    const user = await findOne(userId)
    
    return await user.getUser({
        attributes: [],
        joinTableAttributes: [],
        include: [{
            model: Post,
            // through: {
            //     attributes: []
            // }
        }]
    })
}