import { RequestHandler } from "express"
import {StatusCodes} from 'http-status-codes'

export const notFound: RequestHandler = (req, res) => res.status(StatusCodes.NOT_FOUND).send('Route does not exist')
