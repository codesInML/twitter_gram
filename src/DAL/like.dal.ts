import { LikeInput, LikeOutput } from "../models/love";
import models from "../models";
import { BadRequestError } from "../errors";

const { Post, Comment, Love } = models;

export const togglePostLike = async (
  payload: LikeInput
): Promise<[LikeOutput, string]> => {
  const post = await Post.findOne({ where: { id: payload.postId } });

  if (!post) throw new BadRequestError("post does not exist");
  // check if the user has previously liked the post
  const liked = await Love.findOne({
    where: { userId: payload.userId, postId: payload.postId },
  });

  const hasLiked = await post.hasPostLikes(liked);

  if (hasLiked) return [await liked.destroy(), "like removed"];

  return [await post.createPostLike(payload), "like added"];
};

export const toggleCommentLike = async (
  payload: LikeInput
): Promise<[LikeOutput, string]> => {
  const comment = await Comment.findOne({ where: { id: payload.commentId } });

  if (!comment) throw new BadRequestError("comment does not exist");
  // check if the user has previously liked the comment
  const liked = await Love.findOne({
    where: { userId: payload.userId, commentId: payload.commentId },
  });

  const hasLiked = await comment.hasCommentLikes(liked);

  if (hasLiked) return [await liked.destroy(), "like removed"];

  return [await comment.createCommentLike(payload), "like added"];
};
