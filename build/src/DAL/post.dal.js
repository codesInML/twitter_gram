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
exports.deletepost = exports.update = exports.findPost = exports.findAllPosts = exports.findAllUserPosts = exports.create = void 0;
const user_dal_1 = require("./user.dal");
const models_1 = __importDefault(require("../models"));
const errors_1 = require("../errors");
const { Post, Comment, Love } = models_1.default;
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_dal_1.findOne)(payload.userId);
    return yield user.createPost(payload);
});
exports.create = create;
const findAllUserPosts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_dal_1.findOne)(userId);
    return yield user.getPosts({
        include: [
            {
                model: Love,
                as: "PostLikes",
                attributes: ["userId"],
            },
            {
                model: Comment,
                include: [
                    {
                        model: Love,
                        as: "CommentLikes",
                        attributes: ["userId"],
                    },
                ],
            },
        ],
    });
});
exports.findAllUserPosts = findAllUserPosts;
const findAllPosts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const follower = yield (0, user_dal_1.findOne)(userId);
    return yield follower.getUser({
        attributes: [],
        joinTableAttributes: [],
        include: [
            {
                model: Post,
                include: [
                    {
                        model: Love,
                        as: "PostLikes",
                        attributes: ["userId"],
                    },
                    {
                        model: Comment,
                    },
                ],
            },
        ],
    });
});
exports.findAllPosts = findAllPosts;
const findPost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post.findOne({
        where: { id: postId },
        include: [
            {
                model: Love,
                as: "PostLikes",
                attributes: ["userId"],
            },
            {
                model: Comment,
                include: [
                    {
                        model: Love,
                        as: "CommentLikes",
                        attributes: ["userId"],
                    },
                    {
                        model: Comment,
                        as: "Reply",
                        include: [
                            {
                                model: Love,
                                as: "CommentLikes",
                                attributes: ["userId"],
                            },
                        ],
                    },
                ],
            },
        ],
    });
    if (!post)
        throw new errors_1.BadRequestError(`no post with the id ${postId}`);
    return post.toJSON();
});
exports.findPost = findPost;
const update = (postId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post.findOne({ where: { id: postId } });
    return yield post.update(payload);
});
exports.update = update;
const deletepost = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post.findOne({ where: { id: postId } });
    // check if the user own the post
    if (post.userId !== userId)
        throw new errors_1.ForbiddenError("You cannot delete this post");
    yield post.destroy();
});
exports.deletepost = deletepost;
