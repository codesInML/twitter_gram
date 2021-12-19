"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nanoid = void 0;
const util_1 = __importDefault(require("util"));
const multer_1 = __importDefault(require("multer"));
const nanoid_1 = require("nanoid");
const path_1 = __importDefault(require("path"));
const image_utils_1 = require("../utils/image-utils");
const maxSize = 2 * 1024 * 1024;
exports.nanoid = (0, nanoid_1.customAlphabet)("abcdefghijjlmnopqrstuvwxyz", 10);
let storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/resources/static/assets/uploads/");
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        const fileName = `post_${(0, exports.nanoid)()}${Date.now()}${ext}`;
        cb(null, fileName);
    },
});
let uploadFile = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: image_utils_1.postFilter
}).single("file");
let uploadFileMiddleware = util_1.default.promisify(uploadFile);
exports.default = uploadFileMiddleware;
