import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt-utils";
import { reIssueAccessToken } from "../services/session.service";
import { ForbiddenError } from "../errors";
import log from "../utils/logger";


const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "")
    const refreshToken = get(req, "headers.x-refresh")

    if(!accessToken) {
        return next()
    }

    const { decoded, expired } = verifyJWT(accessToken)

    if (decoded) {
        res.locals.user = decoded
        log.info("still valid access token, so no need recreating one")
        return next()
    }

    if (expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken({refreshToken})
        
        if (!newAccessToken) {
            throw new ForbiddenError("did not reissue access token")
        }
        
        log.info("expired access token, created new with valid refresh token")
        
        res.setHeader('x-access-token', newAccessToken)
        const result = verifyJWT(newAccessToken)

        res.locals.user = result.decoded
        return next()
    }

    return next()
}

export default deserializeUser