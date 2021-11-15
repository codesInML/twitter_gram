import {Request, Response} from 'express'
import { StatusCodes } from 'http-status-codes'
import { followUser } from '../services/follow.service'

export const followUserHandler = async (req: Request, res: Response) => {
    const {followedId} = req.body
    const {userId} = res.locals.user

    await followUser({userId, followedId})
    
    res.status(StatusCodes.CREATED).json({status: "success", msg: "followed user"})
}