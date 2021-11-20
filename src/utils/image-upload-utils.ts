import { Request, Response } from "express";
import { BadRequestError } from "../errors";
import uploadFileMiddleware from "../middleware/upload";

export const postUpload = async (req: Request, res: Response) => {
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    await uploadFileMiddleware(req, res)
    const {caption, text, postId} = req.body
    const {commentId} = req.params
    const fileName = req.file?.filename

    const payload: {
        caption?: string
        img_url?: string
        text?: string
        postId?: number
        commentId?: number
    } = {}

    if (caption) {
        payload.caption = caption
        
        if (!caption && !fileName) throw new BadRequestError("please provide an image or caption")
    }

    if (text) payload.text = text
        
    if (postId) payload.postId = postId as any as number

    if (commentId) payload.commentId = commentId as any as number

    if (fileName) {
        payload.img_url = directoryPath + fileName
    }
    
    return payload
}