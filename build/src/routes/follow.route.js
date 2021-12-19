"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const follow_controller_1 = require("../controller/follow.controller");
const validate_resource_1 = __importDefault(require("../middleware/validate-resource"));
const follow_schema_1 = require("../schema/follow.schema");
const router = express_1.default.Router();
router.route("/")
    .post((0, validate_resource_1.default)(follow_schema_1.followUserSchema), follow_controller_1.followUserHandler)
    .delete((0, validate_resource_1.default)(follow_schema_1.followUserSchema), follow_controller_1.unFollowUserHandler)
    .get(follow_controller_1.getAllFollowersHandler);
router.route("/following").get(follow_controller_1.getAllFollowingHandler);
exports.default = router;
