import {Request, Response} from 'express'
import { StatusCodes } from 'http-status-codes'
import { followUser, getAllFollowers, unfollowUser } from '../services/follow.service'

// follow someone
export const followUserHandler = async (req: Request, res: Response) => {
    const {followedId} = req.body
    const {userId} = res.locals.user

    await followUser({userId, followedId})
    
    return res.status(StatusCodes.CREATED).json({status: "success", msg: "followed user"})
}

// unfollow someone
export const unFollowUserHandler = async (req: Request, res: Response) => {
    const {followedId} = req.body
    const {userId} = res.locals.user

    await unfollowUser({userId, followedId})

    return res.status(StatusCodes.OK).json({status: "success", msg: "unfollowed user"})
}

// get all user's followers
export const getAllFollowersHandler = async (req: Request, res: Response) => {
    const {userId} = res.locals.user

    const followers = await getAllFollowers(userId)

    return res.status(StatusCodes.OK).json({status: "success", followers})
}