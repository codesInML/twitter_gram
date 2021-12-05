import { NextFunction } from "express"
import { unlink } from "fs"

export const deleteImage = (img_url: string, next: NextFunction) => {
    unlink(img_url, (err) => {
        if (err) next(err)
    })
}