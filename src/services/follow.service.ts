import * as followDAL from "../DAL/follow.dal"
import { BadRequestError } from "../errors"
import { FollowInput } from "../models/follow"
import { UserOutput } from "../models/user"

export const followUser = async (payload: FollowInput) => {
    const {userId, followedId} = payload

    if (userId === followedId) throw new BadRequestError("you can't follow yourself")
    
    await followDAL.create(payload)
}

export const unfollowUser = async (payload: FollowInput) => {
    const {userId, followedId} = payload

    if (userId === followedId) throw new BadRequestError("you can't unfollow yourself")

    await followDAL.remove(payload)
}

export const getAllFollowers = async (userId: string): Promise<UserOutput []> => {
    return followDAL.findAllFollowers(userId)
}

export const getAllFollowing = async (userId: string): Promise<UserOutput []> => {
    return followDAL.findAllFollowing(userId)
}