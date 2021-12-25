import { CommentInput, CommentOutput } from "../models/comment";
import models from "../models";
import { NextFunction } from "express";
import { ForbiddenError } from "../errors";

const { Post, Comment } = models;

export const create = async (payload: CommentInput): Promise<CommentOutput> => {
  const post = await Post.findOne({
    where: { id: payload.postId },
  });
  return await post.createComment(payload);
};

export const find = async (commentId: number): Promise<CommentOutput> => {
  return await Comment.findOne({ where: { id: commentId } });
};

export const update = async ({
  text,
  img_url,
  commentId,
}: {
  text?: string;
  img_url?: string;
  commentId?: number;
}) => {
  const comment = await Comment.findOne({ where: { id: commentId } });
  return await comment.update({ text, img_url });
};

export const destroy = async (commentId: number, userId: string) => {
  const comment = await Comment.findOne({ where: { id: commentId } });

  // check if the user own the comment
  if (comment.userId !== userId)
    throw new ForbiddenError("You cannot delete this comment");

  await comment.destroy();
};
