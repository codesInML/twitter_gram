"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleCommentLike = exports.togglePostLike = void 0;
const models_1 = __importDefault(require("../models"));
const errors_1 = require("../errors");
const { Post, Comment, Love } = models_1.default;
const togglePostLike = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post.findOne({ where: { id: payload.postId } });
    if (!post)
        throw new errors_1.BadRequestError("post does not exist");
    // check if the user has previously liked the post
    const liked = yield Love.findOne({
        where: { userId: payload.userId, postId: payload.postId },
    });
    const hasLiked = yield post.hasPostLikes(liked);
    if (hasLiked)
        return [yield liked.destroy(), "like removed"];
    return [yield post.createPostLike(payload), "like added"];
});
exports.togglePostLike = togglePostLike;
const toggleCommentLike = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield Comment.findOne({ where: { id: payload.commentId } });
    if (!comment)
        throw new errors_1.BadRequestError("comment does not exist");
    // check if the user has previously liked the comment
    const liked = yield Love.findOne({
        where: { userId: payload.userId, commentId: payload.commentId },
    });
    const hasLiked = yield comment.hasCommentLikes(liked);
    if (hasLiked)
        return [yield liked.destroy(), "like removed"];
    return [yield comment.createCommentLike(payload), "like added"];
});
exports.toggleCommentLike = toggleCommentLike;
