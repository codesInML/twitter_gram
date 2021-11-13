import * as UserDAL from '../DAL/user.dal'
import { UserInput, UserOutput } from '../models/user';

export async function createUser (payload: UserInput): Promise<UserOutput> {
    return await UserDAL.create(payload)
}

export async function validatePassword({email, password}: {
    email: string
    password: string
}): Promise<UserOutput | false> {
    const user = await UserDAL.findOne(email)

    if (!user) return false

    const isValid = await user.validatePassword(password)

    if (!isValid) return false

    return user
}