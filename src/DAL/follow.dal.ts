import { BadRequestError } from "../errors"
import { FollowInput } from "../models/follow"
import { findOne } from "./user.dal"

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