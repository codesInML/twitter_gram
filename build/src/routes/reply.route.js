"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reply_controller_1 = require("../controller/reply.controller");
const validate_resource_1 = __importDefault(require("../middleware/validate-resource"));
const reply_schema_1 = require("../schema/reply.schema");
const router = express_1.default.Router();
router.route("/")
    .post((0, validate_resource_1.default)(reply_schema_1.createReplySchema), reply_controller_1.addReplyHandler);
// since the replies are also comment, we can update and delete them using the comment update and delete routes 
exports.default = router;
