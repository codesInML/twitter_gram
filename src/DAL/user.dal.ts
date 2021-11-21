import { UserInput, UserOutput } from "../models/user";
import models from '../models'

const {User} = models

export const create =  async (input: UserInput): Promise<UserOutput> => {
    return await User.create(input)
}

export const findOne = async (input: string): Promise<UserOutput> => {
    return (input.includes("@")) ? await User.findOne({ where: { email: input } }) : await User.findOne({ where: { userId: input } })
}