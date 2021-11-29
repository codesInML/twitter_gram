import {NextFunction, Request, Response} from 'express'
import { StatusCodes } from 'http-status-codes'
import { ForbiddenError } from '../errors'
import { createComment, deleteComment, getComment, updateComment } from '../services/comment.service'
import { deleteImage } from '../utils/delete-image-utils'
import { postUpload } from '../utils/image-upload-utils'

export const addCommentHandler = async (req: Request, res: Response) => {
    const payload = await postUpload(req, res)
    
    const {userId} = res.locals.user

    const comment = await createComment({ userId, ...payload })

    return res.status(StatusCodes.CREATED).json({status: "success", msg: "comment added", comment})
}

export const editCommentHandler = async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = res.locals.user
    const commentId = req.params.commentId as any as number

    const post = await getComment(commentId)

    // check if the user own the post
    if (post.userId !== userId) throw new ForbiddenError("You cannot edit this comment")

    const payload = await postUpload(req, res)
    
    // check if image was given and the post was not initially empty
    if (payload.img_url && post.img_url !== null) {
        // if image was given and post previouly had an image, then delete the image
        deleteImage(post.img_url, next)
    }

    const comment = await updateComment({ userId, ...payload })

    return res.status(StatusCodes.CREATED).json({status: "success", msg: "comment edited", comment})
}

export const deleteCommentHandler = async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = res.locals.user
    const {commentId} = req.params

    await deleteComment(commentId as any as number, userId, next)

    return res.status(StatusCodes.OK).json({status: "success", msg: "comment deleted"})
}