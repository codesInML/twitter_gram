import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, ForbiddenError } from "../errors";
import {
  createComment,
  deleteComment,
  getComment,
  updateComment,
} from "../services/comment.service";
import { postUpload } from "../utils/image-upload-utils";

export const addCommentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = await postUpload(req, res, next);
  console.log(payload);

  const { userId } = res.locals.user;

  const comment = await createComment({ userId, ...payload });

  return res
    .status(StatusCodes.CREATED)
    .json({ status: "success", msg: "comment added", comment });
};

export const editCommentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = res.locals.user;
  const commentId = req.params.commentId as any as number;

  const post = await getComment(commentId);
  console.log(post);

  if (!post) throw new BadRequestError("post does not exist");

  // check if the user own the post
  if (post.userId !== userId)
    throw new ForbiddenError("You cannot edit this comment");

  const payload = await postUpload(req, res, next);

  const comment = await updateComment({ userId, ...payload });

  return res
    .status(StatusCodes.CREATED)
    .json({ status: "success", msg: "comment edited", comment });
};

export const deleteCommentHandler = async (req: Request, res: Response) => {
  const { userId } = res.locals.user;
  const { commentId } = req.params;

  await deleteComment(commentId as any as number, userId);

  return res
    .status(StatusCodes.OK)
    .json({ status: "success", msg: "comment deleted" });
};
