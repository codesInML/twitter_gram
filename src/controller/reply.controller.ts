import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { createReply } from '../services/reply.service'
import { postUpload } from '../utils/image-upload-utils'

export const addReplyHandler = async (req: Request, res: Response) => {
    const payload = await postUpload(req, res)
    
    const {userId} = res.locals.user

    const reply = await createReply({ userId, ...payload })
    return res.status(StatusCodes.CREATED).json({status: "success", msg: "reply added", reply})
}
