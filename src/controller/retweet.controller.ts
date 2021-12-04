import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors'
import { createRetweet } from '../services/retweet.service'

export const createRetweetHandler = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId as any as number
    const {userId} = res.locals.user

    if(!postId) throw new BadRequestError("no post id was given")

    const retweet = await createRetweet(userId, postId, next)
    return res.status(StatusCodes.OK).json({status: "success", msg: "retweeted", retweet})
}