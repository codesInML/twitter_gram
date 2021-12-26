"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const session_controller_1 = require("../controller/session.controller");
const require_user_1 = __importDefault(require("../middleware/require-user"));
const validate_resource_1 = __importDefault(require("../middleware/validate-resource"));
const session_schema_1 = require("../schema/session.schema");
const router = express_1.default.Router();
router.post('/', (0, validate_resource_1.default)(session_schema_1.createSessionSchema), session_controller_1.createSessionHandler);
router.use(require_user_1.default);
router.get('/', session_controller_1.getUserSessionHandler);
router.delete('/', session_controller_1.deleteUserSessionHandler);
exports.default = router;
