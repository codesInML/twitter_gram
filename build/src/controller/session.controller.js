"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserSessionHandler = exports.getUserSessionHandler = exports.createSessionHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const unauthenticated_1 = __importDefault(require("../errors/unauthenticated"));
const session_service_1 = require("../services/session.service");
const user_service_1 = require("../services/user.service");
const jwt_utils_1 = require("../utils/jwt-utils");
const createSessionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // validate user password
    const user = yield (0, user_service_1.validatePassword)(req.body);
    // check if user was returned
    if (!user)
        throw new unauthenticated_1.default("Invalid email or password");
    // create the session
    const session = yield (0, session_service_1.createSession)(user.userId, req.get("user-agent") || "");
    // create an access token
    const accessToken = (0, jwt_utils_1.signJWT)(Object.assign(Object.assign({}, user), { session: session.id }), { expiresIn: process.env.ACCESS_TOKEN_TTL }); // 5 minutes
    // create an access token
    const refreshToken = (0, jwt_utils_1.signJWT)(Object.assign(Object.assign({}, user), { session: session.id }), { expiresIn: process.env.REFRESH_TOKEN_TTL }); // 1 year
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ status: "success", accessToken, refreshToken });
});
exports.createSessionHandler = createSessionHandler;
const getUserSessionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = res.locals.user;
    const sessions = yield (0, session_service_1.findSessions)({ userId, valid: true });
    return res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", sessions });
});
exports.getUserSessionHandler = getUserSessionHandler;
const deleteUserSessionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = res.locals.user;
    yield (0, session_service_1.updateSessions)({ userId, valid: false });
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ status: "success", accessToken: null, refreshToken: null });
});
exports.deleteUserSessionHandler = deleteUserSessionHandler;
