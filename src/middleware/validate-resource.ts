import { Request, Response, NextFunction } from 'express'
import {AnyZodObject} from 'zod'
import { BadRequestError } from '../errors'

const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        })
        next()
    } catch (error: any) {
        next(error)
    }
}

export default validate