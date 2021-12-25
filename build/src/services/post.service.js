"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deletePost = exports.updatePost = exports.getPost = exports.getPosts = exports.getUserPosts = exports.createPost = void 0;
const lodash_1 = require("lodash");
const PostDAL = __importStar(require("../DAL/post.dal"));
const createPost = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PostDAL.create(payload);
});
exports.createPost = createPost;
const getUserPosts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PostDAL.findAllUserPosts(userId);
});
exports.getUserPosts = getUserPosts;
const getPosts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield PostDAL.findAllPosts(userId);
    const posts = (0, lodash_1.flatten)(data.map((item) => item.toJSON().Posts.map((post) => post.toJSON())));
    return posts;
});
exports.getPosts = getPosts;
const getPost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PostDAL.findPost(postId);
});
exports.getPost = getPost;
const updatePost = (postId, { img_url, caption }) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = { img_url, caption };
    return yield PostDAL.update(postId, payload);
});
exports.updatePost = updatePost;
const deletePost = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield PostDAL.deletepost(postId, userId);
});
exports.deletePost = deletePost;
