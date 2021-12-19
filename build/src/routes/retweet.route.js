"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const retweet_controller_1 = require("../controller/retweet.controller");
const router = express_1.default.Router();
router.route('/:postId?').post(retweet_controller_1.createRetweetHandler);
// since retweeting is also a post, you can delete it with the delete post endpoint
exports.default = router;
