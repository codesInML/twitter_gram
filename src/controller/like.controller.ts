import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors'
import { like } from '../services/like.service'

export const likeHandler = async (req: Request, res: Response) => {
    const {userId} = res.locals.user
    const postId = req.query.postId as any as number
    const commentId = req.query.commentId as any as number

    if (!postId && !commentId) throw new BadRequestError("no id given")

    if (postId && commentId) throw new BadRequestError("either post or comment id must be provided, not both")

    const liked = await like({userId, postId, commentId})
    
    return res.status(StatusCodes.CREATED).json({status: "success", msg: "like added", liked})
}

export const unlikeHandler = async (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).json({status: "success", msg: "like removed"})
}