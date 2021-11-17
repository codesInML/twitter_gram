import { Request, Response } from "express";
import { BadRequestError } from "../errors";
import uploadFileMiddleware from "../middleware/upload";

export const postUpload = async (req: Request, res: Response) => {
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    await uploadFileMiddleware(req, res)
    const {caption} = req.body
    const fileName = req.file?.filename

    const payload: {
        caption?: string
        img_url?: string
    } = {}

    if (caption) payload.caption = caption

    if (fileName) {
        payload.img_url = directoryPath + fileName
    }
    
    if (!caption && !fileName) throw new BadRequestError("please provide an image or caption")
    return payload
}