import {Request, Response} from "express"
import { StatusCodes } from "http-status-codes"
import { BadRequestError } from "../errors"
import uploadFileMiddleware from "../middleware/upload"
import { createPost, getPosts, getUserPosts } from "../services/post.service"

// create the post
export const createPostHandler = async (req: Request, res: Response) => {
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    await uploadFileMiddleware(req, res)
    const {userId} = res.locals.user
    let {caption} = req.body
    let fileName: string

    if (!req.file && !caption) throw new BadRequestError("Please provide an image or caption")

    fileName = !req.file ? "" : req.file.filename
     
    if (!caption) caption = ""
    
    const img_url = directoryPath + fileName

    const post = await createPost({userId, img_url, caption })

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
export const updateUserPostHandler = async (req: Request, res: Response) => {
    return res.status(StatusCodes.CREATED).send(`post updated ${req.params.postId}`)
}

// delete user's post
export const deleteUserPostHandler = async (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).send(`post deleted ${req.params.postId}`)
}