import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt-utils";
import { reIssueAccessToken } from "../services/session.service";
import { ForbiddenError } from "../errors";


const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "")
    const refreshToken = get(req, "headers.x-refresh")

    if(!accessToken) {
        return next()
    }

    const { decoded, expired } = verifyJWT(accessToken)

    if (decoded) {
        res.locals.user = decoded
        console.log("still valid access token, so no need recreating one")
        return next()
    }

    if (expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken({refreshToken})
        
        console.log("expired access token, created new with valid refresh token")

        if (!newAccessToken) {
            throw new ForbiddenError("did not reissue access token")
        }
        
        res.setHeader('x-access-token', newAccessToken)
        const result = verifyJWT(newAccessToken)

        res.locals.user = result.decoded
        return next()
    }

    return next()
}

export default deserializeUser