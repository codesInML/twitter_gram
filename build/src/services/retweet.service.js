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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRetweet = void 0;
const errors_1 = require("../errors");
const RetweetDAL = __importStar(require("../DAL/retweet.dal"));
const path_1 = __importDefault(require("path"));
const upload_1 = require("../middleware/upload");
const fs_1 = __importDefault(require("fs"));
const createRetweet = (userId, postId, next) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield RetweetDAL.findById(postId);
    if (post.dataValues.userId == userId)
        throw new errors_1.BadRequestError("You cannot retweet your post");
    if (post.dataValues.isARetweet)
        throw new errors_1.BadRequestError("You cannot retweet a retweet");
    const retweeted = yield RetweetDAL.findRetweet(userId, postId);
    if (retweeted)
        throw new errors_1.BadRequestError("You already retweeted the post");
    // copy the image if any
    if (post.dataValues.img_url !== null) {
        const ext = path_1.default.extname(post.dataValues.img_url);
        const fileName = `post_${(0, upload_1.nanoid)()}${Date.now()}${ext}`;
        const newFileName = __basedir + "/resources/static/assets/uploads/" + fileName;
        fs_1.default.copyFile(post.dataValues.img_url, newFileName, (err) => {
            if (err)
                next(err);
        });
        return RetweetDAL.create(userId, postId, post, newFileName);
    }
    return RetweetDAL.create(userId, postId, post);
});
exports.createRetweet = createRetweet;
