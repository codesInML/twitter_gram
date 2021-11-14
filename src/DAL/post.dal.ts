import db from "../models"
import { PostInput, PostOutput } from "../models/post"

const {Post} = db

export const create = async (payload: PostInput): Promise<PostOutput> => {
    return Post.create(payload)
}