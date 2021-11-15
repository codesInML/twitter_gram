import {Request, Response, NextFunction} from 'express'
import { ForbiddenError } from '../errors'

const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user

    if (!user) {
        throw new ForbiddenError("Unauthorized")
    }

    res.locals.user = user.dataValues
    return next()
}

export default requireUser