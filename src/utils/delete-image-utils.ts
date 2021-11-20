import { NextFunction } from "express"
import { unlink } from "fs"
import { CommentOutput } from "../models/comment"
import { PostOutput } from "../models/post"

export const deleteImage = (img_url: string, next: NextFunction) => {
    unlink(img_url, (err) => {
        if (err) next(err)
    })
}