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
const lodash_1 = require("lodash");
const jwt_utils_1 = require("../utils/jwt-utils");
const session_service_1 = require("../services/session.service");
const errors_1 = require("../errors");
const logger_1 = __importDefault(require("../utils/logger"));
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = (0, lodash_1.get)(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    const refreshToken = (0, lodash_1.get)(req, "headers.x-refresh");
    if (!accessToken) {
        return next();
    }
    const { decoded, expired } = (0, jwt_utils_1.verifyJWT)(accessToken);
    if (decoded) {
        res.locals.user = decoded;
        logger_1.default.info("still valid access token, so no need recreating one");
        return next();
    }
    if (expired && refreshToken) {
        const newAccessToken = yield (0, session_service_1.reIssueAccessToken)({ refreshToken });
        if (!newAccessToken) {
            throw new errors_1.ForbiddenError("did not reissue access token");
        }
        logger_1.default.info("expired access token, created new with valid refresh token");
        res.setHeader('x-access-token', newAccessToken);
        const result = (0, jwt_utils_1.verifyJWT)(newAccessToken);
        res.locals.user = result.decoded;
        return next();
    }
    return next();
});
exports.default = deserializeUser;
