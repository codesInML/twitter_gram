"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const like_controller_1 = require("../controller/like.controller");
const router = express_1.default.Router();
router.route('/:postId?/:commentId?').get(like_controller_1.likeToggleHandler);
exports.default = router;
