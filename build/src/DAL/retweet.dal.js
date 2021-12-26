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
exports.create = exports.findRetweet = exports.findById = void 0;
const models_1 = __importDefault(require("../models"));
const { Post } = models_1.default;
const findById = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Post.findOne({ where: { id: postId } });
});
exports.findById = findById;
const findRetweet = (userId, postId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Post.findOne({ where: { userId, retweetedId: postId } });
});
exports.findRetweet = findRetweet;
const create = (userId, postId, post, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const retweet = yield Post.create({
        userId,
        img_url: fileName ? fileName : null,
        caption: post.dataValues.caption,
        isARetweet: true,
        retweetedId: postId
    });
    // increase the number of retweets
    yield post.update({ numberOfRetweets: post.dataValues.numberOfRetweets + 1 });
    return retweet;
});
exports.create = create;
