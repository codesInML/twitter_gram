"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reply_controller_1 = require("../controller/reply.controller");
const router = express_1.default.Router();
router.route("/").post(reply_controller_1.addReplyHandler);
// since the replies are also comment, we can update and delete them using the comment update and delete routes
exports.default = router;
