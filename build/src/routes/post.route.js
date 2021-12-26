"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controller/post.controller");
const router = express_1.default.Router();
router.route("/")
    .post(post_controller_1.createPostHandler)
    .get(post_controller_1.getAllPostHandler);
router.route("/image/:key")
    .get(post_controller_1.getImage);
router.route("/user")
    .get(post_controller_1.getAllUserPostHandler);
router.route("/:postId")
    .patch(post_controller_1.updateUserPostHandler)
    .get(post_controller_1.getPostHandler)
    .delete(post_controller_1.deleteUserPostHandler);
exports.default = router;
