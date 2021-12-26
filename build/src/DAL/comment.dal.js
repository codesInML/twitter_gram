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
exports.destroy = exports.update = exports.find = exports.create = void 0;
const models_1 = __importDefault(require("../models"));
const errors_1 = require("../errors");
const { Post, Comment } = models_1.default;
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post.findOne({
        where: { id: payload.postId },
    });
    return yield post.createComment(payload);
});
exports.create = create;
const find = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Comment.findOne({ where: { id: commentId } });
});
exports.find = find;
const update = ({ text, img_url, commentId, }) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield Comment.findOne({ where: { id: commentId } });
    return yield comment.update({ text, img_url });
});
exports.update = update;
const destroy = (commentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield Comment.findOne({ where: { id: commentId } });
    // check if the user own the comment
    if (comment.userId !== userId)
        throw new errors_1.ForbiddenError("You cannot delete this comment");
    yield comment.destroy();
});
exports.destroy = destroy;
