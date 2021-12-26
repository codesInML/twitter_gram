"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("../controller/comment.controller");
const router = express_1.default.Router();
router.route("/").post(comment_controller_1.addCommentHandler);
router
    .route("/:commentId")
    .patch(comment_controller_1.editCommentHandler)
    .delete(comment_controller_1.deleteCommentHandler);
exports.default = router;
