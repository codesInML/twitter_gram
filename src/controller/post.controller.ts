import {Request, Response} from "express"
import { StatusCodes } from "http-status-codes"
import { BadRequestError } from "../errors"
import uploadFileMiddleware from "../middleware/upload"
import { createPost } from "../services/post.service"

export const createPostHandler = async (req: Request, res: Response) => {
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    await uploadFileMiddleware(req, res)
    const {userId} = res.locals.user
    const {caption} = req.body
    console.log(userId)
    console.log(caption)

    if (req.file == undefined) throw new BadRequestError("Please provide an image")

    const fileName = req.file.filename
    const img_url = directoryPath + fileName

    if (caption) {
        // const post = await createPost({userId, img_url, caption })
    }

    return res.status(StatusCodes.OK).json({userId, img_url, caption})
}