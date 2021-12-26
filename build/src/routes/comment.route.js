"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_ccontroller_1 = require("../controller/comment.ccontroller");
const validate_resource_1 = __importDefault(require("../middleware/validate-resource"));
const comment_schema_1 = require("../schema/comment.schema");
const router = express_1.default.Router();
router.route("/")
    .post((0, validate_resource_1.default)(comment_schema_1.createCommentSchema), comment_ccontroller_1.addCommentHandler);
router.route("/:commentId")
    .patch(comment_ccontroller_1.editCommentHandler)
    .delete(comment_ccontroller_1.deleteCommentHandler);
exports.default = router;
