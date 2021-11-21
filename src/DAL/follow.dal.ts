import { BadRequestError } from "../errors"
import { FollowInput } from "../models/follow"
import { UserOutput } from "../models/user"
import { findOne } from "./user.dal"
import models from "../models"

const {Follow} = models

export const create = async (payload: FollowInput) => {
    const followed = await findOne(payload.followedId)

    if (!followed) throw new BadRequestError(`no user with the id ${payload.followedId}`)

    const user = await findOne(payload.userId)

    if (await followed.hasFollowed(user)) throw new BadRequestError("you have already followed user")

    await followed.addFollowed(user)
}

export const remove = async (payload: FollowInput) => {
    const followed = await findOne(payload.followedId)

    if (!followed) throw new BadRequestError(`no user with the id ${payload.followedId}`)

    const user = await findOne(payload.userId)

    if (!(await followed.hasFollowed(user))) throw new BadRequestError("you do not follow user")

    await followed.removeFollowed(user)
}

export const findAllFollowers = async (userId: string): Promise<UserOutput []> => {
    const user = await findOne(userId)

    return await user.getFollowed({
        attributes: ["userId", "firstName", "lastName"],
        joinTableAttributes: []
    })
}

export const findAllFollowing = async (userId: string): Promise<UserOutput []> => {
    const user = await findOne(userId)

    return await user.getUser({
        attributes: ["userId", "firstName", "lastName"],
        joinTableAttributes: []
    })
}