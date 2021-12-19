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
exports.likeToggleHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const like_service_1 = require("../services/like.service");
// like and unlike a post
const likeToggleHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = res.locals.user;
    const postId = req.query.postId;
    const commentId = req.query.commentId;
    if (!postId && !commentId)
        throw new errors_1.BadRequestError("no id given");
    if (postId && commentId)
        throw new errors_1.BadRequestError("either post or comment id must be provided, not both");
    const [_, msg] = yield (0, like_service_1.likeToggle)({ userId, postId, commentId });
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({ status: "success", msg });
});
exports.likeToggleHandler = likeToggleHandler;
