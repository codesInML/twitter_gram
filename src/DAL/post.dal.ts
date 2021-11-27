import { PostInput, PostOutput } from "../models/post"
import { findOne } from "./user.dal"
import models from "../models"
import { BadRequestError, ForbiddenError } from "../errors"
import { deleteImage } from "../utils/delete-image-utils"
import { NextFunction } from "express"

const {Post, Comment, Love} = models

export const create = async (payload: PostInput): Promise<PostOutput> => {
    const user = await findOne(payload.userId)
    return await user.createPost(payload)
}

export const findAllUserPosts = async (userId: string): Promise<PostOutput []> => {
    const user = await findOne(userId)
    return await user.getPosts()
}

export const findAllPosts = async (userId: string) => {
    const follower = await findOne(userId)
    
    return await follower.getUser({
        attributes: [],
        joinTableAttributes: [],
        include: [{
            model: Post,
            include: [
            {
                model: Love,
                as: "PostLikes",
                attributes: ['userId']
            },
            { 
                model: Comment,
                include: [{
                    model: Love,
                    as: "CommentLikes",
                    attributes: ['userId']
                }]
            },
            ],
        }]
    })
}

export const findPost = async (postId: number): Promise<PostOutput> => {
    const post = await Post.findOne({ where: {id: postId} })

    if (!post) throw new BadRequestError(`no post with the id ${postId}`)

    return post.toJSON()
}

export const update = async (postId: number, payload: object): Promise<PostOutput> => {
    const post = await Post.findOne({ where: { id: postId } })
    return await post.update(payload)
}

export const deletepost = async (postId: number, userId: string, next: NextFunction) => {
    const post = await Post.findOne({ where: { id: postId } })

    // check if the user own the post
    if (post.userId !== userId) throw new ForbiddenError("You cannot delete this post")

    // delete the image
    if (post.img_url !== null) deleteImage(post.img_url, next)

    await post.destroy()
}