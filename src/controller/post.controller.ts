import {NextFunction, Request, Response} from "express"
import { StatusCodes } from "http-status-codes"
import { ForbiddenError } from "../errors"
import { postUpload } from "../utils/image-upload-utils"
import { createPost, deletePost, getPost, getPosts, getUserPosts, updatePost } from "../services/post.service"
import { deleteImage } from "../utils/delete-image-utils"

// create the post
export const createPostHandler = async (req: Request, res: Response) => {
    const payload = await postUpload(req, res)
    
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
    const postId = req.params.postId as unknown as number
    
    const post = await getPost(postId)

    const payload = await postUpload(req, res)
    
    const {userId} = res.locals.user

    // check if the user own the post
    if (post.userId !== userId) throw new ForbiddenError("You cannot delete this post")

    // check if image was given and the post was not initially empty
    if (payload.img_url && post.img_url !== null) {
        // if image was given and post previouly had an image, then delete the image
        deleteImage(post, next)
    }

    const updatedPost = await updatePost(postId, payload)

    return res.status(StatusCodes.CREATED).json({status: "success", post: updatedPost})
}

// delete user's post
export const deleteUserPostHandler = async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = res.locals.user
    const {postId} = req.params

    await deletePost(postId as any as number, userId, next)
    
    return res.status(StatusCodes.OK).json({status: "success", msg: "post has been deleted"})
}