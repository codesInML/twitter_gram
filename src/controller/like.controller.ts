import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const likeHandler = async (req: Request, res: Response) => {
    return res.status(StatusCodes.CREATED).json({status: "success", msg: "like added"})
}

export const unlikeHandler = async (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).json({status: "success", msg: "like removed"})
}