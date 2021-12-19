"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.signJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { privateKey } = JSON.parse(process.env.JWT_PRIVATE_KEY);
const { publicKey } = JSON.parse(process.env.JWT_PUBLIC_KEY);
function signJWT(object, options) {
    return jsonwebtoken_1.default.sign(object, { key: privateKey, passphrase: process.env.PASSPHRASE }, Object.assign(Object.assign({}, (options && options)), { algorithm: 'RS256' }));
}
exports.signJWT = signJWT;
function verifyJWT(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded
        };
    }
    catch (err) {
        return {
            valid: false,
            expired: err.message == "jwt expired",
            decoded: null
        };
    }
}
exports.verifyJWT = verifyJWT;
