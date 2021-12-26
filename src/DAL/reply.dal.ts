import { CommentInput, CommentOutput } from "../models/comment";
import models from "../models";
import { NextFunction } from "express";
import { ForbiddenError } from "../errors";
import { deleteImage } from "../utils/delete-image-utils";

const { Post, Comment } = models;

export const create = async (payload: CommentInput): Promise<CommentOutput> => {
  console.log(payload);
  const comment = await Comment.findOne({
    where: { id: payload.postId },
  });
  return await comment.createReply({ ...payload, commentId: payload.postId });
};
