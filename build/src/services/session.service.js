"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSessions = exports.reIssueAccessToken = exports.findSessions = exports.createSession = void 0;
const lodash_1 = require("lodash");
const SessionDAL = __importStar(require("../DAL/session.dal"));
const UserDAL = __importStar(require("../DAL/user.dal"));
const jwt_utils_1 = require("../utils/jwt-utils");
function createSession(userId, userAgent) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield SessionDAL.create(userId, userAgent);
    });
}
exports.createSession = createSession;
function findSessions({ userId, valid }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield SessionDAL.findAll(userId, valid);
    });
}
exports.findSessions = findSessions;
function reIssueAccessToken({ refreshToken }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { decoded } = (0, jwt_utils_1.verifyJWT)(refreshToken);
        if (!decoded || !(0, lodash_1.get)(decoded, "session"))
            return false;
        const session = yield SessionDAL.findOne((0, lodash_1.get)(decoded, "session"));
        if (!session || !session.valid)
            return false;
        const user = yield UserDAL.findOne(session.userId);
        if (!user)
            return false;
        // create an access token
        const accessToken = (0, jwt_utils_1.signJWT)(Object.assign(Object.assign({}, user), { session: session.userId }), { expiresIn: process.env.ACCESS_TOKEN_TTL }); // 5 minutes
        return accessToken;
    });
}
exports.reIssueAccessToken = reIssueAccessToken;
const updateSessions = ({ userId, valid }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield SessionDAL.update(userId, valid);
});
exports.updateSessions = updateSessions;
