import { NextFunction } from "express"
import { unlink } from "fs"
import { CommentOutput } from "../models/comment"
import { PostOutput } from "../models/post"

export const deleteImage = (post: PostOutput | CommentOutput, next: NextFunction) => {
    unlink(post.img_url, (err) => {
        if (err) next(err)
    })
}