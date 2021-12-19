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
exports.deleteCommentHandler = exports.editCommentHandler = exports.addCommentHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const comment_service_1 = require("../services/comment.service");
const image_upload_utils_1 = require("../utils/image-upload-utils");
const addCommentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = yield (0, image_upload_utils_1.postUpload)(req, res, next);
    const { userId } = res.locals.user;
    const comment = yield (0, comment_service_1.createComment)(Object.assign({ userId }, payload));
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({ status: "success", msg: "comment added", comment });
});
exports.addCommentHandler = addCommentHandler;
const editCommentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = res.locals.user;
    const commentId = req.params.commentId;
    const post = yield (0, comment_service_1.getComment)(commentId);
    console.log(post);
    // check if the user own the post
    if (post.userId !== userId)
        throw new errors_1.ForbiddenError("You cannot edit this comment");
    const payload = yield (0, image_upload_utils_1.postUpload)(req, res, next);
    const comment = yield (0, comment_service_1.updateComment)(Object.assign({ userId }, payload));
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({ status: "success", msg: "comment edited", comment });
});
exports.editCommentHandler = editCommentHandler;
const deleteCommentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = res.locals.user;
    const { commentId } = req.params;
    yield (0, comment_service_1.deleteComment)(commentId, userId, next);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", msg: "comment deleted" });
});
exports.deleteCommentHandler = deleteCommentHandler;
