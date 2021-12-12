import { PostOutput } from "../models/post";
import { BadRequestError } from "../errors"
import * as RetweetDAL from "../DAL/retweet.dal"
import path from "path";
import { nanoid } from "../middleware/upload";
import fs from 'fs'
import { NextFunction } from "express";

export const createRetweet = async (userId: string, postId: number, next: NextFunction): Promise<PostOutput> => {
    const post = await RetweetDAL.findById(postId)
    
    if (post.dataValues.userId == userId) throw new BadRequestError("You cannot retweet your post")

    if (post.dataValues.isARetweet) throw new BadRequestError("You cannot retweet a retweet")
    
    const retweeted = await RetweetDAL.findRetweet(userId, postId)
    
    if (retweeted) throw new BadRequestError("You already retweeted the post")

    // copy the image if any
    if(post.dataValues.img_url !== null) {
        const ext = path.extname(post.dataValues.img_url)
        const fileName = `post_${nanoid()}${Date.now()}${ext}`
        const newFileName = __basedir + "/resources/static/assets/uploads/" + fileName
        fs.copyFile(post.dataValues.img_url, newFileName, (err) => {
        if (err) next(err);
        });

        return RetweetDAL.create(userId, postId, post, newFileName)
    }

    return RetweetDAL.create(userId, postId, post)
}