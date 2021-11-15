import {Request, Response} from 'express'
import { StatusCodes } from 'http-status-codes'
import { followUser, unfollowUser } from '../services/follow.service'

export const followUserHandler = async (req: Request, res: Response) => {
    const {followedId} = req.body
    const {userId} = res.locals.user

    await followUser({userId, followedId})
    
    res.status(StatusCodes.CREATED).json({status: "success", msg: "followed user"})
}

export const unFollowUserHandler = async (req: Request, res: Response) => {
    const {followedId} = req.body
    const {userId} = res.locals.user

    await unfollowUser({userId, followedId})

    res.status(StatusCodes.OK).json({status: "success", msg: "unfollowed user"})
}