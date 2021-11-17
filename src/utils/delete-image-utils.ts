import { NextFunction } from "express"
import { unlink } from "fs"
import { PostOutput } from "../models/post"

export const deleteImage = (post: PostOutput, next: NextFunction) => {
    unlink(post.img_url, (err) => {
        if (err) next(err)
    })
}