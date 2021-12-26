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
exports.postUpload = void 0;
const errors_1 = require("../errors");
const upload_1 = __importDefault(require("../middleware/upload"));
const aws_s3_1 = require("../middleware/aws-s3");
const delete_image_utils_1 = require("./delete-image-utils");
const postUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    yield (0, upload_1.default)(req, res);
    const { caption, text, postId } = req.body;
    const { commentId } = req.params;
    const file = req.file;
    const fileName = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const payload = {};
    if (caption) {
        payload.caption = caption;
        if (!caption && !fileName)
            throw new errors_1.BadRequestError("please provide an image or caption");
    }
    if (text)
        payload.text = text;
    if (postId)
        payload.postId = postId;
    if (commentId)
        payload.commentId = commentId;
    if (file) {
        payload.img_url = directoryPath + fileName;
        yield (0, aws_s3_1.uploadFile)(file);
        yield (0, delete_image_utils_1.deleteImage)(file.path, next);
    }
    return payload;
});
exports.postUpload = postUpload;
