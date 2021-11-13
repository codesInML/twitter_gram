import { UserInput, UserOutput } from "../models/user";
import db from '../models'

const {User} = db

export const create =  async (input: UserInput): Promise<UserOutput> => {
    return await User.create(input)
}

export const findOne = async (input: string): Promise<UserOutput> => {
    const userByEmail = await User.findOne({ where: { email: input } })
    const userById = await User.findOne({ where: { userId: input } })
    return (userByEmail !== null) ? userByEmail : userById
}