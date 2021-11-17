import {Request, Response} from 'express'
import { StatusCodes } from 'http-status-codes'

export const addCommentHandler = async (req: Request, res: Response) => {
    return res.status(StatusCodes.CREATED).json({status: "success", msg: "comment added"})
}

export const editCommentHandler = async (req: Request, res: Response) => {
    return res.status(StatusCodes.CREATED).json({status: "success", msg: "comment edited"})
}

export const deleteCommentHandler = async (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).json({status: "success", msg: "comment deleted"})
}