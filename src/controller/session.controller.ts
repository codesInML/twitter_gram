import { Request, Response } from 'express'
import UnauthenticatedError from '../errors/unauthenticated'
import { createSession, findSessions } from '../services/session.service'
import { validatePassword } from '../services/user.service'
import { signJWT } from '../utils/jwt-utils'

export const createSessionHandler = async (req: Request, res: Response) => {
    // validate user password
    const user = await validatePassword(req.body)

    // check if user was returned
    if (!user) throw new UnauthenticatedError("Invalid email or password")

    // create the session
    const session = await createSession(user.userId, req.get('user-agent') || "")

    // create an access token
    const accessToken = signJWT(
        { ...user, session: session.userId },
        {expiresIn: process.env.ACCESS_TOKEN_TTL as string}) // 5 minutes

    // create an access token
    const refreshToken = signJWT(
        { ...user, session: session.userId },
        {expiresIn: process.env.REFRESH_TOKEN_TTL as string}) // 1 year

    return res.status(200).json({accessToken, refreshToken})
}

export const getUserSessionHandler = async (req: Request, res: Response) => {
    const {session} = res.locals.user

    const sessions = await findSessions({userId: session, valid: true})

    return res.status(200).json({msg: "success", sessions})
}