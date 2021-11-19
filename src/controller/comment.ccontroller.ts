import {Request, Response} from 'express'
import { StatusCodes } from 'http-status-codes'
import { createComment } from '../services/comment.service'
import { postUpload } from '../utils/image-upload-utils'

export const addCommentHandler = async (req: Request, res: Response) => {
    const payload = await postUpload(req, res)
    
    const {userId} = res.locals.user

    const comment = await createComment({ userId, ...payload })

    return res.status(StatusCodes.CREATED).json({status: "success", msg: "comment added", comment})
}

export const editCommentHandler = async (req: Request, res: Response) => {
    return res.status(StatusCodes.CREATED).json({status: "success", msg: "comment edited"})
}

export const deleteCommentHandler = async (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).json({status: "success", msg: "comment deleted"})
}