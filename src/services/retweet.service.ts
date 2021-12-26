import { PostOutput } from "../models/post";
import { BadRequestError } from "../errors";
import * as RetweetDAL from "../DAL/retweet.dal";
import path from "path";
import { nanoid } from "../middleware/upload";
import fs from "fs";
import { NextFunction } from "express";

export const createRetweet = async (
  userId: string,
  postId: number,
  next: NextFunction
): Promise<PostOutput> => {
  const post = await RetweetDAL.findById(postId);

  if (post.dataValues.userId == userId)
    throw new BadRequestError("You cannot retweet your post");

  const retweeted = await RetweetDAL.findRetweet(userId, postId);

  if (retweeted) throw new BadRequestError("You already retweeted the post");

  // copy the image if any
  if (post.dataValues.img_url) {
    const newFileName = post.dataValues.img_url;
    return RetweetDAL.create(userId, postId, post, newFileName);
  }

  return RetweetDAL.create(userId, postId, post);
};
