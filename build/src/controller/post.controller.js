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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImage = exports.deleteUserPostHandler = exports.updateUserPostHandler = exports.getPostHandler = exports.getAllPostHandler = exports.getAllUserPostHandler = exports.createPostHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const image_upload_utils_1 = require("../utils/image-upload-utils");
const post_service_1 = require("../services/post.service");
const aws_s3_1 = require("../middleware/aws-s3");
// create the post
const createPostHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = yield (0, image_upload_utils_1.postUpload)(req, res, next);
    const { userId } = res.locals.user;
    const post = yield (0, post_service_1.createPost)(Object.assign({ userId }, payload));
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({ status: "success", msg: "updloaded post", post });
});
exports.createPostHandler = createPostHandler;
// get all post the user has created
const getAllUserPostHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = res.locals.user;
    const posts = yield (0, post_service_1.getUserPosts)(userId);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", posts });
});
exports.getAllUserPostHandler = getAllUserPostHandler;
// get both the user's post and post of those the user follows
const getAllPostHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = res.locals.user;
    const posts = yield (0, post_service_1.getPosts)(userId);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", posts });
});
exports.getAllPostHandler = getAllPostHandler;
// get a post
const getPostHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    const post = yield (0, post_service_1.getPost)(postId);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", post });
});
exports.getPostHandler = getPostHandler;
// update user's post
const updateUserPostHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    const post = yield (0, post_service_1.getPost)(postId);
    const { userId } = res.locals.user;
    // check if the user own the post
    if (post.userId !== userId)
        throw new errors_1.ForbiddenError("You cannot update this post");
    const payload = yield (0, image_upload_utils_1.postUpload)(req, res, next);
    const updatedPost = yield (0, post_service_1.updatePost)(postId, payload);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({ status: "success", post: updatedPost });
});
exports.updateUserPostHandler = updateUserPostHandler;
// delete user's post
const deleteUserPostHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    yield (0, post_service_1.deletePost)(postId, userId, next);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", msg: "post has been deleted" });
});
exports.deleteUserPostHandler = deleteUserPostHandler;
// get the image
const getImage = (req, res) => {
    const key = req.params.key;
    const readStream = (0, aws_s3_1.getFile)(key);
    readStream.pipe(res);
};
exports.getImage = getImage;
