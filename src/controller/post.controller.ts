import {NextFunction, Request, Response} from "express"
import { unlink } from "fs"
import { StatusCodes } from "http-status-codes"
import { BadRequestError, ForbiddenError } from "../errors"
import { postUpload } from "../utils/image-upload-utils"
import { createPost, getPost, getPosts, getUserPosts, updatePost } from "../services/post.service"

// create the post
export const createPostHandler = async (req: Request, res: Response) => {
    const payload = await postUpload(req, res)

    if (!payload.img_url) payload.img_url = ""

    if (!payload.caption) payload.caption = ""

    console.log(payload)
    
    const {userId} = res.locals.user

    const post = await createPost({userId, ...payload })

    return res.status(StatusCodes.OK).json({status: "success", msg: "updloaded post", post})
}

// get all post the user has created
export const getAllUserPostHandler = async (req: Request, res: Response) => {
    const {userId} = res.locals.user
    const posts = await getUserPosts(userId)
    return res.status(StatusCodes.OK).json({status: "success", posts})
}

// get both the user's post and post of those the user follows
export const getAllPostHandler = async (req: Request, res: Response) => {
    const {userId} = res.locals.user
    const posts = await getPosts(userId)
    return res.status(StatusCodes.OK).json({status: "success", posts})
}

// update user's post
export const updateUserPostHandler = async (req: Request, res: Response, next: NextFunction) => {
    const payload = await postUpload(req, res)
    
    const {userId} = res.locals.user

    const postId = req.params.postId as unknown as number

    const post = await getPost(postId)

    if (!post) throw new BadRequestError("post does not exist")

    // check if the user own the post
    if (post.userId !== userId) throw new ForbiddenError("You cannot delete this post")

    console.log(payload.img_url)
    if (payload.img_url && post.img_url !== "") {
        unlink(post.img_url, (err) => {
            if (err) next(err)
        })
    }

    const updatedPost = await updatePost(postId, payload)

    return res.status(StatusCodes.CREATED).json({status: "success", post: updatedPost})
}

// delete user's post
export const deleteUserPostHandler = async (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).send(`post deleted ${req.params.postId}`)
}