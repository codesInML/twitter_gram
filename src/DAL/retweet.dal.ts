import { PostOutput } from "../models/post";
import db from '../models'

const {Post} = db

export const findById = async (postId: number) => {
    return await Post.findOne({ where: { id: postId } })
}

export const findRetweet = async (userId: string, postId: number): Promise<PostOutput> => {
    return await Post.findOne({ where: { userId, retweetedId: postId}})
}

export const create = async (userId: string, postId: number, post: any, fileName?: string): Promise<PostOutput> => {
    
    const retweet: PostOutput = await Post.create({
        userId,
        img_url: fileName ? fileName : null,
        caption: post.dataValues.caption,
        isARetweet: true,
        retweetedId: postId
    })

    // increase the number of retweets
    await post.update({ numberOfRetweets: post.dataValues.numberOfRetweets + 1 })
    return retweet
}