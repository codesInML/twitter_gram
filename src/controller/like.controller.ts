import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors'
import { likeToggle } from '../services/like.service'

// like and unlike a post
export const likeToggleHandler = async (req: Request, res: Response) => {
    const {userId} = res.locals.user
    const postId = req.query.postId as any as number
    const commentId = req.query.commentId as any as number

    if (!postId && !commentId) throw new BadRequestError("no id given")

    if (postId && commentId) throw new BadRequestError("either post or comment id must be provided, not both")

    const [_, msg] = await likeToggle({userId, postId, commentId})
    
    return res.status(StatusCodes.CREATED).json({status: "success", msg})
}
