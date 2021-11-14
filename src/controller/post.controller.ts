import {Request, Response} from "express"
import { StatusCodes } from "http-status-codes"
import { BadRequestError } from "../errors"
import uploadFileMiddleware from "../middleware/upload"
import { createPost } from "../services/post.service"

export const createPostHandler = async (req: Request, res: Response) => {
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    await uploadFileMiddleware(req, res)
    const {userId} = res.locals.user
    let {caption} = req.body
    let fileName: string
    console.log(userId)
    console.log(!caption)

    if (!req.file && !caption) throw new BadRequestError("Please provide an image or caption")

    fileName = !req.file ? "" : req.file.filename
     
    if (!caption) caption = ""
    
    const img_url = directoryPath + fileName

    const post = await createPost({userId, img_url, caption })

    return res.status(StatusCodes.OK).json({status: "success", msg: "updloaded post", post})
}